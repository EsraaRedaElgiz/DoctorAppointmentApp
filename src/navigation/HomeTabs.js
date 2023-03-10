import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import AppointmentStack from './AppointmentStack';
import HistoryStack from './HistoryStack';
import UserProfileStack from './UserProfileStack';
const Tab = createBottomTabNavigator();
const HomeTabs = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Appointment" component={AppointmentStack} />
        <Tab.Screen name="History" component={HistoryStack} />
        <Tab.Screen name="Profile" component={UserProfileStack} />
      </Tab.Navigator>
    </>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({});
