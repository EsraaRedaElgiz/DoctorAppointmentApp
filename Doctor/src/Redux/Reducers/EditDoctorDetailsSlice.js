import {Alert} from 'react-native';
import Axios from '../../../../src/utils/axios';
const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

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
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log("error",error)
      Alert.alert('Error', JSON.stringify(error.response.data));
      return rejectWithValue(error);
    }
  },
);

const EditDoctorDetailsSlice = createSlice({
  name: 'EditDoctorDetailsSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(EditDoctorDetailAction.pending, (state, action) => {
      state.isLoading = true;
      console.log('Pending');
    }),
      builder.addCase(EditDoctorDetailAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        console.log('fulfilled');
      }),
      builder.addCase(EditDoctorDetailAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        console.log('rejected');
      });
  },
});

export default EditDoctorDetailsSlice.reducer;
