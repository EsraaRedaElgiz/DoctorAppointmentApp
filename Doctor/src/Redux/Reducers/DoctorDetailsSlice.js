import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from '../../../../src/utils/axios';

const initialState = {
  name: '',
  email: '',
  age: 0,
  gender: '',
  phone: '',
  image: '',
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
        (state.name =
          action.payload.user_first_name + ' ' + action.payload.user_last_name),
          (state.email = action.payload.user_email),
          (state.age = action.payload.user_age),
          (state.phone = action.payload.user_phone),
          (state.gender = action.payload.user_gender);
        state.image = action.payload.user_image;
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
