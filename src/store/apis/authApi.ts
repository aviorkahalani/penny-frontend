import type { User } from '@/interfaces'
import type { Credentials } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:3030/api/auth'

export const authApi = createApi({
  reducerPath: 'auth',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints(builder) {
    return {
      fetchMe: builder.query<User, void>({
        query: () => ({
          url: '/me',
          method: 'GET',
        }),
        providesTags: ['auth'],
      }),
      register: builder.mutation({
        query: (credentials: Credentials) => ({
          url: '/register',
          method: 'POST',
          body: credentials,
        }),
        invalidatesTags: ['auth'],
      }),
      login: builder.mutation({
        query: (credentials: Omit<Credentials, 'name'>) => ({
          url: '/login',
          method: 'POST',
          body: credentials,
        }),
        invalidatesTags: ['auth'],
      }),
      logout: builder.mutation<void, void>({
        query: () => ({
          url: '/logout',
          method: 'POST',
        }),
        invalidatesTags: ['auth'],
      }),
    }
  },
})

export const {
  useFetchMeQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi
