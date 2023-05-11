import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  Pressable,
  FlatList,
  ActivityIndicator,
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
    dispatch(getDoctorAppointments());
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
            return (
              <>
                <PersonAppointmentCard
                  confirmed={item.appointment_status === 2 ? false : true}
                  name={item.user_first_name}
                  time={item.appointment_time}
                  imageUri={item.user_image}
                  onPress={() => {
                    dispatch(getAppointmentDetails('2'))
                      .unwrap()
                      .then(res => {
                        //instead of 2 i will pass appointment_id
                        if (res.appointment_id) {
                          navigation.navigate('AppointmentDetails', /*{
                            PatientsArray: itemData.item,
                            appointmentStatus: itemData.item.confirmed
                              ? 'تم التأكيد'
                              : 'معلق',
                          }*/);
                        } else {
                          alert(
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
