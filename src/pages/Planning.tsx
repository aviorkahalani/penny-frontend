import { Link } from 'react-router'
import { useFetchBudgetsQuery } from '@/store'
import { Box, Button, Separator } from '@chakra-ui/react'
import BudgetList from '@/components/BudgetList'

export default function Planning() {
  const { data: budgets, error, isLoading } = useFetchBudgetsQuery()

  return (
    <Box as="section" spaceY="2">
      <Button asChild variant="subtle">
        <Link to="/edit">Create New Budget</Link>
      </Button>
      <Separator />
      <BudgetList budgets={budgets} error={error} loading={isLoading} />
    </Box>
  )
}
