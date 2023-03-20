import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DoctorHomeStack from './DoctorHomeStack';
import DoctorAppointmentStack from './AppointmentStack';
import DoctorHistoryStack from './DoctorHistoryStack';
import DoctorProfileStack from './DoctorProfileStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, ICONS} from '../../../src/constants/Constants';
import {style} from '../../../src/styles/Style';

const Tab = createBottomTabNavigator();

const DoctorHomeTabs = () => {
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
            tabBarHideOnKeyboard: true,
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
        <Tab.Screen name="Home" component={DoctorHomeStack} />
        <Tab.Screen name="Appointment" component={DoctorAppointmentStack} />
        <Tab.Screen name="History" component={DoctorHistoryStack} />
        <Tab.Screen name="Profile" component={DoctorProfileStack} />
      </Tab.Navigator>
    </>
  );
};

export default DoctorHomeTabs;

const styles = StyleSheet.create({});