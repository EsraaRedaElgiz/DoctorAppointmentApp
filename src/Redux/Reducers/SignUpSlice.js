import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import Axios from "../../utils/axios"
const initState = {
    name: "",
    phoneNum: "",
    email: "",
    password: "",
    isLoading: false,
    error: null,
    success:false
}
//backed
export const registerUser  = createAsyncThunk(
    "SignUp/registerUser ",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const response = await Axios({
                    method: "POST",
                    url: "/patient/user_signup.php",
                    data: args,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            console.log(JSON.stringify(response.data))
            return response;
        } catch (error) {
            console.log(error)
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
        }
    },
    
    extraReducers:(builder)=> {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        }),
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success=true;
        }),
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});
export default signUpSlice.reducer;
export const {
    setName,
    setPhoneNum,
    setEmail,
    setPassword,
} = signUpSlice.actions;