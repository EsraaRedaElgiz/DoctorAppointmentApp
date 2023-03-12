import { createSlice } from "@reduxjs/toolkit"
const initState = {
    isLoggedIn: false,
}
const AuthSlice = createSlice({
    name: "Auth",
    initialState: initState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = true;
        },
        setLoggedOut:(state, action) => {
            state.isLoggedIn=false
        }
    },
});
export default AuthSlice.reducer;
export const {
    setLoggedIn,
    setLoggedOut
} = AuthSlice.actions;