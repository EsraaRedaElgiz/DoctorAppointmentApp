import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN, USER_DATA} from '../../constants/Constants';
import axios from 'axios';
import Axios from '../../../../src/utils/axios';
import {getDoctorAppointments} from './DoctorAppointmentSlice';

const initState = {
  isLoading: false,
  error: null,
  successAdd: false,
};
export const AddAppointmentBySec = createAsyncThunk(
  'AddAppointment/AddAppointmentBySec ',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      let response = '';
      await Axios({
        method: 'POST',
        url: '/doctor/book_appointment.php',
        data: args,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status == true) {
              response = res.data.status;
              dispatch(getDoctorAppointments());
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
const AddAppointmentBySecretarySlice = createSlice({
  name: 'AddAppointment',
  initialState: initState,
  reducers: {
    setSuccessAdd: (state, action) => {
      state.successAdd = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(AddAppointmentBySec.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(AddAppointmentBySec.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(AddAppointmentBySec.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default AddAppointmentBySecretarySlice.reducer;
export const {setSuccessAdd} = AddAppointmentBySecretarySlice.actions;
