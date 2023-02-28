import { createSlice } from "@reduxjs/toolkit"
const initState = {
    photoUri: "",
    bloodType: "",
    weight: "",
    height: "",
    age: "",
    gender: ""
}
const medicalSheetSlice = createSlice({
    name: "MedicalSheet",
    initialState: initState,
    reducers: {
        setPhotoUri: (state, action) => {
            state.photoUri = action.payload;
        }, setBloodType: (state, action) => {
            state.bloodType = action.payload;
        }, setWeight: (state, action) => {
            state.weight = action.payload;
        }, setHeight: (state, action) => {
            state.height = action.payload;
        }, setAge: (state, action) => {
            state.age = action.payload;
        }, setGender: (state, action) => {
            state.gender = action.payload;
        }
    },
});
export default medicalSheetSlice.reducer;
export const {
    setPhotoUri,
    setBloodType,
    setWeight,
    setHeight,
    setAge,
    setGender
} = medicalSheetSlice.actions;