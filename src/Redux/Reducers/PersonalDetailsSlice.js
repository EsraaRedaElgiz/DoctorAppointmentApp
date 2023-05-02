import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  bloodType: '',
  weight: 0,
  height: 0,
  age: 0,
  gender: '',
  phone: '',
  isLoading: false,
  error: null,
  success: null,
};

export const getPersonalDetails = createAsyncThunk(
  'personalDetails/getPersonalDetails',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      await axios
        .get('/general/profile.php')
        .then(res => {
          console.log(res.data);
          return res.data;
        })
        .catch(error => {
          console.log('Error : ', error);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const personalDetailsSlice = createSlice({
  name: 'personalDetails',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPersonalDetails.pending, (state, action) => {
      state.isLoading = true;
      console.log('state in pending ', state);
      console.log('action.payload in pending ', action.payload);
    }),
      builder.addCase(getPersonalDetails.fulfilled, (state, action) => {
        (state.bloodType = action.payload.patient_blood_type),
          (state.weight = action.payload.patient_weight),
          (state.height = action.payload.patient_height),
          (state.age = action.payload.user_age),
          (state.gender = action.payload.user_gender);
        console.log('state in fulfilled ', state);
      }),
      builder.addCase(getPersonalDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        console.log('state in rejected ', state);
      });
  },
});

export default personalDetailsSlice.reducer;
