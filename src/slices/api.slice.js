import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constants";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Users",
    "Category",
    "Categories",
    "Brands",
    "Product",
    "Products",
    "Carts",
    "Order",
    "Orders",
  ],
  endpoints: (builder) => ({}),
});
