import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Axios from '../../utils/axios';
import { setLoggedOut } from '../../Redux/Reducers/AuthSlice';
import { Alert } from 'react-native';

const initState = {
  name: '',
  phoneNum: '',
  email: '',
  password: '',
  isLoading: false,
  error: null,
  success: false,
};
//backed
export const registerUser = createAsyncThunk(
  'SignUp/registerUser ',
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      let response = '';
      await Axios({
        method: 'POST',
        url: '/patient/user_signup.php',
        data: args,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          console.log(res.data);
          if (res.status == 200) {
            if (res.data === 'Success add patient data') {
              response = res.data;
            } else if (res.data.errors.email == "Email or Phone are exist") {
              Alert.alert("عنوان البريد الالكتروني او رقم الهاتف موجود بالفعل")
            } else {
              //console.log(res.data);
              Alert.alert(JSON.stringify(res.data))
            }
          } else {
            Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
            //console.log(res.data);
          }
        })
        .catch(err => {
          if (err.message == "Network Error") {
            Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');// right //لو مفيش نت هيدخل هنا
          } else {
            Alert.alert(JSON.stringify(err.message))

          }
        });
      return response;
    } catch (error) {
      //console.log(error.message)
      Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
      return rejectWithValue(error.message);
    }
  },
);
const signUpSlice = createSlice({
  name: 'SignUp',
  initialState: initState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhoneNum: (state, action) => {
      state.phoneNum = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        //action.payload==="Success add patient data"?state.success=true:null
        //console.log(action.payload)
      }),
      builder.addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(setLoggedOut, (state, action) => {
      state.success = false;
    });
  },
});
export default signUpSlice.reducer;
export const { setName, setPhoneNum, setEmail, setPassword, setSuccess } =
  signUpSlice.actions;
