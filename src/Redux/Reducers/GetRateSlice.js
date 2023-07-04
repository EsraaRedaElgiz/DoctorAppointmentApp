import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/axios';
import { setLoggedOut } from './AuthSlice';

const initState = {
    isLoading: false,
    error: null,
    rates: []
};
export const getRate = createAsyncThunk(
    'rate/getRate ',
    async (args, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            let response = ""
            await Axios({
                method: 'POST',
                url: '/general/ratings.php',
                data: args,
            })
                .then(res => {
                    if (res.status == 200) {
                        if (Array.isArray(res.data)) {
                            response = res.data
                            dispatch(setRateArr(res.data))
                        } else {
                            //console.log(res.data);
                            dispatch(setRateArr([]))
                        }
                    } else {
                        alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
                    }
                })
                .catch(err => {
                   // console.log(err);
                   dispatch(setRateArr([]))
                });
            return response;
        } catch (error) {
            //console.log(rejectWithValue(error.message));
            dispatch(setRateArr([]))
            return rejectWithValue(error.message);
        }
    },
);
const getRateSlice = createSlice({
    name: 'rate',
    initialState: initState,
    reducers: {
        setRateArr: (state, action) => {
            state.rates = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getRate.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        }),
            builder.addCase(getRate.fulfilled, (state, action) => {
                state.isLoading = false;
            }),
            builder.addCase(getRate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        builder.addCase(setLoggedOut, (state, action) => {
            state.rates = [];
        });

    },
});
export default getRateSlice.reducer;
export const { setRateArr } = getRateSlice.actions;
