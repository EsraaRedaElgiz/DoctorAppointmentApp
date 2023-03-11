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
        }
    },
});
export default AuthSlice.reducer;
export const {
    setLoggedIn
} = AuthSlice.actions;