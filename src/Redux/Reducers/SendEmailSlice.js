import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import Axios from '../../utils/axios';
const initState = {
  emailToSendVerificationCode: '',
  isLoading: false,
  error: null,
  userId: '',
  otp: ''
};
export const sendEmail = createAsyncThunk(
  'ForgetPassword/sendEmail',
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      let response=""
      await Axios({
        method: 'POST',
        url: '/general/sendOTP.php',
        data: args,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.OTP && res.data.user_id) {
              dispatch(setUserId(res.data.user_id))
              dispatch(setOtp(res.data.OTP))
              console.log(res.data)
              response=true
            }else {
              Alert.alert(JSON.stringify(res.data))
            }
          } else {
            Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          if (err.message == "Network Error") {
            Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');// right //لو مفيش نت هيدخل هنا
          }else if(err.response.data.errors[0].email=="This email not found, please send the correct email"){
            Alert.alert("من فضلك ادخل عنوان بريد إلكتروني موجود بالفعل")
          } else{
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
const SendEmailSlice = createSlice({
  name: 'ForgetPassword',
  initialState: initState,
  reducers: {
    setEmailToSendVerificationCode: (state, action) => {
      state.emailToSendVerificationCode = action.payload;
    }, setUserId: (state, action) => {
      state.userId = action.payload
    }, setOtp: (state, action) => {
      state.otp = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(sendEmail.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(sendEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.userToken=action.payload.userToken;
      }),
      builder.addCase(sendEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});
export default SendEmailSlice.reducer;
export const { setEmailToSendVerificationCode, setUserId, setOtp } = SendEmailSlice.actions;
