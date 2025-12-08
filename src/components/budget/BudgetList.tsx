import { For, SimpleGrid } from '@chakra-ui/react'
import { BudgetPreview } from './BudgetPreview'
import type { Budget } from '@/interfaces'

interface BudgetListProps {
  budgets: Budget[]
}

export const BudgetList = ({ budgets }: BudgetListProps) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="1">
      <For each={budgets}>
        {(budget) => <BudgetPreview key={budget._id} budget={budget} />}
      </For>
    </SimpleGrid>
  )
}
