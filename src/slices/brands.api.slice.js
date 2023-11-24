import { apiSlice } from "./api.slice";
import { BRANDS_URL } from "../constants";

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({ url: BRANDS_URL }),
      keepUnusedDataFor: 5,
      providesTags: ["Brands"],
    }),
  }),
});

export const { useGetBrandsQuery } = brandsApiSlice;
