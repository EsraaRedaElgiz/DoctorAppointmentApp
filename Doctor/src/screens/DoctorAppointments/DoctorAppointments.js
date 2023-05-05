import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  Pressable,
  FlatList,
} from 'react-native';
import styles from './DoctorAppointmentsStyles';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import {COLORS, PADDINGS} from '../../../../src/constants/Constants';
import Calender from '../../../../src/components/Calender/Calender';
import PersonAppointmentCard from '../../../../src/components/PersonAppointmentCard/PersonAppointmentCard';
import {PatientsData} from '../../../../src/utils';
import { useDispatch } from 'react-redux';
import { getAppointmentDetails } from '../../Redux/Reducers/AppointmentDetailsSlice';

function DoctorAppointments({navigation}) {
  const dispatch = useDispatch()
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
        <Text style={styles.dateText}> {day+"\t" + month +"\t"+ year}</Text>
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={PatientsData}
        renderItem={(itemData, index) => {
          return (
            <>
              <PersonAppointmentCard
                confirmed={itemData.item.confirmed}
                name={itemData.item.name.trim()}
                time={itemData.item.time}
                imageUri={itemData.item.imageUri}
                onPress={() => {
                  dispatch(getAppointmentDetails("2")).unwrap().then((res) => { //instead of 2 i will pass appointment_id
                    if(res.appointment_id){
                      navigation.navigate('AppointmentDetails', {
                        PatientsArray: itemData.item,
                        appointmentStatus:itemData.item.confirmed?"تم التأكيد":"معلق"
                      });
                    }else{
                      alert("حدث خطأ اثناء الاتصال بالخادم لعرض تفاصيل الموعد من فضلك حاول مجددا ")
                    }
                    
                  })
                }}
              />
            </>
          );
        }}
      />
      {/* </ScrollView> */}
    </View>
  );
}

export default DoctorAppointments;
