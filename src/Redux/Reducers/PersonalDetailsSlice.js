import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Axios from '../../utils/axios';

const initialState = {
  name: '',
  bloodType: '',
  weight: 0,
  height: 0,
  age: 0,
  gender: '',
  phone: '',
  isLoading: true,
  success: false,
  error: null,
};

export const getPersonalDetails = createAsyncThunk(
  'personalDetails/getPersonalDetails',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      // await axios
      //   .get('/general/profile.php')
      //   .then(res => {
      //     console.log(res.data);
      //     return res.data;
      //   })
      //   .catch(error => {
      //     console.log('Error : ', error);
      //   });
      const response = await Axios({
        method: 'get',
        url: '/general/profile.php',
      });
      return response.data;
      // .catch(error => console.log('Catch error'));
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
        state.isLoading = false;
        state.success = true;
        (state.name =
          action.payload.user_first_name + ' ' + action.payload.user_last_name),
          (state.bloodType = action.payload.patient.patient_blood_type),
          (state.weight = action.payload.patient.patient_weight),
          (state.height = action.payload.patient.patient_height),
          (state.age = action.payload.user_age),
          (state.phone = action.payload.user_phone),
          (state.gender = action.payload.user_gender);
        // console.log('state in fulfilled ', state);
        console.log('state : ', state);
        console.log('action.payload in fulfilled : ', action.payload);
      }),
      builder.addCase(getPersonalDetails.rejected, (state, action) => {
        state.isLoading = true;
        state.success = false;
        state.error = action.payload;
        console.log('Error ', state.error);
      });
  },
});

export default personalDetailsSlice.reducer;
