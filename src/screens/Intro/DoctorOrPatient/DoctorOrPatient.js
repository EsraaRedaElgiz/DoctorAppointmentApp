import React, {useState} from 'react';
import {Text, View, Image, StatusBar, ScrollView} from 'react-native';
import styles from './styles';
import {COLORS} from '../../../constants/Constants';
import GeneralButton from '../../../components/GeneralButton/GeneralButton';
import {useDispatch} from 'react-redux';
import Images from '../../../constants/Images';
import {setIsDoctor} from '../../../Redux/Reducers/AuthSlice';
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
          }}
        />
        <GeneralButton
          title="دكتور"
          onPress={() => {
            dispatch(setIsDoctor());
          }}
        />
      </View>
    </ScrollView>
  );
}
export default DoctorOrPatient;
