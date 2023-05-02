import SignUpReducer from './Reducers/SignUpSlice';
import ResetPasswordReducer from './Reducers/ResetPasswordSlice';
import NewPasswordReducer from './Reducers/NewPasswordSlice';
import VertificationCodeReducer from './Reducers/VertificationCodeSlice';
import ForgetPasswordReducer from './Reducers/SendEmailSlice';
import LoginReducer from './Reducers/LoginSlice';
import MedicalSheetReducer from './Reducers/MedicalSheetSlice';
import IntroSliderReducer from './Reducers/IntroSliderSlice';
import AppointmentReducer from './Reducers/AppointmentSlice';
import HistoryReducer from './Reducers/HistorySlice';
import AuthReducer from './Reducers/AuthSlice';
import DoctorSignUpReducer from '../../Doctor/src/Redux/Reducers/DoctorSignUpSlice';
import AddAppointmentBySecretaryReducer from '../../Doctor/src/Redux/Reducers/AddAppointmentBySecretarySlice';
import {configureStore} from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
    SignUpReducer: SignUpReducer,
    ResetPasswordReducer: ResetPasswordReducer,
    NewPasswordReducer: NewPasswordReducer,
    VertificationCodeReducer: VertificationCodeReducer,
    ForgetPasswordReducer: ForgetPasswordReducer,
    LoginReducer: LoginReducer,
    MedicalSheetReducer: MedicalSheetReducer,
    IntroSliderReducer: IntroSliderReducer,
    AppointmentReducer: AppointmentReducer,
    HistoryReducer: HistoryReducer,
    AuthReducer: AuthReducer,
    DoctorSignUpReducer:DoctorSignUpReducer,
    AddAppointmentBySecretaryReducer:AddAppointmentBySecretaryReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});
export default store;
