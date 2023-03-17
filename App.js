import React from 'react';
import { COLORS } from './src/constants/Constants';
import AppContainer from './src/navigation/AppContainer';
import EditDoctorDetails from './Doctor/src/screens/EditDoctorDetails/EditDoctorDetails';
import Compeleteinformation from './Doctor/src/screens/Compeleteinformation/Compeleteinformation'
import {useSelector} from 'react-redux';
import MedicalSheet from './src/screens/MedicalSheet/MedicalSheet';
function App() {
  // const globalState = useSelector(state => state);
  // return <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />;
  return<Compeleteinformation/>
}

export default App;