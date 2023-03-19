import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {PatientsData} from '../../../../src/utils';
import PersonAppointmentCard from '../../../../src/components/PersonAppointmentCard/PersonAppointmentCard';
import {RFValue} from 'react-native-responsive-fontsize';

const PatientsListHome = () => {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: RFValue(1)}}
        data={PatientsData}
        renderItem={(itemData, index) => {
          return (
            <>
              <PersonAppointmentCard
                name={itemData.item.name}
                time={itemData.item.time}
                confirmed={itemData.item.confirmed}
                imageUri={itemData.item.imageUri}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default PatientsListHome;

const styles = StyleSheet.create({});
