import { Link } from 'react-router'
import { useFetchBudgetsQuery } from '@/store'
import { Button, Separator, Stack } from '@chakra-ui/react'
import { BudgetList } from '@/components/budget/BudgetList'
import { ErrorMessage } from '@/components/global/ErrorMessage'
import { BudgetListSkeleton } from '@/components/budget/BudgetListSkeleton'

export const Planning = () => {
  const { data: budgets, error, isLoading } = useFetchBudgetsQuery()

  let content: React.ReactNode = null
  if (error) {
    content = <ErrorMessage error="Could not display budgets..." />
  } else if (isLoading) {
    content = <BudgetListSkeleton />
  } else if (budgets) {
    content = (
      <Stack as="section" gap="2">
        <Button alignSelf="start" asChild variant="subtle">
          <Link to="/edit">Create New Budget</Link>
        </Button>
        <Separator />
        <BudgetList budgets={budgets} />
      </Stack>
    )
  }

  return content
}
