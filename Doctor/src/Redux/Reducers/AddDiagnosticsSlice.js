import {Alert} from 'react-native';
import Axios from '../../../../src/utils/axios';
const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  isLoading: null,
  success: null,
  error: null,
};

export const AddDiagonisticsAction = createAsyncThunk(
  'AddDiagonistics/AddDiagonisticsAction',
  async (data, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      let response = await Axios({
        method: 'POST',
        url: '/doctor/insert_diagnostics.php',
        data: data,
      });
      return response.data;
    } catch (error) {
      Alert.alert('Error');
      return rejectWithValue(error.message);
    }
  },
);

const EditDoctorDetailsSlice = createSlice({
  name: 'AddDiagonistics',
  initialState,
  extraReducers: builder => {
    builder.addCase(AddDiagonisticsAction.pending, (state, action) => {
      state.isLoading = true;
      console.log('Pending');
    }),
      builder.addCase(AddDiagonisticsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        console.log('fulfilled');
      }),
      builder.addCase(AddDiagonisticsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        console.log('rejected');
      });
  },
});

export default EditDoctorDetailsSlice.reducer;
