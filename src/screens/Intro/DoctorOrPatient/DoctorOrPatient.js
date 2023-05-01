import React, {useState} from 'react';
import {Text, View, Image, StatusBar, ScrollView} from 'react-native';
import styles from './styles';
import {COLORS,IS_DOCTOR} from '../../../constants/Constants';
import GeneralButton from '../../../components/GeneralButton/GeneralButton';
import {useDispatch} from 'react-redux';
import Images from '../../../constants/Images';
import {setIsDoctor} from '../../../Redux/Reducers/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
function DoctorOrPatient({navigation}) {
  const dispatch = useDispatch();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.scrollViewContentContainerStyle}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.blue} />
        <View style={styles.viewForImageStyle}>
          <Image source={Images.doctorOrPatient} style={styles.imageStyle} />
        </View>
        <View style={styles.viewTextStyle}>
          <Text style={styles.textStyle}>أنا...</Text>
        </View>
        <GeneralButton
          title="مريض"
          style={styles.marginAfterFirstButton}
          onPress={() => {
            navigation.navigate('SignUp');
            AsyncStorage.setItem(IS_DOCTOR,JSON.stringify(0))
          }}
        />
        <GeneralButton
          title="دكتور"
          onPress={() => {
            dispatch(setIsDoctor(true));
            AsyncStorage.setItem(IS_DOCTOR,JSON.stringify(1))

          }}
        />
      </View>
    </ScrollView>
  );
}
export default DoctorOrPatient;
