import { useParams } from 'react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import { useFetchBudgetByIdQuery } from '@/store'
import { Stack, Flex, Separator } from '@chakra-ui/react'
import { ErrorMessage } from '@/components/global/ErrorMessage'
import { BudgetSkeleton } from '@/components/budget/BudgetSkeleton'
import { BudgetActions } from '@/components/budget/BudgetActions'
import { CategoryTable } from '@/components/category/CategoryTable'
import { BudgetHeading } from '@/components/budget/BudgetHeading'

export const Budget = () => {
  const { id } = useParams()
  const { data: budget, error, isLoading } = useFetchBudgetByIdQuery(id ?? skipToken)

  if (error) return <ErrorMessage error="Could not show budget..." />
  if (isLoading) return <BudgetSkeleton />
  if (!budget) return null

  return (
    <Stack gap="4">
      <Flex as="section" justifyContent="space-between" alignItems="end" gap="4">
        <BudgetHeading date={budget.date} name={budget.name} notes={budget.notes} />
        <BudgetActions budgetId={budget._id} />
      </Flex>

      <Separator />

      <Stack gap="8">
        <CategoryTable budget={budget} type="income" />
        <CategoryTable budget={budget} type="expense" />
        <CategoryTable budget={budget} type="saving" />
      </Stack>
    </Stack>
  )
}
