import React, {useEffect} from 'react';
import AppContainer from './src/navigation/AppContainer';
import {useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import DoctorAppContainer from './Doctor/src/navigation/DoctorAppContainer';
function App() {
  const globalState = useSelector(state => state);
  return globalState.AuthReducer.isDoctor ? (
    <DoctorAppContainer />
  ) : (
    <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />
  );
}

export default App;
