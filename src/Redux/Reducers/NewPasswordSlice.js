import { createSlice } from "@reduxjs/toolkit"
const initState = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
}
const newPasswordSlice = createSlice({
    name: "newPassword",
    initialState: initState,
    reducers: {
        setOldPassword: (state, action) => {
            state.oldPassword = action.payload
        }, setNewPassword: (state, action) => {
            state.newPassword = action.payload;
        }, setConfirmNewPassword: (state, action) => {
            state.confirmNewPassword = action.payload;
        },
    },
});
export default newPasswordSlice.reducer;
export const {
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword,
} = newPasswordSlice.actions;