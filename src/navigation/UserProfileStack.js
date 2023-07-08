import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from '../screens/History/History';
import UserProfile from '../screens/UserProfile/UserProfile';
import NewPassword from '../screens/NewPassword/NewPassword';
import SupportTeam from '../screens/SupportTeam/SupportTeam';
import Payment from '../screens/Payment/Payment';
import AddCard from '../screens/AddCard/AddCard';
import MedicalID1 from '../screens/MedicalID1/MedicalID1';
import EditPersonDetails from '../screens/EditPersonDetails/EditPersonDetails';
import Prescription from '../screens/Prescription/Prescription';
import { ConditionsAndTerms, PrivacyPolicy } from '../screens';
const Stack = createNativeStackNavigator();
const UserProfileStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="MedicalID1" component={MedicalID1} />
        <Stack.Screen name="EditPersonDetails" component={EditPersonDetails} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="SupportTeam" component={SupportTeam} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="Prescription" component={Prescription} />
        <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <Stack.Screen name="ConditionsAndTerms" component={ConditionsAndTerms}  />
      </Stack.Navigator>
    </>
  );
};

export default UserProfileStack;

const styles = StyleSheet.create({});
