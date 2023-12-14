import { apiSlice } from "./api.slice";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
      invalidatesTags: ["Orders", "Products", "Product"],
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({ url: `${ORDERS_URL}/${orderId}` }),
      providesTags: ["Order"],
    }),

    getMyOrders: builder.query({
      query: () => ({ url: `${ORDERS_URL}/my-orders` }),
      providesTags: ["Orders"],
    }),

    getOrders: builder.query({
      query: () => ({ url: ORDERS_URL }),
      providesTags: ["Orders"],
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders", "Order"],
    }),

    payOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders", "Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  usePayOrderMutation,
} = ordersApiSlice;
