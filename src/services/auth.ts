import BaseResponse from '@/types/response'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
// import type { Pokemon } from './types'

interface AuthResponse extends BaseResponse {
    data: UserAuthForm;
}

type UserAuthForm = {
    name: string;
    email: string;
    password: string;
    confirm_password: string | undefined;
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, UserAuthForm>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation } = authApi