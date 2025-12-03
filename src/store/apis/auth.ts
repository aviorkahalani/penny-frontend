import { base } from './base'
import type { User, Credentials } from '@/interfaces'

export const auth = base.injectEndpoints({
  endpoints: (build) => ({
    fetchMe: build.query<User | null, void>({
      query: () => 'auth/me',
      transformResponse: (response, meta) => {
        return meta?.response?.status === 401 ? null : (response as User)
      },
      providesTags: ['Auth'],
    }),

    register: build.mutation<User, Credentials>({
      query: (credentials) => ({
        method: 'POST',
        url: 'auth/register',
        body: credentials,
      }),
      invalidatesTags: ['Auth', 'Budget', 'Category'],
    }),

    login: build.mutation<User, Omit<Credentials, 'name'>>({
      query: (credentials) => ({
        method: 'POST',
        url: 'auth/login',
        body: credentials,
      }),
      invalidatesTags: ['Auth', 'Budget', 'Category'],
    }),

    logout: build.mutation<User, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
})

export const { useFetchMeQuery, useRegisterMutation, useLoginMutation, useLogoutMutation } = auth
