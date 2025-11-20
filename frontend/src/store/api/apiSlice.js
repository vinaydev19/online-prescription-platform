import { BASE_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const state = api.getState();
        const role = state.auth?.role;

        let refreshEndpoint = "";

        if (role === "doctor") refreshEndpoint = "/doctors/refresh-token";
        else if (role === "patient") refreshEndpoint = "/patients/refresh-token";
        else {
            api.dispatch({ type: "auth/logout" });
            window.location.href = "/login";
            return result;
        }

        const refreshResult = await baseQuery(refreshEndpoint, api, extraOptions);

        if (refreshResult?.data) {
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch({ type: "auth/logout" });
            window.location.href = "/login";
        }
    }

    return result;
};


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users', 'Courses', 'Instructors', 'Lectures'],
    endpoints: builder => ({}),
})

