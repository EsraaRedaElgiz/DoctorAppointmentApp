import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from '../screens/History/History';
import Prescription from '../screens/Prescription/Prescription';
const Stack = createNativeStackNavigator();
const HistoryStack = () => {
  return (
    <>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen name="Historyscreen" component={History} />
        <Stack.Screen name="Prescription" component={Prescription} />
      </Stack.Navigator>
    </>
  );
};

export default HistoryStack;

const styles = StyleSheet.create({});