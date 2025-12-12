import _ from 'lodash'
import { useNavigate } from 'react-router'
import { Flex, Icon, Table } from '@chakra-ui/react'
import { useDeleteTransactionMutation } from '@/store/apis/transaction'
import { TransactionTableRowActions } from './TransactionTableRowActions'
import { BiDollar, BiShekel } from 'react-icons/bi'
import type { Currency, Transaction } from '@/interfaces'

interface TransactionTableRowProps {
  budgetId: string
  transaction: Transaction
  currency: Currency
}

export const TransactionTableRow = ({
  budgetId,
  transaction,
  currency,
}: TransactionTableRowProps) => {
  const navigate = useNavigate()

  const [deleteTransaction] = useDeleteTransactionMutation()

  const handleUpdate = (transactionId: string) => {
    navigate(`/budget/${budgetId}/transaction/${transactionId}`)
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
      <Table.Cell>
        <Flex justifyContent="end" alignItems="center">
          {transaction.amount}
          <Icon size="sm" color="gray.500">
            {currency === 'NIS' ? <BiShekel /> : <BiDollar />}
          </Icon>
        </Flex>
      </Table.Cell>
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
