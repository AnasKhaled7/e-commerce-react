import { apiSlice } from "./api.slice";
import { CATEGORIES_URL } from "../constants";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ page = 1, limit = 8 }) => ({
        url: CATEGORIES_URL,
        params: { page, limit },
      }),
      providesTags: ["Categories"],
    }),

    getCategoriesNames: builder.query({
      query: () => ({ url: `${CATEGORIES_URL}/names` }),
      providesTags: ["Categories"],
    }),

    getCategory: builder.query({
      query: (categoryId) => ({ url: `${CATEGORIES_URL}/${categoryId}` }),
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (category) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, category }) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["Categories", "Category"],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories", "Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesNamesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
