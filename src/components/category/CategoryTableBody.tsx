import { For, Table } from '@chakra-ui/react'
import { useFetchCategoriesByTypeQuery } from '@/store'
import { CategoryTableRow } from './CategoryTableRow'
import { CategoryTableFallback } from './CategoryTableFallback'
import type { Currency, Type } from '@/interfaces'

interface CategoryTableBodyProps {
  type: Type
  budgetId: string
  currency: Currency
}

export const CategoryTableBody = ({
  type,
  budgetId,
  currency,
}: CategoryTableBodyProps) => {
  const { data: categories } = useFetchCategoriesByTypeQuery({ budgetId, type })

  return (
    <Table.Body>
      <For each={categories} fallback={<CategoryTableFallback type={type} />}>
        {(category) => (
          <CategoryTableRow key={category._id} category={category} currency={currency} />
        )}
      </For>
    </Table.Body>
  )
}
