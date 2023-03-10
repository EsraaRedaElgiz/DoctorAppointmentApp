import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroSlider from '../screens/Intro/IntroSlider/IntroSlider';
import DoctorOrPatient from '../screens/Intro/DoctorOrPatient/DoctorOrPatient';
import SignUp from '../screens/SignUp/SignUp';
import LogIn from '../screens/LogIn/LogIn';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import VertificationCode from '../screens/VetificationCode/VertificationCode';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import MedicalSheet from '../screens/MedicalSheet/MedicalSheet';
import Splash from '../screens/Intro/Splash/Splash';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* Auth */}

        {/* <Stack.Screen name="splash" component={Splash} /> */}
        <Stack.Screen name="intro" component={IntroSlider} />
        <Stack.Screen name="DoctorOrPatient" component={DoctorOrPatient} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="VertificationCode" component={VertificationCode} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="MedicalSheet" component={MedicalSheet} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
