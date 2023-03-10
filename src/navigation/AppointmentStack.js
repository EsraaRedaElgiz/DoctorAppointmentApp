import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Appointment from '../screens/Appointment/Appointment';
const Stack = createNativeStackNavigator();
const AppointmentStack = () => {
  return (
    <>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen name="Appointmentscreen" component={Appointment} />
      </Stack.Navigator>
    </>
  );
};

export default AppointmentStack;

const styles = StyleSheet.create({});
