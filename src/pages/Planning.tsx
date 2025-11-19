import { useFetchBudgetsQuery } from '@/store'

export default function Planning() {
  const { data, error, isLoading } = useFetchBudgetsQuery()

  if (error) return <div>Oh no! there are no budgets yet!</div>

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
