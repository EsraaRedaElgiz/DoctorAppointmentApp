import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_HISTORY_STATUS} from '../../constants/Constants';
import axios from 'axios';
import Axios from '../../utils/axios';
import { ToastAndroid } from 'react-native';

const initState = {
  isLoad: false,
  error: null,
};
export const historyStatus = createAsyncThunk(
  'HistoryPublicOrPrivate/historyStatus ',
  async (args, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      let response=""
      await Axios({
        method: 'POST',
        url: '/patient/update_private_history.php',
        data: args,
      })
        .then(res => {
          console.log(res?.data);
          if (res.status == 200) {
            if (res.data.success) {
              AsyncStorage.setItem(
                USER_HISTORY_STATUS,
                JSON.stringify(args.private),
              );
              response=res.data.success
            } else {
              console.log(res.data);
              ToastAndroid.show(
                "حدث خطأ يرجي اعاده المحاوله مره أخري",
                ToastAndroid.SHORT,
              );   
            }
          } else {
            alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          console.log(err?.response?.data);
          if(err.message=="Request failed with status code 500"){
            ToastAndroid.show(
              "حدث خطأ يرجي اعاده المحاوله مره أخري",
              ToastAndroid.SHORT,
            );
          }else if(err.message=="Network Error"){
            ToastAndroid.show(
              "حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا",
              ToastAndroid.SHORT,
            );
          }else{
            ToastAndroid.show(
              err.message,
              ToastAndroid.SHORT,
            );
          }
         });
        return response;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      ToastAndroid.show(
        "حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا",
        ToastAndroid.SHORT,
      );   
      return rejectWithValue(error.message);
    }
  },
);
const HistoryPublicOrPrivateSlice = createSlice({
  name: 'HistoryPublicOrPrivate',
  initialState: initState,
  extraReducers: builder => {
    builder.addCase(historyStatus.pending, (state, action) => {
      state.isLoad = true;
      state.error = null;
    }),
      builder.addCase(historyStatus.fulfilled, (state, action) => {
        state.isLoad = false;
        // state.userToken=action.payload.userToken;
      }),
      builder.addCase(historyStatus.rejected, (state, action) => {
        state.isLoad = false;
        state.error = action.payload;
      })
  },
});
export default HistoryPublicOrPrivateSlice.reducer;
