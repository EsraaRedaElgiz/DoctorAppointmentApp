import React from 'react';
import DoctorAppointments from '../screens/DoctorAppointments/DoctorAppointments';
import AddAppointmentBySecretary from '../screens/AddAppointmentBySecretary/AddAppointmentBySecretary';
import AppointmentDetails from '../screens/AppointmentDetails/AppointmentDetails';
import DoctorFilterAppointment from '../screens/DoctorFilterAppointments/DoctorFilterAppointments';
import {DoctorProfile} from '../../../src/screens';
import {DoctorViewProfile} from '../screens';
import EditDoctorDetails from '../screens/EditDoctorDetails/EditDoctorDetails';
import DoctorNewPassword from '../screens/DoctorNewPassword/DoctorNewPassword';
import DoctorSupportTeam from '../screens/DoctorSupportTeam/DoctorSupportTeam';
const Stack = createNativeStackNavigator();
const DoctorProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      <Stack.Screen name="DoctorViewProfile" component={DoctorViewProfile} />
      <Stack.Screen name="EditDoctorDetails" component={EditDoctorDetails} />
      <Stack.Screen name="DoctorNewPassword" component={DoctorNewPassword} />
      <Stack.Screen name="DoctorSupportTeam" component={DoctorSupportTeam} />
    </Stack.Navigator>
  );
};

export default DoctorProfileStack;
