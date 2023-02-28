import { createSlice } from "@reduxjs/toolkit"
const initState = {
    name: "",
    phoneNum: "",
    email: "",
    password: "",
    confirmPassword: "",
    isLoading: false,
    error: null,
}
//backed
/*export const insertData = createAsyncThunk(
    "SignUp/insertData",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const response = await fetch('link', {
                method: 'POST',
                body: JSON.stringify(args),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })
            const data = await response.json();
            return data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    })*/
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
        }, setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
    },
    //backend
    /*extraReducers:{
        [insertData.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertData.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [insertData.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }*/
});
export default signUpSlice.reducer;
export const {
    setName,
    setPhoneNum,
    setEmail,
    setPassword,
    setConfirmPassword,
} = signUpSlice.actions;