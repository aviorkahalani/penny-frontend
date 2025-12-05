import _ from 'lodash'
import { Box, Button, Editable, For, Menu, Portal, Table } from '@chakra-ui/react'
import { DotsThreeIcon, TrashIcon } from '@phosphor-icons/react'
import { CategoryTableFallback } from './CategoryTableFallback'
import type { Category, Currency, Type } from '@/interfaces'

interface CategoryTableListProps {
  type: Type
  categories: Category[]
  currency: Currency
  handleDelete: (categoryId: string) => void
  handleUpdate: (categoryId: string, body: Partial<Category>) => void
}

export const CategoryTableList = ({
  type,
  categories,
  currency,
  handleDelete,
  handleUpdate,
}: CategoryTableListProps) => {
  const formatCurrency = (currency: Currency) => {
    const map = { NIS: '₪', USD: '$' }
    return map[currency]
  }

  return (
    <For each={categories} fallback={<CategoryTableFallback type={type} />}>
      {(category) => (
        <Table.Row key={category._id}>
          <Table.Cell>
            <Editable.Root
              value={_.capitalize(category.name)}
              onValueChange={(ev) => handleUpdate(category._id, { name: ev.value })}
              placeholder="Click to edit"
            >
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          </Table.Cell>
          <Table.Cell>
            <Editable.Root
              autoResize={false}
              justifyContent="end"
              value={category.plannedAmount.toString()}
              onValueChange={(ev) =>
                handleUpdate(category._id, { plannedAmount: Number(ev.value) })
              }
              placeholder="Click to edit"
            >
              <Editable.Preview />
              <Editable.Input />
              {formatCurrency(currency)}
            </Editable.Root>
          </Table.Cell>
          <Table.Cell textAlign="end">
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
                      onClick={() => handleDelete(category._id)}
                    >
                      <TrashIcon />
                      <Box flex="1">Delete</Box>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Table.Cell>
        </Table.Row>
      )}
    </For>
  )
}
