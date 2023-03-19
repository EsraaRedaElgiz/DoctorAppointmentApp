import React from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import styles from './DoctorHistoryStyles';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import {COLORS, PADDINGS} from '../../../../src/constants/Constants';
import Calender from '../../../../src/components/Calender/Calender';
import PersonAppointmentCard from '../../../../src/components/PersonAppointmentCard/PersonAppointmentCard';

function DoctorHistory({navigation}) {
  return (
    <View style={styles.container}>
      
      <HeaderNavigation
        icon
        iconName="sliders"
        title="التاريخ"
        color={COLORS.darkGray3}
        // onPress={()}
        onPressBtn={()=>{
          navigation.navigate("DoctorFilterHistory")
        }}
      />
      <View style={styles.headerView}>
        <Text style={styles.dateText}> 4 Feb 2023</Text>
      </View>
      <View style={styles.calenderView}>
        <Calender />
      </View>
      <View style={styles.line} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentStyle}>
        <PersonAppointmentCard pending time="10:30 AM" />
        <PersonAppointmentCard confirmed name="ايمن جاب الله" time="10:30 AM" />
        <PersonAppointmentCard confirmed name="اسراء السباكة" time="10:30 AM" />
        <PersonAppointmentCard confirmed name="مروة" time="10:30 AM" />
        <PersonAppointmentCard pending name="يوسف" time="10:30 AM" />
        <PersonAppointmentCard confirmed name="عدي حاتم" time="10:30 AM" />
        <PersonAppointmentCard pending name="الشاذلي" time="10:30 AM" />
      </ScrollView>
    </View>
  );
}

export default DoctorHistory;
