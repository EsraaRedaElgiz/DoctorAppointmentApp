import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/axios';
import { Alert } from 'react-native';
const initState = {
    isLoading: false,
    error: null,
};
export const sendRate = createAsyncThunk(
    'rateDoctor/sendRate ',
    async (args, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            let response = '';
            await Axios({
                method: 'POST',
                url: '/patient/rate_doctor.php',
                data: args,
            })
                .then(res => {
                    if (res.status == 200) {
                        if (res.data == "successfully rate doctor") {
                            response = true;
                        }else {
                            Alert.alert(JSON.stringify(res.data));
                        }
                    } else {
                        Alert.alert('حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');
                    }
                })
                .catch(err => {
                    if (err.message == "Network Error") {
                        Alert.alert(' خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا');// right //لو مفيش نت هيدخل هنا
                    } else if(err.response.data.errors[0].same_id=="patient cannot rate the same doctor two times!") {
                        Alert.alert("لقد قمت بتقييم هذا الدكتور بالفعل");
                    }else{
                        Alert.alert(err.response.data)
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
const rateDoctorSlice = createSlice({
    name: 'rateDoctor',
    initialState: initState,
    extraReducers: builder => {
        builder.addCase(sendRate.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
            //console.log('pending');
        }),
            builder.addCase(sendRate.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log('sucess');
            }),
            builder.addCase(sendRate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                //console.log('failed');
            });
    },
});
export default rateDoctorSlice.reducer;
export const { } = rateDoctorSlice.actions;
