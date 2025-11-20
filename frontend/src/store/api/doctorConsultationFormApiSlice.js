import { apiSlice } from "./apiSlice";
import { DOCTOR_CONSULTATIONS_API } from "@/utils/constants";

export const doctorConsultationFormApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createConsultationForm: builder.mutation({
      query: ({ doctorId, data }) => ({
        url: `${DOCTOR_CONSULTATIONS_API}/${doctorId}/consultation-form`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Consultations"],
    }),
    getConsultationFormsForDoctor: builder.query({
      query: () => `${DOCTOR_CONSULTATIONS_API}/consultation-forms`,
      providesTags: ["Consultations"],
    }),
  }),
});

export const {
  useCreateConsultationFormMutation,
  useGetConsultationFormsForDoctorQuery,
} = doctorConsultationFormApiSlice;
