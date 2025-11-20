import { createSlice } from "@reduxjs/toolkit";

// Initial state for the doctor slice
const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        doctor: null,
        profile: null,
    },
    reducers: {
        getDoctor: (state, action) => {
            state.doctor = action.payload;
        },
        logout: (state) => {
            state.doctor = null;
            state.profile = null;
        }
    },
});

export const { getDoctor, logout } = doctorSlice.actions;

export default doctorSlice.reducer;