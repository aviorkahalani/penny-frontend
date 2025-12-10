import { useFetchTransactionsQuery } from '@/store/apis/transaction'
import { Loader } from '@chakra-ui/react'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'react-router'
import { InfoMessage } from '@/components/global/InfoMessage'
import { ErrorMessage } from '@/components/global/ErrorMessage'
import { TransactionTable } from '@/components/transaction/TransactionTable'

export const Transaction = () => {
  const { budgetId } = useParams<{ budgetId: string }>()
  const {
    data: transactions,
    error,
    isLoading,
  } = useFetchTransactionsQuery(budgetId ?? skipToken)

  if (!budgetId) return <InfoMessage text="Please choose a budget to start... " />
  if (error) return <ErrorMessage error="could not display transactions..." />
  if (isLoading) return <Loader />
  if (transactions && budgetId)
    return <TransactionTable budgetId={budgetId} transactions={transactions} />

  return null
}
