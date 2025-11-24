import { useParams } from 'react-router'
import { useFetchBudgetByIdQuery } from '@/store'
import { Stack, Separator } from '@chakra-ui/react'
import { BudgetDetailSkeleton } from '@/components/BudgetDetailSkeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { BudgetHeading } from '@/components/BudgetHeading'
import { BudgetCategoryTable } from '@/components/BudgetCategoryTable'

export const BudgetDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data, error, isLoading } = useFetchBudgetByIdQuery(id as string)

  const onCreateCategory = () => {
    // todo: open create category modal
  }

  let content: React.ReactNode = null
  if (error) {
    return (content = <ErrorMessage error={error} />)
  } else if (isLoading) {
    return (content = <BudgetDetailSkeleton />)
  } else if (data) {
    content = (
      <Stack as="section" gap="4">
        <BudgetHeading
          name={data.name}
          date={data.date}
          onCreateCategory={onCreateCategory}
        />
        <Separator />
        <Stack gap="10">
          <BudgetCategoryTable
            title="incomes"
            categories={[]}
            currency={data.currency}
          />
          <BudgetCategoryTable
            title="expenses"
            categories={[]}
            currency={data.currency}
          />
          <BudgetCategoryTable
            title="savings"
            categories={[]}
            currency={data.currency}
          />
        </Stack>
      </Stack>
    )
  }

  return content
}
