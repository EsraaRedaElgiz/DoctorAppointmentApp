import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import Axios from "../../utils/axios"
import { setLoggedOut } from "../../Redux/Reducers/AuthSlice"

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
export const registerUser = createAsyncThunk(
    "SignUp/registerUser ",
    async (args, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI
        try {
            await Axios({
                method: "POST",
                url: "/patient/user_signup.php",
                data: args,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
                if (res.status == 200) {

                    if (res.data === "Success add patient data") {
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
const signUpSlice = createSlice({
    name: "SignUp",
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
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        }),
            builder.addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
            }),
            builder.addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        builder.addCase(setLoggedOut, (state, action) => {
            state.success = false
        })
    }
});
export default signUpSlice.reducer;
export const {
    setName,
    setPhoneNum,
    setEmail,
    setPassword,
    setSuccess
} = signUpSlice.actions;