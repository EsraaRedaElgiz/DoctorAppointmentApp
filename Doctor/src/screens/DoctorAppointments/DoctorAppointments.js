import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  Pressable,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './DoctorAppointmentsStyles';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import {COLORS, PADDINGS} from '../../../../src/constants/Constants';
import Calender from '../../../../src/components/Calender/Calender';
import PersonAppointmentCard from '../../../../src/components/PersonAppointmentCard/PersonAppointmentCard';
import {PatientsData} from '../../../../src/utils';
import {useDispatch, useSelector} from 'react-redux';
import {getAppointmentDetails} from '../../Redux/Reducers/AppointmentDetailsSlice';
import {getDoctorAppointments} from '../../Redux/Reducers/DoctorAppointmentSlice';
import {RFValue} from 'react-native-responsive-fontsize';
import {getPatientHistory} from '../../Redux/Reducers/PatientHistorySlice';

function DoctorAppointments({navigation}) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {
    // appointment_date,
    // appointment_time,
    // user_first_name,
    // user_last_name,
    // user_image,
    // appointment_status,
    isLoading,
    appointments,
  } = globalState.DoctorAppointmentReducer;
  let date = new Date();
  let day = date.getDate();
  let month = date.toLocaleString('default', {month: 'long'});
  let year = date.getFullYear();
  useEffect(() => {
    dispatch(getDoctorAppointments({filter: 'upcoming'}));
  }, []);
  return (
    <View style={styles.container}>
      <HeaderNavigation
        rightButtonHide
        icon
        iconName="sliders"
        title="المواعيد"
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
        onPressBtn={() => {
          navigation.navigate('DoctorFilterAppointment');
        }}
      />
      <View style={styles.headerView}>
        <Text style={styles.dateText}> {day + '\t' + month + '\t' + year}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('AddAppointmentBySecretary');
          }}>
          <Text style={styles.addButton}>اضافة</Text>
        </Pressable>
      </View>
      <View style={styles.calenderView}>
        <Calender />
      </View>
      <View style={styles.line} />

      {isLoading ? (
        <View style={styles.activityIndicatorViewStyle}>
          <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointments}
          renderItem={({item, index}) => {
            //console.log(item.patient.user_first_name);
            //console.log(item.appointment_time);
            return (
              <>
                <PersonAppointmentCard
                  confirmed={item.appointment_status === 2 ? false : true}
                  name={item.patient.user_first_name.trim()}
                  time={item.appointment_time.slice(0, 5)}
                  imageUri={item.patient.user_image}
                  onPress={() => {
                    dispatch(
                      getPatientHistory(JSON.parse(item.patient.patient_id)),
                    );
                    dispatch(getAppointmentDetails(item.appointment_id))
                      .unwrap()
                      .then(res => {
                        if (res.appointment_id) {
                          navigation.navigate('AppointmentDetails');
                        } else {
                          Alert.alert(
                            'حدث خطأ اثناء الاتصال بالخادم لعرض تفاصيل الموعد من فضلك حاول مجددا ',
                          );
                        }
                      });
                  }}
                />
              </>
            );
          }}
        />
      )}
      {/* </ScrollView> */}
    </View>
  );
}

export default DoctorAppointments;
