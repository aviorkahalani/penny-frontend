import { base } from './base'
import type { Budget } from '@/interfaces'

export const budget = base.injectEndpoints({
  endpoints: (build) => ({
    fetchBudgets: build.query<Budget[], void>({
      query: () => ({
        url: '/budget',
      }),
      providesTags: (results) => [
        { type: 'Budget', id: 'LIST' },
        ...(results?.map(({ _id }) => ({
          type: 'Budget' as const,
          id: _id,
        })) || []),
      ],
    }),
  }),
})

export const { useFetchBudgetsQuery } = budget
