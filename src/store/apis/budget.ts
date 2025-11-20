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

    fetchBudgetById: build.query<Budget, string>({
      query: (id) => 'budget/' + id,
      providesTags: (result) => [{ type: 'Budget', id: result?._id }],
    }),

    createBudget: build.mutation<Budget, Partial<Budget>>({
      query: (budget) => ({
        url: 'budget',
        method: 'POST',
        body: budget,
      }),
      invalidatesTags: [{ type: 'Budget', id: 'LIST' }],
    }),

    deleteBudget: build.mutation<Budget, string>({
      query: (id: string) => ({
        url: 'budget/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Budget', id: 'LIST' }],
    }),
  }),
})

export const {
  useFetchBudgetsQuery,
  useFetchBudgetByIdQuery,
  useCreateBudgetMutation,
  useDeleteBudgetMutation,
} = budget
