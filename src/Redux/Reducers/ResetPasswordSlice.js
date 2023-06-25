import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import Axios from '../../utils/axios';
const initState = {
  password: '',
  confirmPassword: '',
  isLoading: false,
  error:null
};
export const newPassword = createAsyncThunk(
  'resetPassword/newPassword ',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      let response = '';
      await Axios({
        method: 'POST',
        url: '/general/update_password.php',
        data: args,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.success) {
              response = true;
            }else if(res.data.errors[0].new_password=="Password is the same as old password, please enter another one"){
              Alert.alert("من فضلك قم بإدخال كلمة مرور أخري");
            }else{
              Alert.alert(JSON.stringify(res.data));
            }
          } else {
            Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          //console.log(err.message);
          if(err.message=="Network Error"){
            Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');// right //لو مفيش نت هيدخل هنا
          }else{
            Alert.alert(JSON.stringify(err.response.data))
          }
        });
      return response;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
      return rejectWithValue(error.message);
    }
  },
);
const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: initState,
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(newPassword.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      //console.log('pending');
    }),
      builder.addCase(newPassword.fulfilled, (state, action) => {
        state.isLoading = false;
       // console.log('sucess');
      }),
      builder.addCase(newPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        //console.log('failed');
      });
  },
});
export default resetPasswordSlice.reducer;
export const {setPassword, setConfirmPassword} = resetPasswordSlice.actions;
