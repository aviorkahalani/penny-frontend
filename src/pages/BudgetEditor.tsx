import React from 'react'
import { useParams } from 'react-router'
import { BudgetEditForm } from '@/components/budget/BudgetEditForm'
import { BudgetCreateForm } from '@/components/budget/BudgetCreateForm'

export const BudgetEditor = () => {
  const { id } = useParams<{ id?: string }>()

  let content: React.ReactNode = null
  if (id) {
    content = <BudgetEditForm budgetId={id} />
  } else {
    content = <BudgetCreateForm />
  }

  return content
}
