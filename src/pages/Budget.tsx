import _ from 'lodash'
import { useParams } from 'react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import { useFetchBudgetByIdQuery } from '@/store'
import { Stack, Separator, Heading, Text } from '@chakra-ui/react'
import { ErrorMessage } from '@/components/global/ErrorMessage'
import { BudgetSkeleton } from '@/components/budget/BudgetSkeleton'

export const Budget = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useFetchBudgetByIdQuery(id ?? skipToken)

  if (error) return <ErrorMessage error="Could not show budget..." />
  if (isLoading) return <BudgetSkeleton />
  if (!data) return null

  return (
    <Stack as="section" gap="4">
      <Stack>
        <Heading size="xl">
          {data.date.month} / {data.date.year}
        </Heading>
        <Text color="fg.subtle" fontWeight="semibold">
          {_.capitalize(data.name)}
        </Text>
      </Stack>

      <Separator />
      {/* <Stack gap="10">{tables}</Stack> */}
    </Stack>
  )
}
