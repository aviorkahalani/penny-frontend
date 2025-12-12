import { Button, createListCollection, Stack } from '@chakra-ui/react'
import { FormHeader } from '../form/FormHeader'
import { TextField } from '../form/TextField'
import { useState } from 'react'
import { RadioField } from '../form/RadioField'
import { HandArrowDownIcon, HandArrowUpIcon, HandCoinsIcon } from '@phosphor-icons/react'
import { NumberField } from '../form/NumberField'
import { useCreateTransactionMutation } from '@/store/apis/transaction'
import { useNavigate } from 'react-router'
import { useFetchCategoriesQuery } from '@/store'
import { SelectGroupByField } from '../form/SelectGroupByField'
import type { Type } from '@/interfaces'

interface TransactionCreateFormProps {
  budgetId: string
}

export const TransactionCreateForm = ({ budgetId }: TransactionCreateFormProps) => {
  const navigate = useNavigate()

  const { data: categories, isLoading } = useFetchCategoriesQuery(budgetId)
  const [createTransaction] = useCreateTransactionMutation()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('0')
  const [type, setType] = useState('income')
  const [categoryId, setCategoryId] = useState('')

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    await createTransaction({
      params: { budgetId },
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

      <SelectGroupByField
        label="select category"
        value={categoryId}
        setValue={setCategoryId}
        collection={collection}
        disabled={isLoading}
      />

      <TextField label="description" value={description} setValue={setDescription} />
      <NumberField label="amount" value={amount.toString()} setValue={setAmount} />
      <Button type="submit">Create Transaction</Button>
    </Stack>
  )
}
