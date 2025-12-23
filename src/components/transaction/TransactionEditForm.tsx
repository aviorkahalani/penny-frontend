import {
  useFetchTransactionByIdQuery,
  useUpdateTransactionMutation,
} from '@/store/apis/transaction'
import { Button, createListCollection, Field, Stack } from '@chakra-ui/react'
import { FormHeader } from '../form/FormHeader'
import { TextField } from '../form/TextField'
import { useEffect, useState } from 'react'
import { RadioField } from '../form/RadioField'
import { HandArrowDownIcon, HandArrowUpIcon, HandCoinsIcon } from '@phosphor-icons/react'
import { NumberField } from '../form/NumberField'
import { useNavigate } from 'react-router'
import { SelectGroupByField } from '../form/SelectGroupByField'
import { useFetchCategoriesQuery } from '@/store'
import type { Type } from '@/interfaces'

interface TransactionEditFormProps {
  budgetId: string
  transactionId: string
}

export const TransactionEditForm = ({
  budgetId,
  transactionId,
}: TransactionEditFormProps) => {
  const navigate = useNavigate()

  const { data: categories, isLoading } = useFetchCategoriesQuery(budgetId)
  const { data: transaction } = useFetchTransactionByIdQuery({ budgetId, transactionId })
  const [updateTransaction] = useUpdateTransactionMutation()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('0')
  const [type, setType] = useState('income')
  const [categoryId, setCategoryId] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description || '')
      setAmount(transaction.amount.toString())
      setType(transaction.type)
      setCategoryId(transaction.categoryId)
    }
  }, [transaction])

  useEffect(() => {
    if (!categoryId || !categories) return

    const category = categories.find((c) => c._id === categoryId)

    if (!category) return

    if (category.type !== type) {
      setError(true)
    } else {
      setError(false)
    }
  }, [categoryId, type])

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (error) return

    await updateTransaction({
      params: { budgetId, transactionId },
      body: {
        description,
        amount: Number(amount),
        type: type as Type,
        categoryId,
      },
    }).unwrap()

    navigate(`/tracking/${budgetId}`)
  }

  if (!categories) return null

  const collection = createListCollection({
    items: categories.map((c) => ({ label: c.name, value: c._id, key: c.type })),
  })

  return (
    <Stack as="form" onSubmit={handleSubmit} gap="4">
      <FormHeader text="Create a transaction" />

      <RadioField
        label="select type"
        value={type}
        setValue={setType}
        items={[
          { title: 'Income', value: 'income', icon: <HandArrowDownIcon /> },
          { title: 'Expense', value: 'expense', icon: <HandArrowUpIcon /> },
          { title: 'Saving', value: 'saving', icon: <HandCoinsIcon /> },
        ]}
      />
      <Field.Root invalid={error}>
        <SelectGroupByField
          label="select category"
          value={categoryId}
          setValue={setCategoryId}
          collection={collection}
          disabled={isLoading}
          error={error}
        />
        {error && (
          <Field.ErrorText>
            Category doesn't match type
            <strong>{type}</strong>
          </Field.ErrorText>
        )}
      </Field.Root>
      <TextField label="description" value={description} setValue={setDescription} />
      <NumberField label="amount" value={amount.toString()} setValue={setAmount} />

      <Button type="submit">Update Transaction</Button>
    </Stack>
  )
}
