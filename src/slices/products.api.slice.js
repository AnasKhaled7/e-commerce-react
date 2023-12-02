import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./api.slice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),

    getProductsByCategory: builder.query({
      query: (categoryId) => ({
        url: `${PRODUCTS_URL}/category/${categoryId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),

    getProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, product }) => {
        return {
          url: `${PRODUCTS_URL}/${productId}`,
          method: "PATCH",
          body: product,
        };
      },
      invalidatesTags: ["Products", "Product"],
    }),

    updateProductImage: builder.mutation({
      query: ({ productId, image }) => {
        const formData = new FormData();
        formData.append("image", image);
        return {
          url: `${PRODUCTS_URL}/${productId}/image`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Products", "Product"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useUpdateProductMutation,
  useUpdateProductImageMutation,
  useDeleteProductMutation,
} = productsApiSlice;
