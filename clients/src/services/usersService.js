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
      providesTags: ["Users"],
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
    addContent: builder.mutation({
      query: (data) => ({
        url: `users/my-list`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    removeContent: builder.mutation({
      query: (data) => {
        return { url: `users/my-list`, method: "DELETE", body: data };
      },
      invalidatesTags: ["Users"],
    }),
    likeContent: builder.mutation({
      query: (data) => {
        return {
          url: `users/favorites`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Users"],
    }),
    hateContent: builder.mutation({
      query: (data) => ({
        url: `users/favorites`,
        method: "DELETE",
        body: data,
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
  useAddContentMutation,
  useRemoveContentMutation,
  useLikeContentMutation,
  useHateContentMutation,
} = userApiSlice;
