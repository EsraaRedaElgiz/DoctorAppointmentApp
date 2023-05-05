import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Axios from '../../utils/axios';

const initState = {
  isLoading: false,
  error: null,
};
export const changePassword = createAsyncThunk(
  'newPassword/changePassword ',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      let response=""
      await Axios({
        method: 'POST',
        url: '/general/change_password.php',
        data: args,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.success) {
             response=res.data.success;
            } else {
              console.log(res.data);
            }
          } else {
            alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          console.log(err);
        });
        return response;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      return rejectWithValue(error.message);
    }
  },
);
const newPasswordSlice = createSlice({
  name: 'newPassword',
  initialState: initState,
  extraReducers: builder => {
    builder.addCase(changePassword.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});
export default newPasswordSlice.reducer;
export const { } =
  newPasswordSlice.actions;
