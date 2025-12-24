import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.PROD ? '/api/' : '//localhost:3030/api/'

export const base = createApi({
  reducerPath: 'api',
  tagTypes: ['Auth', 'Budget', 'Category', 'Transaction', 'Dashboard'],

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    validateStatus: (response) => {
      if (response.status === 401) return true
      return response.status >= 200 && response.status < 300
    },
  }),

  endpoints: (build) => ({
    fetchHealth: build.query<string, void>({
      query: () => '',
    }),
  }),
})
