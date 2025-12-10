import { Table } from '@chakra-ui/react'
import { TransactionTableHedaer } from './TransactionTableHeader'
import { TransactionTableCaption } from './TransactionTableCaption'
import { TransactionTableSettings } from './TransactionTableSettings'
import { TransactionTableBody } from './TransactionTableBody'
import type { Transaction } from '@/interfaces'
import { useCreateTransactionMutation } from '@/store/apis/transaction'

interface TransactionTableProps {
  budgetId: string
  transactions: Transaction[]
}

export const TransactionTable = ({ budgetId, transactions }: TransactionTableProps) => {
  const [createTransaction] = useCreateTransactionMutation()

  const handleCreate = async () => {
    await createTransaction({
      params: { budgetId },
      body: {
        description: 'transaction...',
        amount: 1000,
        date: new Date(),
        type: 'income',
      },
    }).unwrap()
  }

  return (
    <Table.Root variant="outline">
      <TransactionTableCaption handleCreate={handleCreate} />
      <TransactionTableSettings />
      <TransactionTableHedaer />
      <TransactionTableBody budgetId={budgetId} transactions={transactions} />
    </Table.Root>
  )
}
