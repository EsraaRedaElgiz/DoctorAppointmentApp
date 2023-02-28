import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const getHistory = createAsyncThunk("history/getHistory", async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await axios.get("http://localhost:8080/api/appointments");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }

})

const HistorySlice = createSlice({
    name: "history",
    initialState: { history: [], isLoading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(getHistory.pending, (state, action) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.history = action.payload;
            })
            .addCase(getHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});
export default HistorySlice.reducer;
