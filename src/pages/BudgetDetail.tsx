import { useParams } from 'react-router'
import { useFetchBudgetByIdQuery, useFetchCategoriesQuery } from '@/store'
import { Stack, Separator } from '@chakra-ui/react'
import { BudgetDetailSkeleton } from '@/components/BudgetDetailSkeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { BudgetHeading } from '@/components/BudgetHeading'
import { BudgetCategoryTable } from '@/components/BudgetCategoryTable'

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

  let content: React.ReactNode = null
  if (error) {
    return (content = <ErrorMessage error={error} />)
  } else if (isLoading) {
    return (content = <BudgetDetailSkeleton />)
  } else if (budget) {
    content = (
      <Stack as="section" gap="4">
        <BudgetHeading
          budgetId={budget._id}
          name={budget.name}
          date={budget.date}
        />
        <Separator />
        <Stack gap="10">
          <BudgetCategoryTable
            title="incomes"
            categories={
              categories ? categories.filter((c) => c.type === 'income') : []
            }
            currency={budget.currency}
          />
          <BudgetCategoryTable
            title="expenses"
            categories={
              categories ? categories.filter((c) => c.type === 'expense') : []
            }
            currency={budget.currency}
          />
          <BudgetCategoryTable
            title="savings"
            categories={
              categories ? categories.filter((c) => c.type === 'saving') : []
            }
            currency={budget.currency}
          />
        </Stack>
      </Stack>
    )
  }

  return content
}
