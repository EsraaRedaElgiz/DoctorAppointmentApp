import React from 'react';
import AppContainer from './src/navigation/AppContainer';
import AppointmentDetails from './Doctor/src/screens/AppointmentDetails/AppointmentDetails';
import AddAppointmentBySecretary from './Doctor/src/screens/AddAppointmentBySecretary/AddAppointmentBySecretary';
import {useSelector} from 'react-redux';
import Compeleteinformation from './Doctor/src/screens/Compeleteinformation/Compeleteinformation';
import DoctorPrescription from './Doctor/src/screens/DoctorPrescription/DoctorPrescription';
import DoctorAppointments from './Doctor/src/screens/DoctorAppointments/DoctorAppointments';
import DoctorFilterAppointment from './Doctor/src/screens/DoctorFilterAppointments/DoctorFilterAppointments';
import DoctorFilterHistory from './Doctor/src/screens/DoctorFilterHistory/DoctorFilterHistory';
import DoctorHistory from './Doctor/src/screens/DoctorHistory/DoctorHistory';
import DoctorSupportTeam from './Doctor/src/screens/DoctorSupportTeam/DoctorSupportTeam';
import {DoctorViewProfile} from './Doctor/src/screens';
function App() {
  {
    /*const globalState = useSelector(state => state);
return <AppContainer isAuth={globalState.AuthReducer.isLoggedIn} />;*/
  }

  return (
    <>
      {/*<HomeDoctor/> */}
      {/* <DoctorViewProfile/> */}
      {/* <BookAppointment/> */}
      {/* <DoctorAppointments /> */}
      <DoctorAppointments />
      {/*AddAppointmentBySecretary/>*/}
      {/*<AppointmentDetails/>*/}
    </>
  );
}

export default App;
