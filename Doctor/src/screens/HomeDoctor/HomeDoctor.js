import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, { useEffect } from 'react';
import {HeaderHomeDoctor, Statistics} from '../../Components';
import {style} from '../../../../src/styles/Style';
import {ListTiltle} from '../../../../src/components/Home';
import PatientsListHome from '../../Components/PatientsListHome/PatientsListHome';
import {PADDINGS, COLORS, USER_TOKEN, USER_DATA} from '../../../../src/constants/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSuccessAdd } from '../../Redux/Reducers/AddAppointmentBySecretarySlice';
import { useDispatch } from 'react-redux';

const HomeDoctor = ({navigation}) => {
  const dispatch=useDispatch();
  useEffect(() => {
    getToken()
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setSuccessAdd(false))
    });

    return unsubscribe;
  }, [navigation])

  const getToken = async ()=> {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    const data = await AsyncStorage.getItem(USER_DATA);
    console.log('token => ', token);
    console.log('data => ', data);
  }
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
