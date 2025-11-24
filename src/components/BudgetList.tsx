import { SimpleGrid } from '@chakra-ui/react'
import { DataMissing } from '@/components/DataMissing'
import { BudgetListItem } from '@/components/BudgetListItem'
import type { Budget } from '@/interfaces'
import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface BudgetListProps {
  budgets?: Budget[]
  error?: FetchBaseQueryError | SerializedError
  loading: boolean
}

export const BudgetList = ({ budgets, error, loading }: BudgetListProps) => {
  if (error) return <DataMissing message="No budgets yet..." />

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="1">
      {budgets?.map((budget) => (
        <BudgetListItem key={budget._id} budget={budget} loading={loading} />
      ))}
    </SimpleGrid>
  )
}
