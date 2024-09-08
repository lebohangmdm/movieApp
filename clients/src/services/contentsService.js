import { apiSlice } from "./apiSlice";

export const contentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContents: builder.query({
      query: ({ sort }) => ({
        url: "contents",
        params: { sort },
      }),
      providesTags: ["Contents"],
    }),
    getRandomContent: builder.query({
      query: ({ type }) => ({
        url: "contents",
        params: { type },
      }),
    }),
    createContent: builder.mutation({
      query: (newContent) => ({
        url: `contents`,
        method: "POST",
        body: newContent,
      }),
      invalidatesTags: ["Contents"],
    }),
    getContent: builder.query({
      query: (id) => `contents/${id}`,
      invalidatesTags: ["Contents"],
    }),

    getContentByName: builder.query({
      query: ({ title }) => ({
        url: "/contents",
        params: { title },
      }),
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
    getAllContentBasedOnType: builder.query({
      query: ({ type, sort }) => ({
        url: "contents",
        params: { type, sort },
      }),
    }),
    getFeaturedContent: builder.query({
      query: ({ featured, createdAt, limit }) => ({
        url: "/contents",
        params: { featured, createdAt, limit },
      }),
    }),
    updateContent: builder.mutation({
      query: ({ id, formData }) => {
        console.log(formData);
        return {
          url: `contents/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Contents", "Reviews"],
    }),
    deleteContent: builder.mutation({
      query: ({ id }) => ({
        url: `contents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contents", "Reviews"],
    }),
  }),
});

export const {
  useGetAllContentsQuery,
  useGetRandomContentQuery,
  useCreateContentMutation,
  useGetContentQuery,
  useGetFeaturedContentQuery,
  useUpdateContentMutation,
  useDeleteContentMutation,
  useGetContentBasedOnSortQuery,
  useGetContentBasedOnGenresQuery,
  useGetAllContentBasedOnTypeQuery,
  useGetContentByNameQuery,
} = contentsApiSlice;
