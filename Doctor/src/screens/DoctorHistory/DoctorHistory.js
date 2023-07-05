import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './DoctorHistoryStyles';
import { HeaderNavigation } from '../../../../src/components/headerNavigation/HeaderNavigation';
import { COLORS, PADDINGS } from '../../../../src/constants/Constants';
import Calender from '../../../../src/components/Calender/Calender';
import { PatientsData } from '../../../../src/utils';
import PersonHistoryCard from '../../Components/PresonHistoryCard/PersonHistoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentDetails } from '../../Redux/Reducers/AppointmentDetailsSlice';
import { getDoctorHistory } from '../../Redux/Reducers/DoctorHistorySlice';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';
import { getPatientHistory } from '../../Redux/Reducers/PatientHistorySlice';

function DoctorHistory({ navigation }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const { isLoading, history } = globalState.DoctorHistoryReducer;
  useEffect(() => {
    console.log('History = ' + JSON.stringify(history));
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getDoctorHistory({ filter: 'history' }))
        .unwrap()
        .then(res => {
        })
        .catch(err => { });

    });
    return unsubscribe;
  }, []);
  let date = new Date();
  let day = date.getDate();
  let month = date.toLocaleString('default', { month: 'long' });
  let year = date.getFullYear();
  return (
    <View style={styles.container}>
      <HeaderNavigation
        rightButtonHide
        icon
        iconName="sliders"
        title="التاريخ"
        color={COLORS.darkGray3}
        // onPress={()}
        onPressBtn={() => {
          navigation.navigate('DoctorFilterHistory');
        }}
      />
      <View style={styles.headerView}>
        <Text style={styles.dateText}> {day + '\t' + month + '\t' + year}</Text>
      </View>
      <View style={styles.calenderView}>
        <Calender />
      </View>
      <View style={styles.line} />
      {isLoading ? (
        <View style={styles.activityIndicatorViewStyle}>
          <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
        </View>
      ) : history.length == 0 ? (
        <View style={styles.activityIndicatorViewStyle}>
          <Text>لا يوجد حجوزات سابقة</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={history}
          keyExtractor={index => index}
          renderItem={(item, index) => {
            return (
              <>
                <PersonHistoryCard
                  name={item.item.patient.user_first_name}
                  done={item.item.appointment_status}
                  time={item.item.appointment_time.slice(0, 5)}
                  imageUri={item.item.patient.user_image}
                  onPress={() => {
                    //console.log(item)
                    dispatch(
                      getPatientHistory(JSON.parse(item.item.patient.patient_id)),
                    );
                    dispatch(getAppointmentDetails(item.item.appointment_id))
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
    </View>
  );
}

export default DoctorHistory;
