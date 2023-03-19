import React from 'react';
import DoctorAppointments from '../screens/DoctorAppointments/DoctorAppointments';
import AddAppointmentBySecretary from '../screens/AddAppointmentBySecretary/AddAppointmentBySecretary';
import AppointmentDetails from '../screens/AppointmentDetails/AppointmentDetails';
import DoctorFilterAppointment from '../screens/DoctorFilterAppointments/DoctorFilterAppointments';
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
    </Stack.Navigator>
  );
};

export default DoctorAppointmentStack;
