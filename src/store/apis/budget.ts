import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Budget } from '@/interfaces'

export const budget = createApi({
  reducerPath: 'budget',
  tagTypes: ['Budget'],

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/api/budget',
    credentials: 'include',
  }),

  endpoints(build) {
    return {
      fetchBudgets: build.query<Budget[], void>({
        query: () => ({ url: '' }),
        providesTags: (results) => [
          { type: 'Budget', id: 'LIST' },
          ...(results?.map(({ _id }) => ({
            type: 'Budget' as const,
            id: _id,
          })) || []),
        ],
      }),
    }
  },
})

export const { useFetchBudgetsQuery } = budget
