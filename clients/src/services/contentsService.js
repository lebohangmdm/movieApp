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
    getContentBasedOnGenre: builder.query({
      query: ({ type, sort }) => ({
        url: "/contents",
        params: { type, sort },
      }),
    }),
    getTopContent: builder.query({
      query: ({ type, createdAt, limit }) => ({
        url: "/contents",
        params: { type, createdAt, limit },
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
  useGetContentBasedOnGenreQuery,
  useGetTopContentQuery,
} = contentsApiSlice;
