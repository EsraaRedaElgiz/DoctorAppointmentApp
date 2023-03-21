import React from 'react';
import {View, Text, ScrollView, Button, FlatList} from 'react-native';
import styles from './DoctorHistoryStyles';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import {COLORS, PADDINGS} from '../../../../src/constants/Constants';
import Calender from '../../../../src/components/Calender/Calender';
import {PatientsData} from '../../../../src/utils';
import PersonHistoryCard from '../../Components/PresonHistoryCard/PersonHistoryCard';

function DoctorHistory({navigation}) {
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={PatientsData}
        renderItem={(itemData, index) => {
          return (
            <>
              <PersonHistoryCard
                done={itemData.item.done}
                name={itemData.item.name.trim()}
                time={itemData.item.time}
                imageUri={itemData.item.imageUri}
                onPress={() => {
                  navigation.navigate('AppointmentDetails', {
                    PatientsArray: itemData.item,
                    appointmentStatus: itemData.item.done ? 'مكتمل' : 'ملغى',
                  });
                }}
              />
            </>
          );
        }}
      />
    </View>
  );
}

export default DoctorHistory;
