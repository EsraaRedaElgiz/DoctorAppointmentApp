import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN, USER_DATA} from '../../constants/Constants';
import axios from 'axios';
import Axios from '../../../../src/utils/axios';
import {getDoctorAppointments} from './DoctorAppointmentSlice';
import { Alert } from 'react-native';

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
              //console.log(res.data);
              Alert.alert(" يجب ادخال رقم هاتف لحساب موجود بالفعل واختيار تاريخ يوم بدءا من الغد" )
            }
          } else {
            Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          if(err.message=="Network Error"){
            Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');// right //لو مفيش نت هيدخل هنا
          }else{
            Alert.alert(JSON.stringify(err.message))
          }
        });
      return response;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
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
