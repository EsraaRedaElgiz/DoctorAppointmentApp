import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DoctorHomeStack from './DoctorHomeStack';
import DoctorAppointmentStack from './AppointmentStack';
import DoctorHistoryStack from './DoctorHistoryStack';
import DoctorProfileStack from './DoctorProfileStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, ICONS} from '../../../src/constants/Constants';
import {style} from '../../../src/styles/Style';
import {useDispatch} from 'react-redux';
import {getDoctorAppointments} from '../Redux/Reducers/DoctorAppointmentSlice';
import {getDoctorHistory} from '../Redux/Reducers/DoctorHistorySlice';

const Tab = createBottomTabNavigator();

const DoctorHomeTabs = () => {
  const dispatch = useDispatch();
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
              backgroundColor: COLORS.white,
            },
            tabBarVisibilityAnimationConfig: true,
            tabBarIcon: ({focused}) => (
              <Ionicons
                name={
                  focused
                    ? iconNameSelect[route.name]
                    : iconNameUnselect[route.name]
                }
                size={ICONS.mdIcon}
                color={focused ? COLORS.blue : COLORS.gray}
              />
            ),
            tabBarLabel: ({focused}) =>
              focused ? (
                <>
                  <Text
                    style={[
                      style.textSmallContentBold,
                      {color: focused ? COLORS.blue : COLORS.gray},
                    ]}>
                    {label[route.name]}
                  </Text>
                  <View style={style.underLineBottomTab}></View>
                </>
              ) : null,
          };
        }}>
        <Tab.Screen name="Home" component={DoctorHomeStack} />
        <Tab.Screen
          name="Appointment"
          component={DoctorAppointmentStack}
          listeners={{
            tabPress: () => {
              dispatch(getDoctorAppointments({filter: 'upcoming'}));
            },
          }}
        />
        <Tab.Screen
          name="History"
          component={DoctorHistoryStack}
          listeners={{
            tabPress: () => {
              dispatch(getDoctorHistory({filter: 'history'}));
            },
          }}
        />
        <Tab.Screen name="Profile" component={DoctorProfileStack} />
      </Tab.Navigator>
    </>
  );
};

export default DoctorHomeTabs;

const styles = StyleSheet.create({});
