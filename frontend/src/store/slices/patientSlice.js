import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
    name: "patient",
    initialState: {
        patient: null,
        profile: null,
    },
    reducers: {
        getPatient: (state, action) => {
            state.patient = action.payload;
        },
        logout: (state) => {
            state.patient = null;
            state.profile = null;
        },
    },
});

export const { getPatient, logout } = patientSlice.actions;

export default patientSlice.reducer;