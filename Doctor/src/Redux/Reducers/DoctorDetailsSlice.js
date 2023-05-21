import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from '../../../../src/utils/axios';

const initialState = {
  name: '',
  email: '',
  age: 0,
  gender: '',
  phone: '',
  image: '',
  doctor_about: '',
  doctor_experience: 0,
  speciality_name: '',
  clinic_logo: '',
  clinic_name: '',
  branch_address: '',
  branch_phone: '',
  branch_working_days: [],
  booking_price: null,
  start_time: null,
  end_time: null,
  session_time: null,
  isLoading: true,
  success: false,
  error: null,
};

export const getDoctorDetails = createAsyncThunk(
  'doctorDetails/getDoctorDetails',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await Axios({
        method: 'get',
        url: '/general/profile.php',
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const doctorDetailsSlice = createSlice({
  name: 'doctorDetails',
  initialState,
  extraReducers: builder => {
    builder.addCase(getDoctorDetails.pending, (state, action) => {
      state.isLoading = true;
      console.log('state in pending ', state);
      console.log('action.payload in pending ', action.payload);
    }),
      builder.addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.name = action.payload.user_first_name;
        state.email = action.payload.user_email;
        state.age = action.payload.user_age;
        state.phone = action.payload.user_phone;
        state.gender = action.payload.user_gender;
        state.image = action.payload.user_image;
        state.doctor_about = action.payload.doctor.doctor_about;
        state.doctor_experience = action.payload.doctor.doctor_experience;
        state.speciality_name = action.payload.doctor.speciality_name;
        state.clinic_name = action.payload.clinic.clinic_name;
        state.clinic_logo = action.payload.clinic.clinic_logo;
        state.branch_address = action.payload.clinic.branch_address;
        state.branch_phone = action.payload.clinic.branch_phone;
        state.branch_working_days = action.payload.clinic.branch_working_days;
        state.booking_price = action.payload.clinic.booking_price;
        state.start_time = action.payload.clinic.start_time;
        state.end_time = action.payload.clinic.end_time;
        state.session_time = action.payload.clinic.session_time;
        /*
        "doctor": {
        "doctor_id": "23",
        "specialty_id": "2",
        "doctor_about": "Test",
        "doctor_experience": "2",
        "speciality_name": "أسنان"
    },
    "clinic": {
        "clinic_id": "21",
        "clinic_name": null,
        "clinic_logo": null,
        "branch_id": "16",
        "branch_location": "تم تحديد الموقع بنجاح",
        "branch_address": "Test",
        "branch_is_default": "1",
        "branch_phone": "07878787878",
        "branch_working_days": "[{\"day\":\"friday\",\"enabled\":true}]",
        "latitude": "31",
        "longitude": "31",
        "booking_price": "120",
        "start_time": "18:36:00",
        "end_time": "20:36:00",
        "session_time": "20:00:00"
    }
        */
        console.log('state : ', state);
        console.log('action.payload in fulfilled : ', action.payload);
      }),
      builder.addCase(getDoctorDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log('Error ', state.error);
      });
  },
});

export default doctorDetailsSlice.reducer;
