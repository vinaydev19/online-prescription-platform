import { getPatient } from "../slices/patientSlice";
import { apiSlice } from "./apiSlice";
import { PATIENTS_API } from "@/utils/constants";

export const patientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        patientSignup: builder.mutation({
            query: (formData) => ({
                url: `${PATIENTS_API}/signup`,
                method: "POST",
                body: formData,
            }),
        }),
        patientLogin: builder.mutation({
            query: (body) => ({
                url: `${PATIENTS_API}/login`,
                method: "POST",
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getPatient(res.data.loggedPatient));
                } catch (err) {
                    console.error("Patient login failed", err);
                }
            },
        }),
        patientLogout: builder.mutation({
            query: () => ({
                url: `${PATIENTS_API}/logout`,
                method: "POST",
            }),
        }),
        getCurrentPatient: builder.query({
            query: () => `${PATIENTS_API}/me`,
            providesTags: ["Patient"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getPatient(res.data.patient));
                } catch { }
            }
        }),
        getAllDoctorsForPatient: builder.query({
            query: () => `${PATIENTS_API}/doctors`,
            providesTags: ["Doctors"],
        }),
        getPatientPrescriptions: builder.query({
            query: () => `${PATIENTS_API}/prescriptions`,
            providesTags: ["Prescriptions"],
        }),

    }),
});

export const {
    usePatientSignupMutation,
    usePatientLoginMutation,
    usePatientLogoutMutation,
    useGetCurrentPatientQuery,
    useGetAllDoctorsForPatientQuery,
    useGetPatientPrescriptionsQuery,
} = patientApiSlice;
