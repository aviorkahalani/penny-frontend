import { useParams } from 'react-router'
import { TransactionEditForm } from '@/components/transaction/TransactionEditForm'
import { TransactionCreateForm } from '@/components/transaction/TransactionCreateForm'

export const TransactionEditor = () => {
  const { budgetId, transactionId } = useParams()

  let content: React.ReactNode = null
  if (budgetId) {
    if (transactionId) {
      content = <TransactionEditForm budgetId={budgetId} transactionId={transactionId} />
    } else {
      content = <TransactionCreateForm budgetId={budgetId} />
    }
  }

  return content
}
