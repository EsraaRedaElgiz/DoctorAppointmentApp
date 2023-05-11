import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Axios from '../../../../src/utils/axios';

const initState = {
  isLoading: false,
  error: null,
  appointmentDetails: {},
};
export const getAppointmentDetails = createAsyncThunk(
  'appointmentDetails/getAppointmentDetails ',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      let response = '';
      await Axios({
        method: 'GET',
        url: `/general/appointment_details.php?appointment_id=${args}`,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.appointment_date) {
              response = res.data;
              dispatch(setAppointmentDetails(res.data));
            } else {
              console.log(res.data);
            }
          } else {
            alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          console.log(err);
        });
      return response;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      return rejectWithValue(error.message);
    }
  },
);
const AppointmentDetailsSlice = createSlice({
  name: 'appointmentDetails',
  initialState: initState,
  reducers: {
    setAppointmentDetails: (state, action) => {
      state.appointmentDetails = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAppointmentDetails.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(getAppointmentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(getAppointmentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default AppointmentDetailsSlice.reducer;
export const {setAppointmentDetails} = AppointmentDetailsSlice.actions;
