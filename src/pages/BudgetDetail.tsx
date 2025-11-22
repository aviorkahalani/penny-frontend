import { useParams } from 'react-router'
import { useFetchBudgetByIdQuery } from '@/store'
import {
  Heading,
  Stack,
  Separator,
  Table,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react'
import type React from 'react'
import type { Currency } from '@/interfaces'
import BudgetDetailSkeleton from '@/components/BudgetDetailSkeleton'

export default function BudgetDetail() {
  const { id } = useParams<{ id: string }>()
  const {
    data: budget,
    error,
    isLoading,
  } = useFetchBudgetByIdQuery(id as string)

  const defaultIncomeCategories = [
    { id: '1', name: 'work', plannedAmount: 5000 },
    { id: '2', name: 'scholarship', plannedAmount: 2000 },
  ]

  const total = defaultIncomeCategories.reduce((acc, category) => {
    return (acc += category.plannedAmount)
  }, 0)

  const formatCurrency = (currency: Currency) => {
    const map = { NIS: '₪', USD: '$' }
    return map[currency]
  }

  let content: React.ReactNode = null
  if (error) {
    content = <div>Oh no...</div>
  } else if (isLoading) {
    content = <BudgetDetailSkeleton />
  } else if (budget) {
    content = (
      <Stack as="section" gap="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Stack>
            <Heading size="xl">
              {budget.date.month} / {budget.date.year}
            </Heading>
            <Heading size="sm" color="fg.subtle">
              {budget.name}
            </Heading>
          </Stack>
          <Text>
            <strong>Total:</strong> {total} {formatCurrency(budget.currency)}
          </Text>
        </HStack>

        <Separator />

        <Stack align="flex-start">
          <Heading size="lg" color="fg.info">
            Incomes
          </Heading>
          <Table.Root size="md" stickyHeader>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">
                  Planned Amount
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {defaultIncomeCategories.map((category) => (
                <Table.Row key={category.id}>
                  <Table.Cell>{category.name}</Table.Cell>
                  <Table.Cell textAlign="end">
                    {category.plannedAmount} {formatCurrency(budget.currency)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <Button variant="subtle">Add Category</Button>
        </Stack>
      </Stack>
    )
  }

  return content
}
