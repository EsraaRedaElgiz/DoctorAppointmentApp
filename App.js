import React from 'react';
import { COLORS } from './src/constants/Constants';
import AppContainer from './src/navigation/AppContainer';
import AppointmentDetails from './Doctor/src/screens/AppointmentDetails/AppointmentDetails';
import AddAppointmentBySecretary from './Doctor/src/screens/AddAppointmentBySecretary/AddAppointmentBySecretary';
import {useSelector} from 'react-redux';
import MedicalSheet from './src/screens/MedicalSheet/MedicalSheet';
import Compeleteinformation from './Doctor/src/screens/Compeleteinformation/Compeleteinformation';
import EditDoctorDetails from './Doctor/src/screens/EditDoctorDetails/EditDoctorDetails';
function App() {
//   const globalState = useSelector(state => state);
// return <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />;
return <Compeleteinformation/>
}

export default App;