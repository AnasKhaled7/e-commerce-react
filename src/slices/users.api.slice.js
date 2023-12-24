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
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "PATCH",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    getProfile: builder.query({
      query: () => `${USERS_URL}/profile`,
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: builder.query({
      query: () => `${USERS_URL}`,
      providesTags: ["Users"],
    }),

    blockUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${USERS_URL}/block/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendResetPasswordEmailMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = usersApiSlice;
