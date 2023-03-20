import React from 'react';
import {StatusBar} from 'react-native';
import AuthStack from './AuthStack';
import HomeTabs from './HomeTabs';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from '../constants/Constants';

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
