import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ sort }) => ({
        url: "users",
        params: { sort },
      }),
      providesTags: ["Users"],
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
      invalidatesTags: ["Users"],
    }),

    deleteProfile: builder.mutation({
      query: () => ({
        url: `users/profile/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useDeleteUserMutation,
} = userApiSlice;
