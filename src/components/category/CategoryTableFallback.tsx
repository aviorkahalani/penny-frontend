import _ from 'lodash'
import { Code, Table } from '@chakra-ui/react'
import type { Type } from '@/interfaces'

interface CategoryTableFallbackProps {
  type: Type
}

export const CategoryTableFallback = ({ type }: CategoryTableFallbackProps) => {
  return (
    <Table.Row>
      <Table.Cell colSpan={3} textAlign="center" py="6" color="gray.500">
        No {type}s yet. Click <Code>Add {_.capitalize(type)}</Code> to get started.
      </Table.Cell>
    </Table.Row>
  )
}
