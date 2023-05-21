import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from '../../../../src/utils/axios';

let initialState = {
  history: [],
  isLoading: null,
  success: null,
  error: null,
};

export const getDoctorHistory = createAsyncThunk(
  'doctorHistory/getDoctorHistory',
  async (data, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      let response = await Axios({
        method: 'GET',
        url: '/doctor/appointments.php', // /doctor/appointments.php?filter=history&status=2&date=2023-03-18
        params: data, // the same key and values in backend
      });
      // console.log('response.data =>' + JSON.stringify(response));
      return response.data; // return  empty array !!!
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const DoctorHistory = createSlice({
  name: 'doctorHistory',
  initialState,
  extraReducers: builder => {
    builder.addCase(getDoctorHistory.pending, (state, action) => {
      state.isLoading = true;
      console.log('Pending');
    }),
      builder.addCase(getDoctorHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.history = action.payload;
        console.log('fulfilled');
      }),
      builder.addCase(getDoctorHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        console.log('rejected');
      });
  },
});

export default DoctorHistory.reducer;
