import { useCreateCategoryMutation, useFetchCategoriesByTypeQuery } from '@/store'
import { Table } from '@chakra-ui/react'
import { ErrorMessage } from '../global/ErrorMessage'
import { CategoryTableCaption } from './CategoryTableCaption'
import { CategoryTableSettings } from './CategoryTableSettings'
import { CategoryTableHeader } from './CategoryTableHeader'
import { CategoryTableBody } from './CategoryTableBody'
import type { Currency } from '@/interfaces'

interface CategoryTableProps {
  budgetId: string
  currency: Currency
  type: 'income' | 'expense' | 'saving'
}

export const CategoryTable = ({ budgetId, currency, type }: CategoryTableProps) => {
  const { data, error, isLoading } = useFetchCategoriesByTypeQuery({ budgetId, type })
  const [createCategory] = useCreateCategoryMutation()

  const handleCreateCategory = async () => {
    await createCategory({
      budgetId,
      name: 'Click to Edit',
      plannedAmount: 0,
      type,
    })
  }

  let content: React.ReactNode = null
  if (error) content = <ErrorMessage error="Could not load categories" />
  if (isLoading) content = <div>Loading...</div>

  if (data) {
    content = (
      <Table.Root variant="outline">
        <CategoryTableCaption type={type} handleCreateCategory={handleCreateCategory} />
        <CategoryTableSettings />
        <CategoryTableHeader />
        <CategoryTableBody type={type} budgetId={budgetId} currency={currency} />
      </Table.Root>
    )
  }

  return content
}
