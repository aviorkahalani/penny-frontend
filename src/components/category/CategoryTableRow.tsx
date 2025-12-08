import { Editable, Icon, Table, useEditable } from '@chakra-ui/react'
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from '@/store'
import { CategoryTableRowActions } from './CategoryTableRowActions'
import { BiShekel, BiDollar } from 'react-icons/bi'
import type { Category, Currency } from '@/interfaces'

interface CategoryTableRowProps {
  category: Category
  currency: Currency
}

export const CategoryTableRow = ({ category, currency }: CategoryTableRowProps) => {
  const [deleteCategory] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()

  const nameEditable = useEditable({
    required: true,
    defaultValue: category.name,
    placeholder: 'Click to edit',
    onValueCommit: async (ev) =>
      await updateCategory({
        body: { budgetId: category.budgetId, name: ev.value },
        params: { categoryId: category._id },
      }),
  })

  const plannedAmountEditable = useEditable({
    required: true,
    defaultValue: category.plannedAmount.toString(),
    onValueCommit: async (ev) => {
      await updateCategory({
        body: { budgetId: category.budgetId, plannedAmount: parseFloat(ev.value) || 0 },
        params: { categoryId: category._id },
      })
    },
  })

  return (
    <Table.Row>
      <Table.Cell>
        <Editable.RootProvider value={nameEditable}>
          <Editable.Preview />
          <Editable.Input />
        </Editable.RootProvider>
      </Table.Cell>

      <Table.Cell>
        <Editable.RootProvider
          value={plannedAmountEditable}
          justifyContent="end"
          textAlign="end"
        >
          <Editable.Preview />
          <Editable.Input />
          <Icon size="sm" color="gray.400">
            {currency === 'NIS' ? <BiShekel /> : <BiDollar />}
          </Icon>
        </Editable.RootProvider>
      </Table.Cell>

      <Table.Cell textAlign="end">
        <CategoryTableRowActions
          categoryId={category._id}
          handleDelete={deleteCategory}
        />
      </Table.Cell>
    </Table.Row>
  )
}
