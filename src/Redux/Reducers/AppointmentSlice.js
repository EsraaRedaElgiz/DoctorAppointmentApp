import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const getAppointmentes = createAsyncThunk("appointments/getAppointmentes", async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await axios.get("http://localhost:8080/api/appointments");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }

})

const AppointmentSlice = createSlice({
    name: "appointments",
    initialState: { appointmentes: [], isLoading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(getAppointmentes.pending, (state, action) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(getAppointmentes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.appointmentes = action.payload;
            })
            .addCase(getAppointmentes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});
export default AppointmentSlice.reducer;
