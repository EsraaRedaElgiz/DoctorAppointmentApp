import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import Axios from "../../../../src/utils/axios"
import { setLoggedOut } from "../../../../src/Redux/Reducers/AuthSlice"

const initState = {
    name: "",
    phoneNum: "",
    email: "",
    password: "",
    isLoading: false,
    error: null,
    success: false
}
//backed
export const registerDoctor = createAsyncThunk(
    "DoctorSignUp/registerDoctor ",
    async (args, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI
        try {
            await Axios({
                method: "POST",
                url: "/doctor/user_signup.php",
                data: args,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
                if (res.status == 200) {

                    if (res.data === "Success sigunp") {
                        dispatch(setSuccess(true))
                        
                    } else {
                        console.log(res.data);
                    }

                } else {
                    alert("حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا")
                }
            }).catch((err) => {
                console.log(err)
            })

        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);

        }
    })
const doctorSignUpSlice = createSlice({
    name: "DoctorSignUp",
    initialState: initState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setPhoneNum: (state, action) => {
            state.phoneNum = action.payload;
        }, setEmail: (state, action) => {
            state.email = action.payload;
        }, setPassword: (state, action) => {
            state.password = action.payload;
        }, setSuccess: (state, action) => {
            state.success = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(registerDoctor.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        }),
            builder.addCase(registerDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
            }),
            builder.addCase(registerDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder.addCase(setLoggedOut, (state, action) => {
            state.success = false
        })
    }
});
export default doctorSignUpSlice.reducer;
export const {
    setName,
    setPhoneNum,
    setEmail,
    setPassword,
    setSuccess
} = doctorSignUpSlice.actions;