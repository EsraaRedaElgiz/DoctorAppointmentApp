import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import AppointmentStack from './AppointmentStack';
import HistoryStack from './HistoryStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserProfileStack from './UserProfileStack';
import {COLORS, FONTS, ICONS} from '../constants/Constants';
import {style} from '../styles/Style';
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => {
          const iconNameUnselect = {
            Home: 'home-outline',
            Appointment: 'calendar-outline',
            History: 'copy-outline',
            Profile: 'person-outline',
          };
          const iconNameSelect = {
            Home: 'home',
            Appointment: 'calendar',
            History: 'copy',
            Profile: 'person',
          };
          const label = {
            Home: 'الرئيسيه',
            Appointment: 'المواعيد',
            History: 'التاريخ',
            Profile: 'الحساب',
          };
          return {
            headerShown: false,
            tabBarHideOnKeyboard:true,
            tabBarStyle: {
              backgroundColor: COLORS.blue,
            },
            tabBarIcon: ({focused}) => (
              <Ionicons
                name={
                  focused
                    ? iconNameSelect[route.name]
                    : iconNameUnselect[route.name]
                }
                size={ICONS.mdIcon}
                color={focused ? COLORS.white : COLORS.gray}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  style.textSmallContentBold,
                  {color: focused ? COLORS.white : COLORS.gray},
                ]}>
                {label[route.name]}
              </Text>
            ),
          };
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
