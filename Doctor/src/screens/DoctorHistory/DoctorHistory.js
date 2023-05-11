import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './DoctorHistoryStyles';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import {COLORS, PADDINGS} from '../../../../src/constants/Constants';
import Calender from '../../../../src/components/Calender/Calender';
import {PatientsData} from '../../../../src/utils';
import PersonHistoryCard from '../../Components/PresonHistoryCard/PersonHistoryCard';
import {useDispatch, useSelector} from 'react-redux';
import {getAppointmentDetails} from '../../Redux/Reducers/AppointmentDetailsSlice';
import {getDoctorHistory} from '../../Redux/Reducers/DoctorHistorySlice';
import {RFValue} from 'react-native-responsive-fontsize';

function DoctorHistory({navigation}) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {isLoading, history} = globalState.DoctorHistoryReducer;
  useEffect(() => {
    dispatch(getDoctorHistory());
  }, []);
  let date = new Date();
  let day = date.getDate();
  let month = date.toLocaleString('default', {month: 'long'});
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
          renderItem={(item, index) => {
            return (
              <>
                <PersonHistoryCard
                  done={true}
                  ///name={item.patient.user_first_name.trim()}
                  // time={itemData.item.time}
                 /// imageUri={item.user_image}
                  // done={itemData.item.done}
                  // name={itemData.item.name.trim()}
                  // time={itemData.item.time}
                  // imageUri={itemData.item.imageUri}
                  onPress={() => {
                    dispatch(getAppointmentDetails('2'))
                      .unwrap()
                      .then(res => {
                        //instead of 2 i will pass appointment_id
                        if (res.appointment_id) {
                          navigation.navigate('AppointmentDetails',/* {
                            PatientsArray: itemData.item,
                            appointmentStatus: itemData.item.done
                              ? 'مكتمل'
                              : 'ملغى',
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
    </View>
  );
}

export default DoctorHistory;
