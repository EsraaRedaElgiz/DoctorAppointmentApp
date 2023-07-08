import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorLogin from '../screens/DoctorLogin/DoctorLogin';
import DoctorSignup from '../screens/DoctorSignup/DoctorSignup';
import DoctorForgetPassword from '../screens/DoctorForgetPassword/DoctorForgetPassword';
import DoctorVerification from '../screens/DoctorVerification/DoctorVerification';
import DoctorResetPassword from '../screens/DoctorResetPassword/DoctorResetPassword';
import Compeleteinformation from '../screens/Compeleteinformation/Compeleteinformation';
import LoginWithG from '../../../src/utils/LoginWithG';
import DoctorOrPatient from '../../../src/screens/Intro/DoctorOrPatient/DoctorOrPatient';
import {ConditionsAndTerms, PrivacyPolicy} from '../../../src/screens';

const Stack = createNativeStackNavigator();
const DoctorAuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DoctorSignup" component={DoctorSignup} />
      <Stack.Screen name="DoctorOrPatient" component={DoctorOrPatient} />
      <Stack.Screen name="DoctorLogIn" component={DoctorLogin} />
      <Stack.Screen name="LoginWithG" component={LoginWithG} />
      <Stack.Screen
        name="DoctorForgetPassword"
        component={DoctorForgetPassword}
      />
      <Stack.Screen name="DoctorVerification" component={DoctorVerification} />
      <Stack.Screen
        name="DoctorResetPassword"
        component={DoctorResetPassword}
      />
      <Stack.Screen
        name="CompleteInformation"
        component={Compeleteinformation}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        
      />
      <Stack.Screen
        name="ConditionsAndTerms"
        component={ConditionsAndTerms}
        
      />
    </Stack.Navigator>
  );
};

export default DoctorAuthStack;
