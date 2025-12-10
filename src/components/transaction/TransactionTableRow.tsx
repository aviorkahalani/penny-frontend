import _ from 'lodash'
import { Table } from '@chakra-ui/react'
import { useDeleteTransactionMutation } from '@/store/apis/transaction'
import { TransactionTableRowActions } from './TransactionTableRowActions'
import type { Transaction } from '@/interfaces'

interface TransactionTableRowProps {
  budgetId: string
  transaction: Transaction
}

export const TransactionTableRow = ({
  budgetId,
  transaction,
}: TransactionTableRowProps) => {
  const [deleteTransaction] = useDeleteTransactionMutation()

  const handleUpdate = (transactionId: string) => {
    console.log({ transactionId })
  }

  const handleDelete = (transactionId: string) => {
    deleteTransaction({ budgetId, transactionId })
  }

  const typeColor = (t: string) => {
    const map: { [key: string]: string } = {
      income: 'fg.success',
      expense: 'fg.error',
      saving: 'fg.info',
    }
    return map[t]
  }

  return (
    <Table.Row>
      <Table.Cell>{transaction.description}</Table.Cell>
      <Table.Cell color={typeColor(transaction.type)}>
        {_.capitalize(transaction.type)}
      </Table.Cell>
      <Table.Cell>{transaction.amount}</Table.Cell>
      <Table.Cell>
        <TransactionTableRowActions
          transactionId={transaction._id}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </Table.Cell>
    </Table.Row>
  )
}
