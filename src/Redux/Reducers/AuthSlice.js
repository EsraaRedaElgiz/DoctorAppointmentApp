import {createSlice} from '@reduxjs/toolkit';
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
    },
    setIsDoctor: (state, action) => {
      state.isDoctor = !state.isDoctor;
    },
  },
});
export default AuthSlice.reducer;
export const {setLoggedIn, setLoggedOut, setIsDoctor} = AuthSlice.actions;
