import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React from 'react';
import {HeaderHomeDoctor, Statistics} from '../../Components';
import {style} from '../../../../src/styles/Style';
import {ListTiltle} from '../../../../src/components/Home';
import PatientsListHome from '../../Components/PatientsListHome/PatientsListHome';
import {PADDINGS, COLORS} from '../../../../src/constants/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

const HomeDoctor = ({navigation}) => {
  return (
    <>
      <HeaderHomeDoctor />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Statistics />
          <ListTiltle
            Title="مواعيد اليوم"
            seeAll="اضافة"
            onPress={() => {
              navigation.navigate('AddAppointmentBySecretary');
            }}
          />
          <PatientsListHome />
        </ScrollView>
      </View>
    </>
  );
};

export default HomeDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.mdPadding,
  },
});
