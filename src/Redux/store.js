import SignUpReducer from './Reducers/SignUpSlice';
import ResetPasswordReducer from './Reducers/ResetPasswordSlice';
import NewPasswordReducer from './Reducers/NewPasswordSlice';
import VertificationCodeReducer from './Reducers/VertificationCodeSlice';
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
import HistoryPublicOrPrivateReducer from './Reducers/HistoryPublicOrPrivateSlice';
import UpdateUserProfileReducer from './Reducers/UpdateUserProfileSlice';
import TopDoctorReducer from './Reducers/TopDoctorSlice';
import BookAppointmentReducer from './Reducers/BookAppointmentSlice';
import RateDoctorReducer from './Reducers/RateDoctorSlice';
import GetRateReducer from './Reducers/GetRateSlice';
import UpdateAppointmentStatusReducer from '../../Doctor/src/Redux/Reducers/UpdateAppointmentStatusSlice';
import SendEmailReducer from './Reducers/SendEmailSlice';
import PatientHistoryReducer from '../../Doctor/src/Redux/Reducers/PatientHistorySlice';
import SpecialitySearchReducer from './Reducers/SpecialitySearchSlice';
import DoctorHomeReducer from '../../Doctor/src/Redux/Reducers/DoctorHomeSlice';
import EditDoctorDetailsReducer from '../../Doctor/src/Redux/Reducers/EditDoctorDetailsSlice';
import AddDiagnosticsReducer from '../../Doctor/src/Redux/Reducers/AddDiagnosticsSlice';
const store = configureStore({
  reducer: {
    SignUpReducer: SignUpReducer,
    ResetPasswordReducer: ResetPasswordReducer,
    NewPasswordReducer: NewPasswordReducer,
    VertificationCodeReducer: VertificationCodeReducer,
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
    HistoryPublicOrPrivateReducer: HistoryPublicOrPrivateReducer,
    UpdateUserProfileReducer: UpdateUserProfileReducer,
    TopDoctorReducer: TopDoctorReducer,
    BookAppointmentReducer: BookAppointmentReducer,
    RateDoctorReducer: RateDoctorReducer,
    GetRateReducer: GetRateReducer,
    UpdateAppointmentStatusReducer: UpdateAppointmentStatusReducer,
    SendEmailReducer: SendEmailReducer,
    PatientHistoryReducer: PatientHistoryReducer,
    SpecialitySearchReducer: SpecialitySearchReducer,
    DoctorHomeReducer: DoctorHomeReducer,
    EditDoctorDetailsReducer: EditDoctorDetailsReducer,
    AddDiagnosticsReducer: AddDiagnosticsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
