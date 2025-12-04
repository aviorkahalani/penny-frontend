import _ from 'lodash'
import { Heading, Stack, Text } from '@chakra-ui/react'

interface BudgetHeadingProps {
  date: { month: number; year: number }
  name: string
  notes?: string
}

export const BudgetHeading = ({ date, name, notes = '' }: BudgetHeadingProps) => {
  return (
    <Stack>
      <Heading size="xl">
        {date.month} / {date.year}
      </Heading>
      <Text color="fg.subtle" fontWeight="semibold">
        {_.capitalize(name)}
      </Text>
      <Text fontSize="sm">{notes}</Text>
    </Stack>
  )
}
