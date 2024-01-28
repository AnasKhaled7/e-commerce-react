import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";

import { BASE_URL } from "../constants";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        const decodedToken = jwtDecode(token);

        if (decodedToken?.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("decodedToken");
          window.location.reload();
        } else {
          headers.set(
            "authorization",
            `${process.env.REACT_APP_BEARER_TOKEN} ${token}`
          );
        }
      }

      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "User",
    "Users",
    "Category",
    "Categories",
    "Brand",
    "Brands",
    "Product",
    "Products",
    "Reviews",
    "Carts",
    "Order",
    "Orders",
  ],
  endpoints: (builder) => ({}),
});
