import { Table } from '@chakra-ui/react'

export const TransactionTableSettings = () => {
  return (
    <Table.ColumnGroup>
      <Table.Column htmlWidth="70%" />
      <Table.Column htmlWidth="10%" />
      <Table.Column htmlWidth="10%" />
      <Table.Column htmlWidth="10%" />
    </Table.ColumnGroup>
  )
}
