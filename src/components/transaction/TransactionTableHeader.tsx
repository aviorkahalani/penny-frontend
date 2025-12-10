import { Table } from '@chakra-ui/react'

export const TransactionTableHedaer = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>Description</Table.ColumnHeader>
        <Table.ColumnHeader>Type</Table.ColumnHeader>
        <Table.ColumnHeader>Amount</Table.ColumnHeader>
        <Table.ColumnHeader>Actions</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
  )
}
