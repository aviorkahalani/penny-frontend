import {
  Box,
  Button,
  Editable,
  Heading,
  Menu,
  Portal,
  Stack,
  Table,
} from '@chakra-ui/react'
import { capitalize } from '@/utils/helpers'
import type { Category, Currency } from '@/interfaces'
import { DotsThreeIcon, TrashIcon } from '@phosphor-icons/react'

interface BudgetCategoryTableProps {
  title: 'incomes' | 'expenses' | 'savings'
  categories: Category[]
  currency: Currency
  handleDelete: (id: string) => void
  handleUpdate: (id: string, body: Partial<Category>) => void
}

export const BudgetCategoryTable = ({
  title,
  categories,
  currency,
  handleDelete,
  handleUpdate,
}: BudgetCategoryTableProps) => {
  const formatCurrency = (currency: Currency) => {
    const map = { NIS: '₪', USD: '$' }
    return map[currency]
  }

  const hasCategories = categories.length > 0
  const renderedCategories = categories.map(({ _id, name, plannedAmount }) => (
    <Table.Row key={_id}>
      <Table.Cell>
        <Editable.Root
          value={name}
          onValueChange={(ev) => handleUpdate(_id, { name: ev.value })}
          placeholder="Click to edit"
        >
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
      </Table.Cell>

      <Table.Cell textAlign="end">
        <Editable.Root
          justifyContent="end"
          value={plannedAmount.toString()}
          onValueChange={(ev) =>
            handleUpdate(_id, { plannedAmount: Number(ev.value) })
          }
          placeholder="Click to edit"
        >
          <Editable.Preview />
          <Editable.Input />
          {formatCurrency(currency)}
        </Editable.Root>
      </Table.Cell>

      {hasCategories && (
        <Table.Cell w="1">
          <Menu.Root closeOnSelect variant="subtle">
            <Menu.Trigger asChild>
              <Button variant="ghost" onClick={(ev) => ev.stopPropagation()}>
                <DotsThreeIcon />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="delete"
                    color="red"
                    onClick={() => handleDelete(_id)}
                  >
                    <TrashIcon />
                    <Box flex="1">Delete</Box>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Table.Cell>
      )}
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

            <Table.ColumnHeader w="1">Actions</Table.ColumnHeader>
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
