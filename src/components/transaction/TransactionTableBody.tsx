import { Table, For } from '@chakra-ui/react'
import { TransactionTableFallback } from './TransactionTableFallback'
import { TransactionTableRow } from './TransactionTableRow'
import type { Transaction } from '@/interfaces'

interface TransactionTableBodyProps {
  budgetId: string
  transactions: Transaction[]
}

export const TransactionTableBody = ({
  budgetId,
  transactions,
}: TransactionTableBodyProps) => {
  return (
    <Table.Body>
      <For each={transactions} fallback={<TransactionTableFallback />}>
        {(transaction) => (
          <TransactionTableRow
            key={transaction._id}
            budgetId={budgetId}
            transaction={transaction}
          />
        )}
      </For>
    </Table.Body>
  )
}
