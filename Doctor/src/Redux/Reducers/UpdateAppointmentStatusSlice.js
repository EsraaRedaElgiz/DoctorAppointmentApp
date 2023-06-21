import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import Axios from '../../../../src/utils/axios';
const initState = {
  isLoading: false,
  error: null,
};
export const changeStatus = createAsyncThunk(
  'updateAppointment/changeStatus ',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      let response = '';
      await Axios({
        method: 'POST',
        url: '/doctor/update_appointment_status.php',
        data: args,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.success) {
              response = true;
            } else{
              Alert.alert(JSON.stringify(res.data));
            }
          } else {
            Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          if(err.message=="Network Error"){
            Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');// right //لو مفيش نت هيدخل هنا
          }else if(err.message=="Request failed with status code 500"){
            Alert.alert('يجب التحديث بقيمه مختلفه عن القيمة السابقة أو لا يحق لهذا الطبيب تحديث حالة هذا الموعد ')

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
const updateAppointmentSlice = createSlice({
  name: 'updateAppointment',
  initialState: initState,
  extraReducers: builder => {
    builder.addCase(changeStatus.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      //console.log('pending');
    }),
      builder.addCase(changeStatus.fulfilled, (state, action) => {
        state.isLoading = false;
       // console.log('sucess');
      }),
      builder.addCase(changeStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        //console.log('failed');
      });
  },
});
export default updateAppointmentSlice.reducer;
export const {} = updateAppointmentSlice.actions;
