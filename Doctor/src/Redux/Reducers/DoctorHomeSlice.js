import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import Axios from '../../../../src/utils/axios';

const initialState = {
  appointmentForToday: [],
  isLoading: null,
  success: null,
  error: null,
};

export const getDoctorAppointmentToday = createAsyncThunk(
  'doctorHome/getDoctorAppointmentToday',
  async (args, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      let response = await Axios({
        method: 'GET',
        url: '/doctor/appointments.php',
        params: args,
      });
      return response.data;
    } catch (error) {
      Alert.alert('Error', error);
      return rejectWithValue(error.message);
    }
  },
);

const DoctorHomeSlice = createSlice({
  name: 'doctorHome',
  initialState,
  extraReducers: builder => {
    builder.addCase(getDoctorAppointmentToday.pending, (state, action) => {
      state.isLoading = true;
      //console.log('getDoctorAppointmentToday pending = ' + action.payload);
    }),
      builder.addCase(getDoctorAppointmentToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointmentForToday = action.payload;
        //console.log('getDoctorAppointmentToday fulfilled = ' +JSON.stringify(action.payload),);
      }),
      builder.addCase(getDoctorAppointmentToday.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default DoctorHomeSlice.reducer;
