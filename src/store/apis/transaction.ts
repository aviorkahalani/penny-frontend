import type { Transaction } from '@/interfaces'
import { base } from './base'

interface FetchTransactionByIdDto {
  budgetId: string
  transactionId: string
}

interface CreateTransactionDto {
  params: { budgetId: string }
  body: Partial<Transaction>
}

interface UpdateTransactionDto {
  params: { budgetId: string; transactionId: string }
  body: Partial<Transaction>
}

interface DeleteTransactionDto {
  budgetId: string
  transactionId: string
}

export const transaction = base.injectEndpoints({
  endpoints: (build) => ({
    fetchTransactions: build.query<Transaction[], string>({
      query: (budgetId) => ({ url: '/transaction/' + budgetId }),
      providesTags: (results) => [
        { type: 'Transaction', id: 'LIST' },
        ...(results?.map(({ _id }) => ({ type: 'Transaction' as const, id: _id })) || []),
      ],
    }),

    fetchTransactionById: build.query<Transaction, FetchTransactionByIdDto>({
      query: ({ budgetId, transactionId }) => ({
        url: `/transaction/${budgetId}/${transactionId}`,
      }),
      providesTags: (result) => [{ type: 'Transaction', id: result?._id }],
    }),

    createTransaction: build.mutation<Transaction, CreateTransactionDto>({
      query: ({ params, body }) => ({
        url: '/transaction/' + params.budgetId,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),

    updateTransaction: build.mutation<Transaction, UpdateTransactionDto>({
      query: ({ params, body }) => ({
        url: `/transaction/${params.budgetId}/${params.transactionId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),

    deleteTransaction: build.mutation<void, DeleteTransactionDto>({
      query: ({ budgetId, transactionId }) => ({
        url: `/transaction/${budgetId}/${transactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
  }),
})

export const {
  useFetchTransactionsQuery,
  useFetchTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transaction
