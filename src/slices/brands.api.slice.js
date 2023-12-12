import { apiSlice } from "./api.slice";
import { BRANDS_URL } from "../constants";

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({ url: BRANDS_URL }),
      providesTags: ["Brands"],
    }),

    getBrandsNames: builder.query({
      query: () => ({ url: `${BRANDS_URL}/names` }),
      providesTags: ["Brands"],
    }),

    getBrand: builder.query({
      query: (brandId) => ({ url: `${BRANDS_URL}/${brandId}` }),
      providesTags: ["Brand"],
    }),

    createBrand: builder.mutation({
      query: (brand) => ({
        url: BRANDS_URL,
        method: "POST",
        body: brand,
      }),
      invalidatesTags: ["Brands"],
    }),

    updateBrand: builder.mutation({
      query: ({ brandId, brand }) => ({
        url: `${BRANDS_URL}/${brandId}`,
        method: "PATCH",
        body: brand,
      }),
      invalidatesTags: ["Brands", "Brand"],
    }),

    updateBrandImage: builder.mutation({
      query: ({ brandId, image }) => {
        const formData = new FormData();
        formData.append("image", image);
        return {
          url: `${BRANDS_URL}/${brandId}/image`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Brands", "Brand"],
    }),

    deleteBrand: builder.mutation({
      query: (brandId) => ({
        url: `${BRANDS_URL}/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands", "Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandsNamesQuery,
  useCreateBrandMutation,
  useGetBrandQuery,
  useUpdateBrandMutation,
  useUpdateBrandImageMutation,
  useDeleteBrandMutation,
} = brandsApiSlice;
