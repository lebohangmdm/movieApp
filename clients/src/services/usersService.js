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
    addContent: builder.mutation({
      query: (newContent) => ({
        url: `users/my-list`,
        method: "POST",
        body: newContent,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteContent: builder.mutation({
      query: () => ({
        url: `users/my-list`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    likeContent: builder.mutation({
      query: (newContent) => ({
        url: `users/favorites`,
        method: "POST",
        body: newContent,
      }),
      invalidatesTags: ["Users"],
    }),
    hateContent: builder.mutation({
      query: () => ({
        url: `users/favorites`,
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
  useAddContentMutation,
  useDeleteContentMutation,
  useLikeContentMutation,
  useHateContentMutation,
} = userApiSlice;
