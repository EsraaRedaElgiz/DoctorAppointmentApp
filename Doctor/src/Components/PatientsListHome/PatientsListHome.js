import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {PatientsData} from '../../../../src/utils';
import PersonAppointmentCard from '../../../../src/components/PersonAppointmentCard/PersonAppointmentCard';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';

const PatientsListHome = () => {
  const navigation = useNavigation();
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
                name={itemData.item.name.trim()}
                time={itemData.item.time}
                confirmed={itemData.item.confirmed}
                imageUri={itemData.item.imageUri}
                onPress={() => {
                  navigation.navigate('AppointmentDetails', {
                    PatientsArray: itemData.item,
                    appointmentStatus:itemData.item.confirmed?"تم التأكيد":"معلق"
                  });
                }}
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
