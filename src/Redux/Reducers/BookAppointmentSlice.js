const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  date: '',
  time: '',
};

const BookAppointmentSlice = createSlice({
  name: 'BookAppointment',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload.date;
      console.log('DATE => ' + state.date);
    },
    setTime: (state, action) => {
      state.time = action.payload.time;
    },
  },
});

export default BookAppointmentSlice.reducer;
export const {setDate, setTime} = BookAppointmentSlice.actions;
