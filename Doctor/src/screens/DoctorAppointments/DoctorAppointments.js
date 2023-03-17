import React from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import styles from './DoctorAppointmentsStyles';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import {COLORS, PADDINGS} from '../../../../src/constants/Constants';
import Calender from '../../../../src/components/Calender/Calender';
import PersonAppointmentCard from '../../../../src/components/PersonAppointmentCard/PersonAppointmentCard';

function DoctorAppointments() {
  return (
    <View style={styles.container}>
      <HeaderNavigation
        title="المواعيد"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContentStyle}>
        <View style={styles.headerView}>
          <Text style={styles.dateText}> 4 Feb 2023</Text>
          <Text style={styles.addButton}>اضافة</Text>
        </View>
        <View style={styles.calenderView}>
          <Calender />
        </View>
        <View style={styles.line} />
        <PersonAppointmentCard pending />
        <PersonAppointmentCard confirmed name="ايمن جاب الله" />
        <PersonAppointmentCard confirmed name="اسراء السباكة" />
        <PersonAppointmentCard confirmed name="مروة" />
        <PersonAppointmentCard pending name="يوسف" />
        <PersonAppointmentCard confirmed name="عدي حاتم" />
        <PersonAppointmentCard pending name="الشاذلي" />
      </ScrollView>
    </View>
  );
}

export default DoctorAppointments;
