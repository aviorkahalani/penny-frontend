import _ from 'lodash'
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesByTypeQuery,
  useUpdateCategoryMutation,
} from '@/store'
import { ErrorMessage } from '../global/ErrorMessage'
import { Flex, Table, Text, Button } from '@chakra-ui/react'
import { CategoryTableList } from './CategoryTableList'
import type { Budget, Category } from '@/interfaces'

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
  const [createCategory] = useCreateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()

  const handleCreateCategory = async () => {
    await createCategory({
      budgetId: budget._id,
      name: 'new category',
      plannedAmount: 0,
      type,
    })
  }

  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategory(categoryId)
  }

  const handleUpdateCategory = async (categoryId: string, body: Partial<Category>) => {
    console.log('updating...')

    await updateCategory({ params: { categoryId }, body: { budgetId: budget._id, ...body } })
  }

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
            <Button onClick={handleCreateCategory} size="xs" variant="outline">
              Add {_.capitalize(type)}
            </Button>
          </Flex>
        </Table.Caption>

        <Table.ColumnGroup>
          <Table.Column htmlWidth="60%" />
          <Table.Column />
          <Table.Column />
        </Table.ColumnGroup>

        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Amount</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <CategoryTableList
            type={type}
            categories={categories}
            currency={budget.currency}
            handleDelete={handleDeleteCategory}
            handleUpdate={handleUpdateCategory}
          />
        </Table.Body>
      </Table.Root>
    )
  }

  return content
}
