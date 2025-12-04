import _ from 'lodash'
import { Flex, FormatNumber, Table, Text } from '@chakra-ui/react'
import type { Category, Currency, Type } from '@/interfaces'

interface CategoryTableListProps {
  type: Type
  categories: Category[]
  currency: Currency
}

export const CategoryTableList = ({ type, categories, currency }: CategoryTableListProps) => {
  if (!categories.length)
    return (
      <Table.Cell colSpan={3} textAlign="center" py="6" color="gray.500">
        No {type}s yet. Click “Add {_.capitalize(type)}” to get started.
      </Table.Cell>
    )

  const renderedCategories = categories.map((category) => (
    <Table.Row key={category._id}>
      <Table.Cell>{_.capitalize(category.name)}</Table.Cell>
      <Table.Cell>
        <Flex alignItems="center" gap="1">
          <Text>
            <FormatNumber value={category.plannedAmount} style="currency" currency={currency} />
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell>Delete</Table.Cell>
    </Table.Row>
  ))

  return renderedCategories
}
