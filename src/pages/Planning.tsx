import { useFetchBudgetsQuery } from '@/store'

export default function Planning() {
  const { data } = useFetchBudgetsQuery()

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
