import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constants";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: [
    "Auth",
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
