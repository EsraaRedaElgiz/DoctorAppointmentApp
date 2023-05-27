import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN} from '../../constants/Constants';

const initState = {
  appointments: [],
  isLoading: false,
  error: null,
};
export const getAppointments = createAsyncThunk(
  'appointments/getAppointments',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      await Axios({
        method: 'GET',
        url: '/patient/appointments.php?filter=upcoming',
        //params:{}
      })
        .then(res => {
          if (res.status == 200) {
            if (Array.isArray(res.data)) {
              //console.log('arr', res.data);
              dispatch(setAppointmentsArr(res.data));
            } else {
              console.log(res.data);
              dispatch(setError(JSON.stringify(res.data)))
            }
          } else {
            alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
            dispatch(setError("حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا"))
          }
        })
        .catch(err => {
          console.log(err);
          dispatch(setError(JSON.stringify(err)))
        });
    } catch (error) {
      console.log(error.message);
      dispatch(setError(JSON.stringify(error)))
      return rejectWithValue(error.message);
    }
  },
);

const AppointmentSlice = createSlice({
  name: 'appointments',
  initialState: initState,
  reducers: {
    setAppointmentsArr: (state, action) => {
      state.appointments = action.payload;
    },setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAppointments.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        //console.log('pending');
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        //console.log('success');
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        //console.log('failed');
      });
  },
});
export default AppointmentSlice.reducer;
export const {setAppointmentsArr,setError} = AppointmentSlice.actions;
