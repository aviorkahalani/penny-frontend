import { Table } from '@chakra-ui/react'

export const CategoryTableHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>Name</Table.ColumnHeader>
        <Table.ColumnHeader textAlign="end">Amount</Table.ColumnHeader>
        <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
  )
}
