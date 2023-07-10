import {Alert} from 'react-native';
import Axios from '../../../../src/utils/axios';
import {err} from 'react-native-svg/lib/typescript/xml';
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
      console.log('dataaaaaaaaaaaaaaaaaaa-> ', data);
      let response = await Axios({
        method: 'POST',
        url: '/doctor/insert_diagnostics.php',
        data: data,
      });
      console.log('res-> ', response.data);
      return response.data;
    } catch (error) {
      Alert.alert('Error' + JSON.stringify(error.response.data));
      console.log(error.response.data);
      return rejectWithValue(error.message);
    }
  },
);

const AddDiagnosticsSlice = createSlice({
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

export default AddDiagnosticsSlice.reducer;
