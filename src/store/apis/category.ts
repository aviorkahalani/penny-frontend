import { base } from './base'
import type { Category, Type } from '@/interfaces'

interface createCategoryBody {
  budgetId: string
  type: 'income' | 'expense' | 'saving'
  name: string
  plannedAmount: number
}

interface updateCategoryBody {
  params: {
    categoryId: string
  }
  body: {
    budgetId: string
    type?: 'income' | 'expense' | 'saving'
    name?: string
    plannedAmount?: number
  }
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

    fetchCategoriesByType: build.query<Category[], { budgetId: string; type: Type }>({
      query: ({ budgetId, type }) => ({
        url: `/category/${budgetId}?type=${type}`,
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

    updateCategory: build.mutation<Category, updateCategoryBody>({
      query: (data) => ({
        url: 'category/' + data.params.categoryId,
        method: 'PUT',
        body: data.body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    deleteCategory: build.mutation<Category, string>({
      query: (categoryId) => ({
        url: '/category/' + categoryId,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
})

export const {
  useFetchCategoriesQuery,
  useFetchCategoriesByTypeQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = category
