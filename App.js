import React, {useEffect} from 'react';
import AppContainer from './src/navigation/AppContainer';
import {useDispatch, useSelector} from 'react-redux';
import DoctorAppContainer from './Doctor/src/navigation/DoctorAppContainer';
import {IS_DOCTOR} from './src/constants/Constants';
import {setIsDoctor} from './src/Redux/Reducers/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getIsDocValue();
    LogBox.ignoreAllLogs();
  }, []);
  const getIsDocValue = async () => {
    await AsyncStorage.getItem(IS_DOCTOR).then(res => {
      if (JSON.parse(res) === 0) {
        dispatch(setIsDoctor(false));
      } else if (JSON.parse(res) === 1) {
        dispatch(setIsDoctor(true));
      }
    });
  };
  const globalState = useSelector(state => state);
  return globalState.AuthReducer.isDoctor ? (
    <DoctorAppContainer isAuth={globalState.AuthReducer.isLoggedIn} />
  ) : (
    <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />
  );
}

export default App;
