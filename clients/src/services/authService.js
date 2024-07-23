import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `auth/change-password`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdatePasswordMutation,
} = userApiSlice;
