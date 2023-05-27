import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoggedIn, setLoggedOut } from '../../Redux/Reducers/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_TOKEN, USER_DATA } from '../../constants/Constants';
import axios from 'axios';
import Axios from '../../utils/axios';
import { Alert } from 'react-native';

const initState = {
  userInfo: null,
  //userToken,
  isLoading: false,
  error: null,
};
export const loginUser = createAsyncThunk(
  'Login/loginUser ',
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      await Axios({
        method: 'POST',
        url: '/general/login.php',
        data: args,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.user_token) {
              AsyncStorage.setItem(
                USER_TOKEN,
                JSON.stringify(res.data.user_token),
              );
              AsyncStorage.setItem(USER_DATA, JSON.stringify(res.data));
              dispatch(setUserInfo(res.data));
              dispatch(setLoggedIn());
            } else if (res.data.errors[0].email == "Incorrect email or password" && res.data.errors[1].password == "Incorrect email or password") {
              //console.log(res.data);
              Alert.alert("يوجد خطأ في البريد الالكتروني او كلمة المرور")
            } else {
              Alert.alert(JSON.stringify(res.data))
            }
          } else {
            Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          if(err.message=="Network Error"){
            Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');// right //لو مفيش نت هيدخل هنا
          }else{
            Alert.alert(JSON.stringify(err.message))

          }        });
    } catch (error) {
      //console.log(rejectWithValue(error.message));
      Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
      return rejectWithValue(error.message);
    }
  },
);
const LoginSlice = createSlice({
  name: 'Login',
  initialState: initState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.userToken=action.payload.userToken;
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
      builder.addCase(setLoggedOut, (state, action) => {
        state.userInfo = null;
      });
  },
});
export default LoginSlice.reducer;
export const { setUserInfo } = LoginSlice.actions;
