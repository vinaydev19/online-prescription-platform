import { getDoctor } from "../slices/doctorSlice";
import { apiSlice } from "./apiSlice";
import { DOCTORS_API } from "@/utils/constants";

export const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        doctorSignup: builder.mutation({
            query: (formData) => ({
                url: `${DOCTORS_API}/signup`,
                method: "POST",
                body: formData,
            }),
        }),
        doctorLogin: builder.mutation({
            query: (body) => ({
                url: `${DOCTORS_API}/login`,
                method: "POST",
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getDoctor(res.data.loggedDoctor));
                } catch (err) {
                    console.error("Doctor login failed", err);
                }
            },
        }),
        doctorLogout: builder.mutation({
            query: () => ({
                url: `${DOCTORS_API}/logout`,
                method: "POST",
            }),
        }),
        getCurrentDoctor: builder.query({
            query: () => `${DOCTORS_API}/me`,
            providesTags: ["Doctor"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getDoctor(res.data.doctor));
                } catch { }
            }
        }),
        getAllDoctors: builder.query({
            query: () => `${DOCTORS_API}/doctors`,
            providesTags: ["Doctors"],
        }),
        getPatientsForDoctor: builder.query({
            query: () => `${DOCTORS_API}/patients`,
            providesTags: ["DoctorPatients"],
        }),
    }),
});

export const {
    useDoctorSignupMutation,
    useDoctorLoginMutation,
    useDoctorLogoutMutation,
    useGetCurrentDoctorQuery,
    useGetAllDoctorsQuery,
    useGetPatientsForDoctorQuery,
} = doctorApiSlice;
