import React, { useEffect, useState } from 'react'
import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Separator,
  createListCollection,
} from '@chakra-ui/react'
import { SelectField } from '@/components/form/SelectField'
import { Outlet, useNavigate, useParams } from 'react-router'
import { useFetchBudgetsQuery } from '@/store'
import { ErrorMessage } from '@/components/global/ErrorMessage'
import { Loader } from '@/components/global/Loader'
import { InfoMessage } from '@/components/global/InfoMessage'

export const Tracking = () => {
  const { budgetId: bid } = useParams()
  const navigate = useNavigate()
  const { data: budgets, error, isLoading } = useFetchBudgetsQuery()
  const [budgetId, setBudgetId] = useState<string>('')

  useEffect(() => {
    if (bid && !budgetId) {
      setBudgetId(bid)
    }

    navigate('' + budgetId)
  }, [budgetId])

  let content: React.ReactNode = null
  if (error) content = <ErrorMessage error="could not display transactions..." />
  if (isLoading) content = <Loader />
  if (!budgets) content = <InfoMessage text="There are no budgets" />

  if (budgets) {
    const collection = createListCollection({
      items: budgets!.map((b) => ({
        label: `${b.date.month} / ${b.date.year} - ${b.name}`,
        value: b._id,
      })),
    })

    content = (
      <SelectField
        collection={collection}
        label="Select budget"
        value={budgetId}
        disabled={isLoading || !budgets.length}
        setValue={setBudgetId}
      />
    )
  }

  return (
    <Stack as="section" gap="4">
      <Flex
        gap="4"
        flexDir={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'start', md: 'start' }}
        justifyContent="space-between"
      >
        <Box>
          <Heading size="lg">Track Your Spending</Heading>
          <Text fontWeight="light">
            Add your daily spending and keep your budgets up to date.
          </Text>
        </Box>

        {content}
      </Flex>
      <Separator />
      <Outlet />
    </Stack>
  )
}
