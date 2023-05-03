import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/axios';

const initState = {
    isLoading: false,
    error: null,
    specialities:[]
};
export const getSpecialities = createAsyncThunk(
    'specialities/getSpecialities ',
    async (args, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            let response = ""
            await Axios({
                method: 'GET',
                url: '/general/specialties.php',
                data: args,
            })
                .then(res => {
                    if (res.status == 200) {
                        if (Array.isArray(res.data)) {
                            response = res.data
                            dispatch(setSpecialities(res.data))
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
const getSpecialitiesSlice = createSlice({
    name: 'specialities',
    initialState: initState,
    reducers: {
        setSpecialities: (state, action) => {
          state.specialities = action.payload;
        },
      },
    extraReducers: builder => {
        builder.addCase(getSpecialities.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        }),
            builder.addCase(getSpecialities.fulfilled, (state, action) => {
                state.isLoading = false;
            }),
            builder.addCase(getSpecialities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});
export default getSpecialitiesSlice.reducer;
export const {setSpecialities } = getSpecialitiesSlice.actions;
