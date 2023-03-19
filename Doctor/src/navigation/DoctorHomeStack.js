import React from 'react';
import {HomeDoctor} from '../screens';
import DoctorViewProfile from '../screens';
import AddAppointmentBySecretary from '../screens/AddAppointmentBySecretary/AddAppointmentBySecretary';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppointmentDetails from '../screens/AppointmentDetails/AppointmentDetails';
const Stack = createNativeStackNavigator();
const DoctorHomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeDoctor" component={HomeDoctor} />
      <Stack.Screen name="DoctorViewProfile" component={DoctorViewProfile} />
      <Stack.Screen
        name="AddAppointmentBySecretary"
        component={AddAppointmentBySecretary}
      />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
    </Stack.Navigator>
  );
};

export default DoctorHomeStack;
