import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/axios";
import {Alert} from 'react-native'
const initState = {
    isLoading: false,
    error: null,
    specialityDoctors: []
}
export const getSpecialityDoctors = createAsyncThunk(
    'getSpeciality/getSpecialityDoctors',
    async (args, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            let response = ""
            await Axios({
                method: 'GET',
                url: `/patient/doctors.php?speciality_id=${args}`,
            })
                .then(res => {
                    if (res.status == 200) {
                        if (Array.isArray(res.data)) {
                            response = true
                            dispatch(setDoctorsArr(res.data))
                        } else if (res.data.errors[0].doctors = "No Data") {
                            Alert.alert("لا يوجد حاليا دكاتره في هذا التخصص")
                            dispatch(setDoctorsArr([]))
                        } else {
                            console.log("tsts", res.data);
                            dispatch(setDoctorsArr([]))

                        }
                    } else {
                        Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
                    }
                })
                .catch(err => {
                    console.log(err.response.data);
                    dispatch(setDoctorsArr([]))

                });
            return response;
        } catch (error) {
            console.log(error.response.data)
            //console.log(rejectWithValue(error.message))
            dispatch(setDoctorsArr([]))

            return rejectWithValue(error.message);
        }

    }
);
const getSpecialityDoctorsSlice = createSlice({
    name: 'getSpeciality',
    initialState: initState,
    reducers: {
        setDoctorsArr: (state, action) => {
            state.specialityDoctors = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getSpecialityDoctors.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        }),
            builder.addCase(getSpecialityDoctors.fulfilled, (state, action) => {
                state.isLoading = false;
            }),
            builder.addCase(getSpecialityDoctors.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                dispatch(setDoctorsArr([]))

            });

    },
});
export default getSpecialityDoctorsSlice.reducer;
export const { setDoctorsArr } = getSpecialityDoctorsSlice.actions;