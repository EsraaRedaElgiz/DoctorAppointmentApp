import React from 'react';
import {COLORS} from './src/constants/Constants';
import AppContainer from './src/navigation/AppContainer';
import AppointmentDetails from './Doctor/src/screens/AppointmentDetails/AppointmentDetails';
import AddAppointmentBySecretary from './Doctor/src/screens/AddAppointmentBySecretary/AddAppointmentBySecretary';
import {useSelector} from 'react-redux';
import DoctorAppointments from './Doctor/src/screens/DoctorAppointments/DoctorAppointments';
import Compeleteinformation from './Doctor/src/screens/Compeleteinformation/Compeleteinformation';
import EditDoctorDetails from './Doctor/src/screens/EditDoctorDetails/EditDoctorDetails';
import DoctorHistory from './Doctor/src/screens/DoctorHistory/DoctorHistory';
import DoctorFilterAppointments from './Doctor/src/screens/DoctorFilterAppointments/DoctorFilterAppointments';
import DoctorFilterHistory from './Doctor/src/screens/DoctorFilterHistory/DoctorFilterHistory';
import DoctorSupportTeam from './Doctor/src/screens/DoctorSupportTeam/DoctorSupportTeam';
import DoctorPrescription from './Doctor/src/screens/DoctorPrescription/DoctorPrescription';
function App() {
  {
    /*} const globalState = useSelector(state => state);
return <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />;*/
  }
  return <DoctorPrescription />;
}

export default App;
