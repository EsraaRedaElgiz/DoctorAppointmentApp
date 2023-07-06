import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from '../../utils/axios';
const initialState = {
  diagnosis: '',
  diagnosisTreatment: [],
  isLoading: null,
  error: null,
  success: null,
};

export const getPrescription = createAsyncThunk(
  'prescription/getPrescription',
  async (args, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await Axios({
        method: 'GET',
        url: '/general/appointment_details.php',
        params: args,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue.message;
    }
  },
);

const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPrescription.pending, (state, action) => {
      state.isLoading = true;
      console.log('getPrescription pending');
    });
    builder.addCase(getPrescription.fulfilled, (state, action) => {
      console.log('getPrescription fulfilled');
      console.log('fulfilled -id- ', action.payload);
      // console.log('fulfilled -id- ', action.payload.diagnosis.diagnosis);
      state.isLoading = false;
      state.success = true;
      state.diagnosis = action.payload.diagnosis.diagnosis;
      state.diagnosisTreatment = action.payload.diagnosis.diagnosis_treatment;
    });
    builder.addCase(getPrescription.rejected, (state, action) => {
      console.log('getPrescription rejected');
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default prescriptionSlice.reducer;
