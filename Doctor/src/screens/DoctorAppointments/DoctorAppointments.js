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
                  imageUri={itemData.item.imageUri}
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
