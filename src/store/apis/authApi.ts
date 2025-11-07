import type { User } from '@/interfaces'
import type { Credentials } from '@/interfaces'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsLoading, setUser } from '../slices/authSlice'

const BASE_URL = 'http://localhost:3030/api/auth'

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints(builder) {
    return {
      fetchMe: builder.query<User, void>({
        query: () => '/me',
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          dispatch(setIsLoading(true))
          try {
            const { data: user } = await queryFulfilled
            dispatch(setUser(user))
          } catch {
            dispatch(setUser(null))
          } finally {
            dispatch(setIsLoading(false))
          }
        },
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
