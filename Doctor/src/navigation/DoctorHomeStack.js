import React from 'react';
import {HomeDoctor} from '../screens';
import {DoctorViewProfile} from '../screens';
import AddAppointmentBySecretary from '../screens/AddAppointmentBySecretary/AddAppointmentBySecretary';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppointmentDetails from '../screens/AppointmentDetails/AppointmentDetails';
import DoctorAppointments from '../screens/DoctorAppointments/DoctorAppointments';
import UserDetails from '../screens/UserDetails/UserDetails';
import Prescription from '../../../src/screens/Prescription/Prescription';
import DoctorPrescription from '../screens/DoctorPrescription/DoctorPrescription';
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
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="Prescription" component={Prescription} />
      <Stack.Screen name="DoctorPrescription" component={DoctorPrescription} />
    </Stack.Navigator>
  );
};

export default DoctorHomeStack;
