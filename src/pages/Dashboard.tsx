import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import { useFetchBudgetsQuery } from '@/store'
import { ErrorMessage } from '@/components/global/ErrorMessage'
import {
  Box,
  createListCollection,
  Flex,
  Heading,
  Loader,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { InfoMessage } from '@/components/global/InfoMessage'
import { SelectField } from '@/components/form/SelectField'

export const Dashboard = () => {
  const navigate = useNavigate()
  const { budgetId: bid } = useParams()
  const { data: budgets, error, isLoading } = useFetchBudgetsQuery()
  const [budgetId, setBudgetId] = useState<string>('')

  useEffect(() => {
    if (bid && !budgetId) {
      setBudgetId(bid)
    }

    navigate('' + budgetId)
  }, [budgetId])

  let content: React.ReactNode = null
  if (error) content = <ErrorMessage error="could not display dashboard..." />
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
          <Heading size="lg">Visualize Your Spending</Heading>
          <Text fontWeight="light">
            Visualize your daily spending and keep your head and money on track.
          </Text>
        </Box>

        {content}
      </Flex>

      <Separator />

      <Outlet />
    </Stack>
  )
}
