import {createSlice} from '@reduxjs/toolkit';
const initState = {
  introSliderDone: false,
};
const IntroSlider = createSlice({
  name: 'IntroSlider',
  initialState: initState,
  reducers: {
    setIntroSlider: (state, action) => {
      state.introSliderDone = action.payload;
    },
  },
});
export default IntroSlider.reducer;
export const {setIntroSlider} = IntroSlider.actions;
