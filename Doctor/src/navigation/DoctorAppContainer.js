import React from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from '../../../src/constants/Constants';
import {NavigationContainer} from '@react-navigation/native';
import DoctorAuthStack from './DoctorAuthStack';

const DoctorAppContainer = props => {
  const {isAuth} = props;
  return (
    <>
      <StatusBar backgroundColor={COLORS.blue} />
      <NavigationContainer>
        {isAuth ? <DoctorHomeTabs /> : <DoctorAuthStack />}
      </NavigationContainer>
    </>
  );
};

export default DoctorAppContainer;
