import { Heading, HStack, Stack } from '@chakra-ui/react'
import { capitalize } from '@/utils/helpers'
import { CategoryCreateDialog } from './CategoryCreateDialog'

interface BudgetHeadingProps {
  budgetId: string
  name: string
  date: { year: number; month: number }
}

export const BudgetHeading = ({ budgetId, name, date }: BudgetHeadingProps) => {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Stack>
        <Heading size="xl">
          {date.month} / {date.year}
        </Heading>
        <Heading size="sm" color="fg.subtle">
          {capitalize(name)}
        </Heading>
      </Stack>
      <CategoryCreateDialog budgetId={budgetId} />
    </HStack>
  )
}
