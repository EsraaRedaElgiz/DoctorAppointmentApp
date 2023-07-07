import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../../../src/utils/axios';

const initState = {
    isLoading2: false,
    error: null,
    historyArr: []
};
export const getPatientHistory = createAsyncThunk(
    'patientHistory/getPatientHistory ',
    async (args, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            let response = ""
            await Axios({
                method: 'GET',
                url: `doctor/patient_history.php?patient_id=${args}`,
            })
                .then(res => {
                    if (res.status == 200) {
                        if (Array.isArray(res.data)) {
                            response = res.data
                            dispatch(setHistoryArr(res.data))
                        } else {
                            console.log(res.data);
                            dispatch(setHistoryArr([]))

                        }
                    } else {
                        alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
                    }
                })
                .catch(err => {
                    console.log(err.response.data);
                    dispatch(setHistoryArr([]))

                });
            return response;
        } catch (error) {
            console.log(error.response.data)
            //console.log(rejectWithValue(error.message))
            dispatch(setHistoryArr([]))

            return rejectWithValue(error.message);
        }
    },
);
const getPatientHistorySlice = createSlice({
    name: 'patientHistory',
    initialState: initState,
    reducers: {
        setHistoryArr: (state, action) => {
            state.historyArr = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getPatientHistory.pending, (state, action) => {
            state.isLoading2 = true;
            state.error = null;
        }),
            builder.addCase(getPatientHistory.fulfilled, (state, action) => {
                state.isLoading2 = false;
            }),
            builder.addCase(getPatientHistory.rejected, (state, action) => {
                state.isLoading2 = false;
                state.error = action.payload;
                dispatch(setHistoryArr([]))

            });

    },
});
export default getPatientHistorySlice.reducer;
export const { setHistoryArr } = getPatientHistorySlice.actions;
