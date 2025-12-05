import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesByTypeQuery,
  useUpdateCategoryMutation,
} from '@/store'
import { ErrorMessage } from '../global/ErrorMessage'
import { Table } from '@chakra-ui/react'
import { CategoryTableList } from './CategoryTableList'
import { CategoryTableColumnsSettings } from './CategoryTableColumnsSettings'
import { CategoryTableCaption } from './CategoryTableCaption'
import { CategoryTableHeader } from './CategoryTableHeader'
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
      name: 'Click to Edit',
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
    content = (
      <Table.Root variant="outline">
        <CategoryTableCaption type={type} handleCreateCategory={handleCreateCategory} />
        <CategoryTableColumnsSettings />
        <CategoryTableHeader />

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
