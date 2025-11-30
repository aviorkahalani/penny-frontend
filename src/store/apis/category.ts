import type { Category } from '@/interfaces'
import { base } from './base'

interface createCategoryBody {
  budgetId: string
  type: 'income' | 'expense' | 'saving'
  name: string
  plannedAmount: number
}

export const category = base.injectEndpoints({
  endpoints: (build) => ({
    fetchCategories: build.query<Category[], string | undefined>({
      query: (budgetId) => ({
        url: '/category/' + budgetId,
      }),
      providesTags: (results) => [
        { type: 'Category', id: 'LIST' },
        ...(results?.map(({ _id }) => ({
          type: 'Category' as const,
          id: _id,
        })) || []),
      ],
    }),

    createCategory: build.mutation<Category, createCategoryBody>({
      query: (body) => ({
        url: '/category',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
})

export const { useFetchCategoriesQuery, useCreateCategoryMutation } = category
