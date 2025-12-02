import { useParams } from 'react-router'
import {
  useFetchBudgetByIdQuery,
  useFetchCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '@/store'
import { Stack, Separator } from '@chakra-ui/react'
import { BudgetDetailSkeleton } from '@/components/BudgetDetailSkeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { BudgetHeading } from '@/components/BudgetHeading'
import { BudgetCategoryTable } from '@/components/BudgetCategoryTable'
import type { Category } from '@/interfaces'

export const BudgetDetail = () => {
  const { id } = useParams<{ id: string }>()
  const {
    data: budget,
    error,
    isLoading,
  } = useFetchBudgetByIdQuery(id as string)
  const { data: categories } = useFetchCategoriesQuery(budget?._id, {
    skip: !budget?._id,
  })

  const [deleteCategory] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()

  const handleDelete = (id: string) => {
    deleteCategory(id)
  }

  const handleUpdate = (id: string, body: Partial<Category>) => {
    updateCategory({
      params: { categoryId: id },
      body: {
        budgetId: budget!._id,
        ...body,
      },
    })
  }

  let content: React.ReactNode = null
  if (error) {
    return (content = <ErrorMessage error={error} />)
  } else if (isLoading) {
    return (content = <BudgetDetailSkeleton />)
  } else if (budget) {
    const incomes = categories?.filter((c) => c.type === 'income') || []
    const expenses = categories?.filter((c) => c.type === 'expense') || []
    const savings = categories?.filter((c) => c.type === 'saving') || []

    content = (
      <Stack as="section" gap="4">
        <BudgetHeading
          budgetId={budget._id}
          name={budget.name}
          date={budget.date}
        />
        <Separator />
        <Stack gap="10">
          {incomes.length > 0 && (
            <BudgetCategoryTable
              title="incomes"
              categories={incomes}
              currency={budget.currency}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )}

          {expenses.length > 0 && (
            <BudgetCategoryTable
              title="expenses"
              categories={
                categories ? categories.filter((c) => c.type === 'expense') : []
              }
              currency={budget.currency}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )}

          {savings.length > 0 && (
            <BudgetCategoryTable
              title="savings"
              categories={
                categories ? categories.filter((c) => c.type === 'saving') : []
              }
              currency={budget.currency}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )}
        </Stack>
      </Stack>
    )
  }

  return content
}
