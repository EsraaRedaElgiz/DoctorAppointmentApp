import React from 'react';
import DoctorAppointments from '../screens/DoctorAppointments/DoctorAppointments';
import AddAppointmentBySecretary from '../screens/AddAppointmentBySecretary/AddAppointmentBySecretary';
import AppointmentDetails from '../screens/AppointmentDetails/AppointmentDetails';
import DoctorFilterAppointment from '../screens/DoctorFilterAppointments/DoctorFilterAppointments';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDetails from '../screens/UserDetails/UserDetails';
import DoctorPrescription from '../screens/DoctorPrescription/DoctorPrescription';
import Prescription from '../../../src/screens/Prescription/Prescription';
const Stack = createNativeStackNavigator();
const DoctorAppointmentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DoctorAppointments" component={DoctorAppointments} />
      <Stack.Screen
        name="AddAppointmentBySecretary"
        component={AddAppointmentBySecretary}
      />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen
        name="DoctorFilterAppointment"
        component={DoctorFilterAppointment}
      />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="Prescription" component={Prescription} />
      <Stack.Screen name="DoctorPrescription" component={DoctorPrescription} />

    </Stack.Navigator>
  );
};

export default DoctorAppointmentStack;
