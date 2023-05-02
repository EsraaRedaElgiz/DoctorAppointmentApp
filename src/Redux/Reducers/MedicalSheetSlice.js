import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const initState = {
  isLoading: false,
  error: null,
};
export const completeRegisterUser = createAsyncThunk(
  'MedicalSheet/completeRegisterUser ',
  async (args, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await axios.post('link', args);
      console.log(JSON.stringify(response));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const medicalSheetSlice = createSlice({
  name: 'MedicalSheet',
  initialState: initState,
  extraReducers: builder => {
    builder.addCase(completeRegisterUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(completeRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(completeRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default medicalSheetSlice.reducer;
export const {} = medicalSheetSlice.actions;
