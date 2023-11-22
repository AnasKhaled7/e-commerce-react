import { AUTH_URL, USERS_URL } from "../constants";
import { apiSlice } from "./api.slice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Auth"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Auth"],
    }),

    sendResetPasswordEmail: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password-code`,
        method: "PATCH",
        body: data,
      }),
      providesTags: ["Auth"],
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "PATCH",
        body: data,
      }),
      providesTags: ["Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendResetPasswordEmailMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = usersApiSlice;
