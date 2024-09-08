import { apiSlice } from "./apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: ({ content, sort }) => ({
        url: `reviews`,
        params: { content, sort },
      }),
      providesTags: ["Reviews"],
    }),
    createReview: builder.mutation({
      query: (newContent) => ({
        url: `reviews`,
        method: "POST",
        body: newContent,
      }),
      invalidatesTags: ["Reviews", "Contents"],
    }),
    getReview: builder.query({
      query: (id) => `reviews/${id}`,
      providesTags: ["Reviews"],
    }),

    updateReview: builder.mutation({
      query: ({ id, content }) => {
        return {
          url: `reviews/${id}`,
          method: "PATCH",
          body: content,
        };
      },
      invalidatesTags: ["Reviews", "Contents"],
    }),
    deleteReview: builder.mutation({
      query: ({ id }) => ({
        url: `reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews", "Contents"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useGetReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApiSlice;
