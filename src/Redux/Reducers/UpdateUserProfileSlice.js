import {getPersonalDetails} from './PersonalDetailsSlice';

import Axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: null,
  success: null,
  error: null,
};
export const updateUserProfileAction = createAsyncThunk(
  'updateUserProfile/updateUserProfileAction',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;

    console.log(args)
    try {
      const response = await Axios({
        method: 'POST',
        url: '/patient/update_profile.php',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: args,
      });

      console.log(response.data)
      return response;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error);
    }
  },
);

const updateUserProfileSlice = createSlice({
  name: 'updateUserProfile',
  initialState,
  extraReducers: builder => {
    builder.addCase(updateUserProfileAction.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      }),
      builder.addCase(updateUserProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default updateUserProfileSlice.reducer;
