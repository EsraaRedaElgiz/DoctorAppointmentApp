import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN} from '../../constants/Constants';

const initState = {
  appointmentes: [],
  isLoading: false,
  error: null,
};
export const getAppointmentes = createAsyncThunk(
  'appointments/getAppointmentes',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      await Axios({
        method: 'GET',
        url: '/patient/appointments.php',
        //params:{}
      })
        .then(res => {
          if (res.status == 200) {
            if (Array.isArray(res.data)) {
              console.log('arr', res.data);
              dispatch(setAppointmentsArr(res.data));
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
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

const AppointmentSlice = createSlice({
  name: 'appointments',
  initialState: initState,
  reducers: {
    setAppointmentsArr: (state, action) => {
      state.appointmentes = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAppointmentes.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        console.log('pending');
      })
      .addCase(getAppointmentes.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('success');
      })
      .addCase(getAppointmentes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log('failed');
      });
  },
});
export default AppointmentSlice.reducer;
export const {setAppointmentsArr} = AppointmentSlice.actions;
