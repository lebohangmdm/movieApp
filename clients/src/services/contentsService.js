import { apiSlice } from "./apiSlice";

export const contentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContents: builder.query({
      query: () => `contents`,
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
  useCreateContentMutation,
  useGetContentQuery,
  useUpdateContentMutation,
  useDeleteContentMutation,
} = contentsApiSlice;
