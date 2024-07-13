import BaseResponse from '@/types/response'
import { Checkout, DeliveryType, Product, Transaction } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

interface CheckoutResponse extends BaseResponse {
    data: Checkout;
}

interface CheckoutsResponse extends BaseResponse {
  data: {
    id: string;
    userId: string;
    productId: string;
    qty: number;
    pricePerItem: number;
    createdAt: Date;
    updated: Date;
    product: Product;
  }[];
}

interface PaymentResponse extends BaseResponse {
  data: Transaction;
}

interface CheckoutPayload {
    product_id: string;
    qty: number;
}

interface PaymentPayload {
  application_fee: number;
  asurance_fee: number;
  delivery_fee: number;
  delivery_type: DeliveryType;
}

// History type
interface CheckoutWithProduct {
  id: string;
  userId: string;
  productId: string;
  transactionId: string;
  qty: number;
  pricePerItem: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

export interface TransactionWithCheckout {
  id: string;
  userId: string;
  totalPrice: number;
  deliveryFee: number;
  asuranceFee: number;
  applicationFee: number;
  grandTotalPrice: number;
  deliveryType: DeliveryType;
  createdAt: Date;
  updatedAt: Date;
  Checkout: CheckoutWithProduct[];
}
interface HistoryResponse extends BaseResponse {
  data: {
    data: TransactionWithCheckout[];
    total: number;
  };
}

interface HistoryAPIParams {
  page?: string | undefined;
}

// Define a service using a base URL and expected endpoints
export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({ baseUrl: "/api/transaction" }),
  tagTypes: ["checkout", "transaction"],
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: "/checkout",
        method: "POST",
        body
      }),
      invalidatesTags: ["checkout"],
    }),
    checkouts: builder.query<CheckoutsResponse, void>({
      query: () => ({
        url: "/checkout",
      }),
      providesTags: ["checkout"],
    }),
    payment: builder.mutation<PaymentResponse, PaymentPayload>({
      query: (body) => ({
        url: "/payment",
        method: "POST",
        body
      }),
    }),
    history: builder.query<HistoryResponse, HistoryAPIParams>({
      query: () => ({
        url: "/history",
      }),
      providesTags: ["transaction"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useCheckoutMutation,
  useCheckoutsQuery,
  usePaymentMutation,
  useHistoryQuery
} = transactionApi;