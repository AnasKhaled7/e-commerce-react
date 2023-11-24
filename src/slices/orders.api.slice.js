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
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({ url: `${ORDERS_URL}/${orderId}` }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),

    getMyOrders: builder.query({
      query: () => ({ url: `${ORDERS_URL}/my-orders` }),
      keepUnusedDataFor: 5,
      providesTags: ["Orders"],
    }),

    getOrders: builder.query({
      query: () => ({ url: ORDERS_URL }),
      keepUnusedDataFor: 5,
      providesTags: ["Orders"],
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),

    payOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
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
