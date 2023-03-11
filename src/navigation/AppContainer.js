import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabs from './HomeTabs';
const AppContainer = props => {
  const {isAuth} = props;
  return (
    <>
      <NavigationContainer>
        {isAuth ? <HomeTabs /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
