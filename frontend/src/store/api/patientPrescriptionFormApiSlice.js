import { apiSlice } from "./apiSlice";
import { PATIENT_PRESCRIPTIONS_API } from "@/utils/constants";

export const patientPrescriptionFormApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPrescription: builder.mutation({
      query: ({ patientId, consultationFormId, data }) => ({
        url: `${PATIENT_PRESCRIPTIONS_API}/create/${patientId}/${consultationFormId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Prescriptions"],
    }),
    getPrescriptionsByDoctor: builder.query({
      query: () => `${PATIENT_PRESCRIPTIONS_API}/doctor/all`,
      providesTags: ["Prescriptions"],
    }),
    getPrescriptionByIdDoctor: builder.query({
      query: (id) => `${PATIENT_PRESCRIPTIONS_API}/doctor/${id}`,
      providesTags: ["Prescriptions"],
    }),
    updatePrescription: builder.mutation({
      query: ({ prescriptionId, data }) => ({
        url: `${PATIENT_PRESCRIPTIONS_API}/doctor/update/${prescriptionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Prescriptions"],
    }),
    deletePrescription: builder.mutation({
      query: (prescriptionId) => ({
        url: `${PATIENT_PRESCRIPTIONS_API}/doctor/delete/${prescriptionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prescriptions"],
    }),
    getPrescriptionsByPatient: builder.query({
      query: () => `${PATIENT_PRESCRIPTIONS_API}/patient/all`,
      providesTags: ["Prescriptions"],
    }),
    getPrescriptionByIdPatient: builder.query({
      query: (id) => `${PATIENT_PRESCRIPTIONS_API}/patient/${id}`,
      providesTags: ["Prescriptions"],
    }),

  }),
});

export const {
  useCreatePrescriptionMutation,
  useGetPrescriptionsByDoctorQuery,
  useGetPrescriptionByIdDoctorQuery,
  useUpdatePrescriptionMutation,
  useDeletePrescriptionMutation,
  useGetPrescriptionsByPatientQuery,
  useGetPrescriptionByIdPatientQuery,
} = patientPrescriptionFormApiSlice;
