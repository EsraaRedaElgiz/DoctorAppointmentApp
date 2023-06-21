import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Axios from '../../utils/axios';

const initState = {
  isLoading: false,
  error: null,
  topDoctors: []
}
export const getTopDoctors = createAsyncThunk(
  'TopDoctors/getTopDoctors',
  async (args, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      await Axios({
        method: 'GET',
        url: '/patient/doctors.php?top_rate=1',
      })
        .then(res => {
          if (res.status == 200) {
            if (Array.isArray(res.data)) {
               //console.log('arr', res.data);
              dispatch(setTopDoctorsArr(res.data));
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

const TopDoctorsSlice = createSlice({
  name: 'TopDoctors',
  initialState: initState,
  reducers: {
    setTopDoctorsArr: (state, action) => {
      state.topDoctors = action.payload;
    }, setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getTopDoctors.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // console.log('pending');
      })
      .addCase(getTopDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log('success');
      })
      .addCase(getTopDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        //console.log('failed');
      });
  },
});
export default TopDoctorsSlice.reducer;
export const { setTopDoctorsArr,setError } = TopDoctorsSlice.actions;
