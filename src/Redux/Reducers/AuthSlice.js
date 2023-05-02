import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import { USER_TOKEN,USER_DATA } from '../../constants/Constants';
const initState = {
  isLoggedIn: false,
  isDoctor: false,
};
const AuthSlice = createSlice({
  name: 'Auth',
  initialState: initState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state, action) => {
      state.isLoggedIn = false;
      AsyncStorage.removeItem(USER_TOKEN);
      AsyncStorage.removeItem(USER_DATA);
    },
    setIsDoctor: (state, action) => {
      state.isDoctor = action.payload;
    },
  },
});
export default AuthSlice.reducer;
export const {setLoggedIn, setLoggedOut, setIsDoctor} = AuthSlice.actions;
