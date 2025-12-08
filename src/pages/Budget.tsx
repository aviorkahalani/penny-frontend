import { useParams } from 'react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import { useFetchBudgetByIdQuery } from '@/store'
import { Stack, Flex, Separator, For } from '@chakra-ui/react'
import { ErrorMessage } from '@/components/global/ErrorMessage'
import { BudgetSkeleton } from '@/components/budget/BudgetSkeleton'
import { BudgetActions } from '@/components/budget/BudgetActions'
import { CategoryTable } from '@/components/category/CategoryTable'
import { BudgetHeading } from '@/components/budget/BudgetHeading'
import type { Type } from '@/interfaces'

export const Budget = () => {
  const { id } = useParams()
  const { data: budget, error, isLoading } = useFetchBudgetByIdQuery(id ?? skipToken)

  if (error) return <ErrorMessage error="Could not show budget..." />
  if (isLoading) return <BudgetSkeleton />
  if (!budget) return null

  const types: Type[] = ['income', 'expense', 'saving']

  return (
    <Stack gap="4">
      <Flex as="section" justifyContent="space-between" alignItems="end" gap="4">
        <BudgetHeading date={budget.date} name={budget.name} notes={budget.notes} />
        <BudgetActions budgetId={budget._id} />
      </Flex>

      <Separator />

      <Stack gap="8">
        <For each={types}>
          {(type) => (
            <CategoryTable
              key={type}
              budgetId={budget._id}
              currency={budget.currency}
              type={type}
            />
          )}
        </For>
      </Stack>
    </Stack>
  )
}
