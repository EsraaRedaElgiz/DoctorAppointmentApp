import React from 'react';
import AppointmentDetails from '../screens/AppointmentDetails/AppointmentDetails';
import DoctorFilterHistory from '../screens/DoctorFilterHistory/DoctorFilterHistory';
import DoctorHistory from '../screens/DoctorHistory/DoctorHistory';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const DoctorHistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DoctorHistory" component={DoctorHistory} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen
        name="DoctorFilterHistory"
        component={DoctorFilterHistory}
      />
      
    </Stack.Navigator>
  );
};

export default DoctorHistoryStack;
