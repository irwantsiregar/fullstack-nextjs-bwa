import BaseResponse from "@/types/response";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface ProductsResponse extends BaseResponse {
  data: Product[];
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/products" }),
    tagTypes: ["products"],
    endpoints: (builder) => ({
      getAllProducts: builder.query<ProductsResponse, any>({
        query: () => ({
          url: "/",
        }),
      }),
    }),
  })

export const { useGetAllProductsQuery } = productsApi;