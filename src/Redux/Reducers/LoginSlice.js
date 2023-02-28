import { createSlice } from "@reduxjs/toolkit"
const initState = {
    email: "",
    password: "",
    rememberMe: false
}
const LoginSlice = createSlice({
    name: "Login",
    initialState: initState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        }, setPassword: (state, action) => {
            state.password = action.payload;
        }, setRememberMe: (state, action) => {
            state.rememberMe = action.payload;
        }
    },
});
export default LoginSlice.reducer;
export const {
    setEmail,
    setPassword,
    setRememberMe
} = LoginSlice.actions;