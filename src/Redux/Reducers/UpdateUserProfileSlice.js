const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');
const {default: Axios} = require('../../utils/axios');

const initialState = {
  isLoading: null,
  success: null,
  error: null,
};
export const updateUserProfileAction = createAsyncThunk(
  'updateUserProfile/updateUserProfileAction',
  async (data, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await Axios({
        method: 'POST',
        url: '/patient/update_profile.php',
        data: data,
      });
      return response;
    } catch (error) {
      rejectWithValue(error.message);
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

export default updateUserProfileSlice;
