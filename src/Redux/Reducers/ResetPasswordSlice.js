import { createSlice } from "@reduxjs/toolkit"
const initState = {
    password: "",
    confirmPassword: "",
}
const resetPasswordSlice = createSlice({
    name: "ResetPassword",
    initialState: initState,
    reducers: {
        setPassword: (state, action) => {
            state.password = action.payload;
        }, setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
    },
});
export default resetPasswordSlice.reducer;
export const {
    setPassword,
    setConfirmPassword,
     } = resetPasswordSlice.actions;