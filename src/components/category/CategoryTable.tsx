import _ from 'lodash'
import { useFetchCategoriesByTypeQuery } from '@/store'
import { ErrorMessage } from '../global/ErrorMessage'
import { Flex, Table, Text, Button } from '@chakra-ui/react'
import { CategoryTableList } from './CategoryTableList'
import type { Budget } from '@/interfaces'

interface CategoryTableProps {
  budget: Budget
  type: 'income' | 'expense' | 'saving'
}

export const CategoryTable = ({ budget, type }: CategoryTableProps) => {
  const {
    data: categories,
    error,
    isLoading,
  } = useFetchCategoriesByTypeQuery({ budgetId: budget._id, type })

  let content: React.ReactNode = null
  if (error) content = <ErrorMessage error="Could not load categories" />
  if (isLoading) content = <div>Loading...</div>

  if (categories) {
    const tableCaption = _.capitalize(type + 's')

    content = (
      <Table.Root variant="outline" interactive>
        <Table.Caption mb="4" captionSide="top" fontSize="md" textAlign="start">
          <Flex alignItems="center" justifyContent="space-between">
            <Text>{tableCaption}</Text>
            <Button size="xs" variant="outline">
              Add {_.capitalize(type)}
            </Button>
          </Flex>
        </Table.Caption>

        <Table.ColumnGroup>
          <Table.Column htmlWidth="80%" />
          <Table.Column />
          <Table.Column />
        </Table.ColumnGroup>

        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Amount</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <CategoryTableList type={type} categories={categories} currency={budget.currency} />
        </Table.Body>
      </Table.Root>
    )
  }

  return content
}
