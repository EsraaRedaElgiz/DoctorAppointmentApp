import {createSlice} from '@reduxjs/toolkit';
const initState = {
  code: '',
};
const vertificationCodeSlice = createSlice({
  name: 'VertificationCode',
  initialState: initState,
  reducers: {
    setVertificationCode: (state, action) => {
      state.code = action.payload;
    },
  },
});
export default vertificationCodeSlice.reducer;
export const {setVertificationCode} = vertificationCodeSlice.actions;
