import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User, Credentials } from '@/interfaces'

export const auth = createApi({
  reducerPath: 'auth',
  tagTypes: ['Auth'],

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/api/auth',
    credentials: 'include',
    validateStatus: (response) => {
      if (response.status === 401) return true
      return response.status >= 200 && response.status < 300
    },
  }),

  endpoints(build) {
    return {
      fetchMe: build.query<User | null, void>({
        query: () => ({ url: '/me' }),
        transformResponse: (response, meta) => {
          return meta?.response?.status === 401 ? null : (response as User)
        },
        providesTags: ['Auth'],
      }),

      register: build.mutation<User, Credentials>({
        query: (credentials) => ({
          method: 'POST',
          url: '/register',
          body: credentials,
        }),
        invalidatesTags: ['Auth'],
      }),

      login: build.mutation<User, Omit<Credentials, 'name'>>({
        query: (credentials) => ({
          method: 'POST',
          url: '/login',
          body: credentials,
        }),
        invalidatesTags: ['Auth'],
      }),

      logout: build.mutation<User, void>({
        query: () => ({ method: 'POST', url: '/logout' }),
        invalidatesTags: ['Auth'],
      }),
    }
  },
})

export const {
  useFetchMeQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = auth
