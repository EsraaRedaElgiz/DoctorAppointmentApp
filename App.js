import React, {useEffect} from 'react';
import AppContainer from './src/navigation/AppContainer';
import {useSelector} from 'react-redux';
import DoctorAppContainer from './Doctor/src/navigation/DoctorAppContainer';
import DoctorPrescription from './Doctor/src/screens/DoctorPrescription/DoctorPrescription';
function App() {
  const globalState = useSelector(state => state);
  return globalState.AuthReducer.isDoctor ? (
    <DoctorAppContainer isAuth={globalState.AuthReducer.isLoggedIn} />
  ) : (
    <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />
  );
}

export default App;
