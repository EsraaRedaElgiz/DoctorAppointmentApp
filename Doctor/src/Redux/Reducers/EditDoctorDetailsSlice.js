import {Alert} from 'react-native';
import Axios from '../../../../src/utils/axios';
const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  isLoading: null,
  success: null,
  error: null,
};

export const EditDoctorDetailAction = createAsyncThunk(
  'EditDoctorDetailsSlice/EditDoctorDetailAction',
  async (data, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      let response = await Axios({
        method: 'POST',
        url: '/doctor/update_profile.php',
        params: data,
      });
      return response.data;
    } catch (error) {
      Alert.alert('Error');
      return rejectWithValue(error.message);
    }
  },
);

const EditDoctorDetailsSlice = createSlice({
  name: 'EditDoctorDetailsSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(getDoctorHistory.pending, (state, action) => {
      state.isLoading = true;
      console.log('Pending');
    }),
      builder.addCase(getDoctorHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        console.log('fulfilled');
      }),
      builder.addCase(getDoctorHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        console.log('rejected');
      });
  },
});

export default EditDoctorDetailsSlice.reducer;
