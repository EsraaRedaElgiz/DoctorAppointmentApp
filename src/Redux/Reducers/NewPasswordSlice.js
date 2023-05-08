import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Axios from '../../utils/axios';
import {Alert} from 'react-native';
const initState = {
  isLoading: false,
  error: null,
};
export const changePassword = createAsyncThunk(
  'newPassword/changePassword ',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      let response = '';
      await Axios({
        method: 'POST',
        url: '/general/change_password.php',
        data: args,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.success) {
              response = res.data.success;
            } else {
              console.log(res.data);
              Alert.alert("خطأ فى كلمه المرور القديمه \n حاول مره اخرى");
            }
          } else {
            Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          console.log(err);
          Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');// right
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
      console.log('pending');
    }),
      builder.addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('sucess');
      }),
      builder.addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log('failed');
      });
  },
});
export default newPasswordSlice.reducer;
export const {} = newPasswordSlice.actions;
