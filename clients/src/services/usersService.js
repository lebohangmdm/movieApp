import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ sort }) => ({
        url: "users",
        params: { sort },
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "users/profile/me",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `users/profile/update`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteProfile: builder.mutation({
      query: () => ({
        url: `users/profile/delete`,
        method: "DELETE",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = userApiSlice;
