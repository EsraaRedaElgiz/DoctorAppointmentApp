import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setLoggedIn } from "../../Redux/Reducers/AuthSlice"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_TOKEN,USER_DATA } from '../../constants/Constants';
import axios from 'axios';

/*const userToken = AsyncStorage.getItem('userToken')
  ? AsyncStorage.getItem('userToken')
  : null*/
const initState = {
  userInfo: null,
  //userToken,
  isLoading: false,
  error: null,
};
export const loginUser = createAsyncThunk(
  "Login/loginUser ",
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      const response = await axios.post('https://doctor-graduation-project.000webhostapp.com/api/general/login.php', args)
      console.log(JSON.stringify(response))
      AsyncStorage.getItem(USER_TOKEN).then(res => {
        if (res === 'USER_TOKEN') {
          AsyncStorage.setItem(USER_TOKEN, JSON.stringify(response.user_token))
          AsyncStorage.setItem(USER_DATA,JSON.stringify(response))
         
        } 
      })
      dispatch(setLoggedIn())
      //
    } catch (error) {
      console.log(rejectWithValue(error.message))
      return rejectWithValue(error.message);
    }

  })
const LoginSlice = createSlice({
  name: 'Login',
  initialState: initState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo=action.payload;
        //state.userToken=action.payload.userToken;
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }

});
export default LoginSlice.reducer;
export const { } = LoginSlice.actions;
