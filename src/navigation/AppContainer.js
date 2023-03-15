import {StyleSheet, Text, View,StatusBar} from 'react-native';
import React from 'react';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import { COLORS } from '../constants/Constants';
import HomeTabs from './HomeTabs';
const AppContainer = props => {
  const {isAuth} = props;
  return (
    <>
    <StatusBar backgroundColor={COLORS.blue} />
      <NavigationContainer>
        {isAuth ? <HomeTabs /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
