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
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await Axios({
        method: 'GET',
        url: '/general/appointment_details.php?appointment_id=2',
      });
      return response.da;
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
    });
    builder.addCase(getPrescription.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.diagnosis = action.payload.diagnosis;
      state.diagnosisTreatment = action.payload.diagnosis_treatment;
    });
    builder.addCase(getPrescription.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default prescriptionSlice.reducer;
