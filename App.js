import React from 'react';
import AppContainer from './src/navigation/AppContainer';
import AppointmentDetails from './Doctor/src/screens/AppointmentDetails/AppointmentDetails';
import AddAppointmentBySecretary from './Doctor/src/screens/AddAppointmentBySecretary/AddAppointmentBySecretary';
import {useSelector} from 'react-redux';
import DoctorAppointments from './Doctor/src/screens/DoctorAppointments/DoctorAppointments';
function App() {
  {
    /*} const globalState = useSelector(state => state);
return <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />;*/
  }
  return <DoctorAppointments />;
}

export default App;
