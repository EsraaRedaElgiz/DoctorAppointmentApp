import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React from 'react';
import {HeaderHomeDoctor, Statistics} from '../../Components';
import {style} from '../../../../src/styles/Style';
import {ListTiltle} from '../../../../src/components/Home';
import PatientsListHome from '../../Components/PatientsListHome/PatientsListHome';

const HomeDoctor = () => {
  return (
    <>
    
      <HeaderHomeDoctor />
      <View style={style.bigContainer}>
          <Statistics />
          <ListTiltle
            Title="مواعيد اليوم"
            seeAll="اضافة"
            onPress={() => {
              Alert.alert('go to add appoinment page');
            }}
          />
          <PatientsListHome/>
      </View>
    </>
  );
};

export default HomeDoctor;

const styles = StyleSheet.create({});
