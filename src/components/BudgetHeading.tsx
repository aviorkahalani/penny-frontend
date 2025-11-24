import { Button, Heading, HStack, Stack } from '@chakra-ui/react'
import { capitalize } from '@/utils/helpers'

interface BudgetHeadingProps {
  name: string
  date: { year: number; month: number }
  onCreateCategory: () => void
}

export const BudgetHeading = ({
  name,
  date,
  onCreateCategory,
}: BudgetHeadingProps) => {
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
      <Button variant="subtle" onClick={onCreateCategory}>
        Add Category
      </Button>
    </HStack>
  )
}
