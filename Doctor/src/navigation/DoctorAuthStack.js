import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp/SignUp';
import LogIn from '../screens/LogIn/LogIn';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import VertificationCode from '../screens/VetificationCode/VertificationCode';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import MedicalSheet from '../screens/MedicalSheet/MedicalSheet';
import LoginWithG from '../utils/LoginWithG';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="LoginWithG" component={LoginWithG} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="VertificationCode" component={VertificationCode} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="MedicalSheet" component={MedicalSheet} />
    </Stack.Navigator>
  );
};

export default AuthStack;
