import { REVIEWS_URL } from "../constants";
import { apiSlice } from "./api.slice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ productId, data }) => ({
        url: `${REVIEWS_URL}/product/${productId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "Product", "Reviews"],
    }),

    getReviews: builder.query({
      query: (productId) => ({
        url: `${REVIEWS_URL}/product/${productId}`,
      }),
      providesTags: ["Reviews"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewsApiSlice;
