import {StyleSheet} from 'react-native';
import React from 'react';
import {
  BookAppointment,
  CompletedAppointment,
  DoctorProfile,
  DoctorsSearch,
  Home,
  PaymentCash,
  PaymentCreditCard,
  SpecialitySearch,
} from '../screens';
import MedicalID1 from '../screens/MedicalID1/MedicalID1';
import EditPersonDetails from '../screens/EditPersonDetails/EditPersonDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddCard from '../screens/AddCard/AddCard';
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* Home */}
      
      <Stack.Screen name="Homescreen" component={Home} />
      <Stack.Screen name="SpecialitySearch" component={SpecialitySearch} />
      <Stack.Screen name="DoctorsSearch" component={DoctorsSearch} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="PaymentCash" component={PaymentCash} />
      <Stack.Screen name="PaymentCreditCard" component={PaymentCreditCard} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen
        name="CompletedAppointment"
        component={CompletedAppointment}
      />
      <Stack.Screen name="MedicalID1" component={MedicalID1} />
      <Stack.Screen name="EditPersonDetails" component={EditPersonDetails} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
