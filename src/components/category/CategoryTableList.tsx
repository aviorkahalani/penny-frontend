import _ from 'lodash'
import { Button, Editable, For, Table } from '@chakra-ui/react'
import { TrashIcon } from '@phosphor-icons/react'
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
            <Button color="red.400" variant="ghost" onClick={() => handleDelete(category._id)}>
              <TrashIcon />
            </Button>
          </Table.Cell>
        </Table.Row>
      )}
    </For>
  )
}
