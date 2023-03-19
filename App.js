import React, {useEffect} from 'react';
import AppContainer from './src/navigation/AppContainer';
import {useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import Splash from './src/screens/Intro/Splash/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoctorSignup from './Doctor/src/screens/DoctorSignup/DoctorSignup';
import DoctorResetPassword from './Doctor/src/screens/DoctorResetPassword/DoctorResetPassword';
import DoctorLogin from './Doctor/src/screens/DoctorLogin/DoctorLogin';
import DoctorForgetPassword from './Doctor/src/screens/DoctorForgetPassword/DoctorForgetPassword';
import DoctorVerification from './Doctor/src/screens/DoctorVerification/DoctorVerification';
import DoctorNewPassword from './Doctor/src/screens/DoctorNewPassword/DoctorNewPassword';
function App() {
  const globalState = useSelector(state => state);
  // AsyncStorage.clear();
  // return globalState.AuthReducer.isDoctor ? (
  //   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //     <Text>Doctor</Text>
  //   </View>
  // ) : (
  //   <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />
  // );
  return <DoctorLogin />;
  // return <DoctorNewPassword />;
}

export default App;
