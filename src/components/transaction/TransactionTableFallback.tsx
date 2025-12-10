import { Code, Table } from '@chakra-ui/react'

export const TransactionTableFallback = () => {
  return (
    <Table.Row>
      <Table.Cell colSpan={4} textAlign="center" py="6" color="gray.500">
        No transactions yet. Click <Code>Add Transaction</Code> to get started.
      </Table.Cell>
    </Table.Row>
  )
}
