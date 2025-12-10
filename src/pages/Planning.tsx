import { Link } from 'react-router'
import { useFetchBudgetsQuery } from '@/store'
import { Button, Separator, Stack } from '@chakra-ui/react'
import { BudgetList } from '@/components/budget/BudgetList'
import { ErrorMessage } from '@/components/global/ErrorMessage'
import { InfoMessage } from '@/components/global/InfoMessage'
import { BudgetListSkeleton } from '@/components/budget/BudgetListSkeleton'

export const Planning = () => {
  const { data: budgets, error, isLoading } = useFetchBudgetsQuery()

  let content: React.ReactNode = null
  if (error) content = <ErrorMessage error="error while fetching budgets..." />
  if (isLoading) content = <BudgetListSkeleton />
  if (!budgets?.length) content = <InfoMessage text="no budgets yet..." />
  else content = <BudgetList budgets={budgets} />

  return (
    <Stack as="section" gap="4">
      <Button asChild variant="subtle" alignSelf="start">
        <Link to="/edit">Create New Budget</Link>
      </Button>
      <Separator />

      {content}
    </Stack>
  )
}
