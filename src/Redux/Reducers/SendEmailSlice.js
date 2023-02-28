import { createSlice } from "@reduxjs/toolkit"
const initState = {
    emailToSendVerificationCode: "",
}
const SendEmailSlice = createSlice({
    name: "ForgetPassword",
    initialState: initState,
    reducers: {
        setEmailToSendVerificationCode: (state, action) => {
            state.emailToSendVerificationCode = action.payload;
        }
    },
});
export default SendEmailSlice.reducer;
export const {
    setEmailToSendVerificationCode,
} = SendEmailSlice.actions;