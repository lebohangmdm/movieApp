import { apiSlice } from "./apiSlice";

export const contentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContents: builder.query({
      query: () => `contents`,
    }),
    getRandomMovies: builder.query({
      query: () => `contents/random`,
    }),
    createContent: builder.mutation({
      query: (newContent) => ({
        url: `contents`,
        method: "POST",
        body: newContent,
      }),
    }),
    getContent: builder.query({
      query: (id) => `contents/${id}`,
    }),
    getContentBasedOnSort: builder.query({
      query: ({ type, sort, limit }) => ({
        url: "/contents",
        params: { type, sort, limit },
      }),
    }),
    getContentBasedOnGenres: builder.query({
      query: ({ type, genres, limit, sort }) => ({
        url: "/contents",
        params: { type, genres, limit, sort },
      }),
    }),
    getFeaturedContent: builder.query({
      query: ({ featured, createdAt, limit }) => ({
        url: "/contents",
        params: { featured, createdAt, limit },
      }),
    }),
    updateContent: builder.mutation({
      query: ({ id, content }) => ({
        url: `contents/${id}`,
        method: "PATCH",
        body: content,
      }),
    }),
    deleteContent: builder.mutation({
      query: ({ id }) => ({
        url: `contents/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllContentsQuery,
  useGetRandomMoviesQuery,
  useCreateContentMutation,
  useGetContentQuery,
  useGetFeaturedContentQuery,
  useUpdateContentMutation,
  useDeleteContentMutation,
  useGetContentBasedOnSortQuery,
  useGetTopContentQuery,
  useGetContentBasedOnGenresQuery,
} = contentsApiSlice;
