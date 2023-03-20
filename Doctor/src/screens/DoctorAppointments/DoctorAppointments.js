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

function DoctorAppointments({navigation}) {
  return (
    <View style={styles.container}>
      <HeaderNavigation
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
        <Text style={styles.dateText}> 4 Feb 2023</Text>
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
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentStyle}> */}
        {/* <PersonAppointmentCard pending time="10:30 AM" />
        <PersonAppointmentCard confirmed name="ايمن جاب الله" time="10:30 AM" />
        <PersonAppointmentCard confirmed name="اسراء السباكة" time="10:30 AM" />
        <PersonAppointmentCard confirmed name="مروة" time="10:30 AM" />
        <PersonAppointmentCard pending name="يوسف" time="10:30 AM" />
        <PersonAppointmentCard confirmed name="عدي حاتم" time="10:30 AM" />
        <PersonAppointmentCard pending name="الشاذلي" time="10:30 AM" /> */}
        <FlatList
        showsVerticalScrollIndicator={false}
          data={PatientsData}
          renderItem={(itemData, index) => {
            return (
              <>
                <PersonAppointmentCard
                  confirmed={itemData.item.confirmed}
                  name={itemData.item.name}
                  time={itemData.item.time}
                  onPress={()=>{
                    navigation.navigate("AppointmentDetails")
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
