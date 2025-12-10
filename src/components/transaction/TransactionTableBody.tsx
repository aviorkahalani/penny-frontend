import { Table, For } from '@chakra-ui/react'
import { TransactionTableFallback } from './TransactionTableFallback'
import { TransactionTableRow } from './TransactionTableRow'
import type { Currency, Transaction } from '@/interfaces'

interface TransactionTableBodyProps {
  budgetId: string
  transactions: Transaction[]
  currency: Currency
}

export const TransactionTableBody = ({
  budgetId,
  transactions,
  currency,
}: TransactionTableBodyProps) => {
  return (
    <Table.Body>
      <For each={transactions} fallback={<TransactionTableFallback />}>
        {(transaction) => (
          <TransactionTableRow
            key={transaction._id}
            budgetId={budgetId}
            transaction={transaction}
            currency={currency}
          />
        )}
      </For>
    </Table.Body>
  )
}
