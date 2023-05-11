import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from '../../../../src/utils/axios';

let initialState = {
  appointment_date: '',
  appointment_time: '',
  user_first_name: '',
  user_last_name: '',
  user_image: '',
  appointment_status: 0,
  appointments: [],
  isLoading: null,
  success: null,
  error: null,
};

export const getDoctorAppointments = createAsyncThunk(
  'doctorAppointments/getDoctorAppointments',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      let response = await Axios({
        method: 'GET',
        url: '/doctor/appointments.php', // /doctor/appointments.php?filter=history&status=2&date=2023-03-18
      });
      // console.log('response.data =>' + JSON.stringify(response));
      return response.data; // return  empty array !!!
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const DoctorAppointments = createSlice({
  name: 'doctorAppointments',
  initialState,
  extraReducers: builder => {
    builder.addCase(getDoctorAppointments.pending, (state, action) => {
      state.isLoading = true;
      console.log('Pending');
    }),
      builder.addCase(getDoctorAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        // state.appointment_date = action.payload.appointment_date;
        // state.appointment_time = action.payload.appointment_time;
        // state.user_first_name = action.payload.user_first_name;
        // state.user_last_name = action.payload.user_last_name;
        // state.user_image = action.payload.user_image;
        // state.appointment_status = action.payload.appointment_status;
        state.appointments = action.payload;
        console.log('fulfilled');
      }),
      builder.addCase(getDoctorAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        console.log('rejected');
      });
  },
});

export default DoctorAppointments.reducer;
