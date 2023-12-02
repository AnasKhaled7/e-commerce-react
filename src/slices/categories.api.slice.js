import { apiSlice } from "./api.slice";
import { CATEGORIES_URL } from "../constants";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({ url: CATEGORIES_URL }),
      keepUnusedDataFor: 5,
      providesTags: ["Categories"],
    }),

    getCategoriesNames: builder.query({
      query: () => ({ url: `${CATEGORIES_URL}/names` }),
      keepUnusedDataFor: 5,
      providesTags: ["Categories"],
    }),

    getCategory: builder.query({
      query: (categoryId) => ({ url: `${CATEGORIES_URL}/${categoryId}` }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesNamesQuery,
  useGetCategoryQuery,
} = categoriesApiSlice;
