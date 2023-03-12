import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import AppointmentStack from './AppointmentStack';
import HistoryStack from './HistoryStack';
import UserProfileStack from './UserProfileStack';
import Splash from '../screens/Intro/Splash/Splash';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS ,ICONS} from '../constants/Constants';
const Tab = createBottomTabNavigator();
const HomeTabs = () => {
  return (
    <>
      <Tab.Navigator
      
        screenOptions={{
          headerShown: false,
          /*tabBarActiveTintColor:"red",
          tabBarBackground:"red",
          tabBarInactiveTintColor:"red"*/
          tabBarActiveTintColor:COLORS.white,
          tabBarInactiveTintColor:COLORS.gray,
          tabBarStyle: {
            backgroundColor:COLORS.blue,
        }
        
        }}
              
        >
        <Tab.Screen name="الصفحه الرئيسيه"component={HomeStack}
          options={{
            
            tabBarIcon: ({ color }) => {
              return (
                <View>
                  <FontAwesome name="home" color={color} size={ICONS.mdIcon} />
                </View>
              );
            },
           
          }} />
        <Tab.Screen name="المواعيد" component={AppointmentStack}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <View>
                <FontAwesome5 name="calendar-alt" color={color} size={ICONS.mdIcon} />
              </View>
            );
          },
        }}  />
        <Tab.Screen name="التاريخ" component={HistoryStack} 
        options={{
            tabBarIcon: ({ color }) => {
              return (
                <View>
                  <Ionicons name="md-file-tray-full-outline" size={ICONS.mdIcon} color={color}/>
                </View>
              );
            },
          }} />
        <Tab.Screen name="الملف الشخصي" component={UserProfileStack}
         options={{
            tabBarIcon: ({ color }) => {
              return (
                <View>
                  <Ionicons name="person-sharp" size={ICONS.mdIcon} color={color}/>
                </View>
              );
            },
          }}  />
      </Tab.Navigator>
    </>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({});
