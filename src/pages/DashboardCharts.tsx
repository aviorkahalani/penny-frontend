import { ErrorMessage } from '@/components/global/ErrorMessage'
import { InfoMessage } from '@/components/global/InfoMessage'
import { useFetchBudgetByIdQuery } from '@/store'
import { useFetchDashboardDataQuery } from '@/store/apis/dashboard'
import {
  Box,
  Button,
  Card,
  Flex,
  For,
  Heading,
  HStack,
  Loader,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { BiShekel, BiDollar } from 'react-icons/bi'

import { skipToken } from '@reduxjs/toolkit/query'
import _ from 'lodash'
import { Link, useParams } from 'react-router'

export const DashboardCharts = () => {
  const { budgetId } = useParams<{ budgetId: string }>()
  const { data: budget } = useFetchBudgetByIdQuery(budgetId ?? skipToken)
  const { data, error, isLoading } = useFetchDashboardDataQuery(budgetId ?? skipToken)

  if (!budgetId) return <InfoMessage text="Please choose a budget to start... " />
  if (error) return <ErrorMessage error="could not display dashboard..." />
  if (isLoading) return <Loader />
  if (data && budget) {
    const cards = Object.entries(data.summary)
    const currencyIcon = { NIS: <BiShekel />, USD: <BiDollar /> }

    return (
      <Stack gap="4">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading>Overview</Heading>
          <Button alignSelf="end" asChild size="xs" variant="surface">
            <Link to={`/budget/${budget._id}`}>Go to budget</Link>
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="1">
          <For each={cards}>
            {([label, amount]) => (
              <Card.Root variant="subtle">
                <Card.Header key={label}>
                  <Text fontWeight="bold" fontSize="xs" color="fg.info">
                    {_.capitalize(label)}
                  </Text>
                </Card.Header>
                <Card.Body>
                  <Text
                    fontSize="2xl"
                    fontFamily="mono"
                    display="flex"
                    alignItems="center"
                  >
                    {amount}{' '}
                    <Box as="span" color="fg.subtle">
                      {currencyIcon[budget.currency]}
                    </Box>
                  </Text>
                </Card.Body>
              </Card.Root>
            )}
          </For>
        </SimpleGrid>

        <For each={data.spentByCategory}>
          {(c) => (
            <>
              <Progress.Root
                maxW="sm"
                value={Math.min(c.spent, c.plannedAmount)}
                max={c.plannedAmount}
              >
                <HStack gap="5">
                  <Progress.Label>{_.capitalize(c.name)}</Progress.Label>

                  <Progress.Track flex="1">
                    <Progress.Range
                      bg={c.spent > c.plannedAmount ? 'red.500' : 'green.400'}
                    />
                  </Progress.Track>

                  <Progress.ValueText
                    color={c.spent > c.plannedAmount ? 'red.500' : 'gray.600'}
                  >
                    {c.spent} / {c.plannedAmount}
                  </Progress.ValueText>
                </HStack>
              </Progress.Root>
            </>
          )}
        </For>
      </Stack>
    )
  }

  return null
}
