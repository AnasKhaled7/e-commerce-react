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
  }),
});

export const { useGetBrandsQuery, useGetBrandsNamesQuery } = brandsApiSlice;
