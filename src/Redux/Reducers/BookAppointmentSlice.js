import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from 'react-native';
import Axios from "../../utils/axios";

const initialState = {
  date: '',
  time: '',
  isLoading2: false,
  error: null,
};
export const bookAppointment = createAsyncThunk(
  'BookAppointment/bookAppointment',
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      let response=""
      await Axios({
        method: 'POST',
        url: '/patient/book_appointment.php',
        data: args,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status==true) {
              console.log(res.data)
              response=true
            }else {
              Alert.alert(JSON.stringify(res.data))
            }
          } else {
            Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
          }
        })
        .catch(err => {
          if (err.message == "Network Error") {
            Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');// right //لو مفيش نت هيدخل هنا
          }else{
            Alert.alert(JSON.stringify(err.response.data))
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
const BookAppointmentSlice = createSlice({
  name: 'BookAppointment',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload.date;
      console.log('DATE IN GLOBAL STATE => ' + state.date);
    },
    setTime: (state, action) => {
      state.time = action.payload.time;
    },
  },
  extraReducers: builder => {
    builder.addCase(bookAppointment.pending, (state, action) => {
      state.isLoading2 = true;
      state.error = null;
    }),
      builder.addCase(bookAppointment.fulfilled, (state, action) => {
        state.isLoading2 = false;
        // state.userToken=action.payload.userToken;
      }),
      builder.addCase(bookAppointment.rejected, (state, action) => {
        state.isLoading2 = false;
        state.error = action.payload;
      })
  },
});

export default BookAppointmentSlice.reducer;
export const {setDate, setTime} = BookAppointmentSlice.actions;
