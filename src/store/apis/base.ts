import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const base = createApi({
  reducerPath: 'api',
  tagTypes: ['Auth', 'Budget', 'Category', 'Transaction'],

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/api/',
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
