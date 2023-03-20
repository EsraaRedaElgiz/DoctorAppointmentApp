import React from 'react';

import { DoctorViewProfile } from '../screens';
import DoctorProfileTabs from '../screens/DoctorProfileTabs/DoctorProfileTabs';
import EditDoctorDetails from '../screens/EditDoctorDetails/EditDoctorDetails';

import DoctorNewPassword from '../screens/DoctorNewPassword/DoctorNewPassword';

import DoctorSupportTeam from '../screens/DoctorSupportTeam/DoctorSupportTeam';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const DoctorProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DoctorProfile" component={DoctorProfileTabs} />
      <Stack.Screen name="DoctorViewProfile" component={DoctorViewProfile} />
      <Stack.Screen name="EditDoctorDetails" component={EditDoctorDetails} />
      <Stack.Screen name="DoctorNewPassword" component={DoctorNewPassword} />
      <Stack.Screen name="DoctorSupportTeam" component={DoctorSupportTeam} />
    </Stack.Navigator>
  );
};

export default DoctorProfileStack;
