import { Heading, Stack, Table } from '@chakra-ui/react'
import { capitalize } from '@/utils/helpers'
import type { Category, Currency } from '@/interfaces'

interface BudgetCategoryTableProps {
  title: 'incomes' | 'expenses' | 'savings'
  categories: Category[]
  currency: Currency
}

export const BudgetCategoryTable = ({
  title,
  categories,
  currency,
}: BudgetCategoryTableProps) => {
  const formatCurrency = (currency: Currency) => {
    const map = { NIS: '₪', USD: '$' }
    return map[currency]
  }

  const hasCategories = categories.length > 0
  const renderedCategories = categories.map(({ _id, name, plannedAmount }) => (
    <Table.Row key={_id}>
      <Table.Cell>{capitalize(name)}</Table.Cell>
      <Table.Cell textAlign="end">
        {plannedAmount} {formatCurrency(currency)}
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <Stack align="flex-start">
      <Heading size="lg" color="fg.info">
        {capitalize(title)}
      </Heading>
      <Table.Root size="md" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">
              Planned Amount
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{hasCategories && renderedCategories}</Table.Body>
        <Table.Caption pt="4" color="fg.subtle">
          {!hasCategories && 'No categories yet...'}
        </Table.Caption>
      </Table.Root>
    </Stack>
  )
}
