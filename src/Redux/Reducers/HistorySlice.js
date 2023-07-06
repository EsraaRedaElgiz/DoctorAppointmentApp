import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Axios from '../../utils/axios';

const initState = {
  isLoading: false,
  error: null,
  history: [],
};
export const getHistory = createAsyncThunk(
  'history/getHistory',
  async (args, thunkAPI) => {
    const {rejectWithValue, dispatch} = thunkAPI;
    try {
      await Axios({
        method: 'GET',
        url: '/patient/appointments.php?filter=history',
        //params:{}
      })
        .then(res => {
          if (res.status == 200) {
            if (Array.isArray(res.data)) {
              // console.log('data in history ', res.data);
              dispatch(setHistoryArr(res.data));
            } else {
              console.log(res.data);
              dispatch(setError(JSON.stringify(res.data)));
            }
          } else {
            alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
            dispatch(
              setError('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا'),
            );
          }
        })
        .catch(err => {
          console.log(err);
          dispatch(setError(JSON.stringify(err)));
        });
    } catch (error) {
      console.log(error.message);
      dispatch(setError(JSON.stringify(error)));
      return rejectWithValue(error.message);
    }
  },
);

const HistorySlice = createSlice({
  name: 'history',
  initialState: initState,
  reducers: {
    setHistoryArr: (state, action) => {
      state.history = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getHistory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // console.log('pending');
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log('success');
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        //console.log('failed');
      });
  },
});
export default HistorySlice.reducer;
export const {setHistoryArr, setError} = HistorySlice.actions;
