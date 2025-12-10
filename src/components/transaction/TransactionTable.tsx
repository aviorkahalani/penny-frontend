import { Table } from '@chakra-ui/react'
import { TransactionTableHedaer } from './TransactionTableHeader'
import { TransactionTableCaption } from './TransactionTableCaption'
import { TransactionTableSettings } from './TransactionTableSettings'
import { TransactionTableBody } from './TransactionTableBody'
import type { Transaction } from '@/interfaces'
import { useFetchBudgetByIdQuery } from '@/store'

interface TransactionTableProps {
  budgetId: string
  transactions: Transaction[]
}

export const TransactionTable = ({ budgetId, transactions }: TransactionTableProps) => {
  const { data: budget } = useFetchBudgetByIdQuery(budgetId)

  if (!budget) return

  return (
    <Table.Root variant="outline">
      <TransactionTableCaption budgetId={budgetId} />
      <TransactionTableSettings />
      <TransactionTableHedaer />
      <TransactionTableBody
        budgetId={budgetId}
        transactions={transactions}
        currency={budget.currency}
      />
    </Table.Root>
  )
}
