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
import PersonalDetailsReducer from './Reducers/PersonalDetailsSlice';
import GetSpecialitiesReducer from './Reducers/GetSpecialitiesSlice';
import PaymentCardReducer from './Reducers/PaymentCardSlice';
import AppointmentDetailsReducer from '../../Doctor/src/Redux/Reducers/AppointmentDetailsSlice';
import AddCardReducer from './Reducers/AddCardSlice';
import PrescriptionReducer from './Reducers/PrescriptionSlice';
import {configureStore} from '@reduxjs/toolkit';
import DoctorAppointmentReducer from '../../Doctor/src/Redux/Reducers/DoctorAppointmentSlice';
import DoctorHistoryReducer from '../../Doctor/src/Redux/Reducers/DoctorHistorySlice';
import DoctorDetailsReducer from '../../Doctor/src/Redux/Reducers/DoctorDetailsSlice';
import UpdateUserProfileReducer from './Reducers/UpdateUserProfileSlice';
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
    DoctorSignUpReducer: DoctorSignUpReducer,
    AddAppointmentBySecretaryReducer: AddAppointmentBySecretaryReducer,
    PersonalDetailsReducer: PersonalDetailsReducer,
    GetSpecialitiesReducer: GetSpecialitiesReducer,
    PaymentCardReducer: PaymentCardReducer,
    AppointmentDetailsReducer: AppointmentDetailsReducer,
    AddCardReducer: AddCardReducer,
    PrescriptionReducer: PrescriptionReducer,
    DoctorAppointmentReducer: DoctorAppointmentReducer,
    DoctorHistoryReducer: DoctorHistoryReducer,
    DoctorDetailsReducer: DoctorDetailsReducer,
    UpdateUserProfileReducer: UpdateUserProfileReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
