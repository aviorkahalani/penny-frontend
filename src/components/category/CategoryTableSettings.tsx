import { Table } from '@chakra-ui/react'

export const CategoryTableSettings = () => {
  return (
    <Table.ColumnGroup>
      <Table.Column htmlWidth="70%" />
      <Table.Column htmlWidth="20%" />
      <Table.Column />
    </Table.ColumnGroup>
  )
}
