import React from 'react';
import {View, Text, ScrollView, Button, FlatList} from 'react-native';
import styles from './DoctorHistoryStyles';
import { HeaderNavigation } from '../../../../src/components/headerNavigation/HeaderNavigation';
import { COLORS, PADDINGS } from '../../../../src/constants/Constants';
import Calender from '../../../../src/components/Calender/Calender';
import {PatientsData} from '../../../../src/utils';
import PersonHistoryCard from '../../Components/PresonHistoryCard/PersonHistoryCard';

function DoctorHistory({ navigation }) {
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
              />
            </>
          );
        }}
      />
    </View>
  );
}

export default DoctorHistory;
