import { Button, Stack } from '@chakra-ui/react'
import { FormHeader } from '../form/FormHeader'
import { TextField } from '../form/TextField'
import { useEffect, useState } from 'react'
import { RadioField } from '../form/RadioField'
import { HandArrowDownIcon, HandArrowUpIcon, HandCoinsIcon } from '@phosphor-icons/react'
import { NumberField } from '../form/NumberField'
import {
  useFetchTransactionByIdQuery,
  useUpdateTransactionMutation,
} from '@/store/apis/transaction'
import { useNavigate } from 'react-router'
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
  const { data: transaction } = useFetchTransactionByIdQuery({ budgetId, transactionId })
  const [updateTransaction] = useUpdateTransactionMutation()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('0')
  const [type, setType] = useState('income')

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description || '')
      setAmount(transaction.amount.toString())
      setType(transaction.type)
    }
  }, [transaction])

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    await updateTransaction({
      params: { budgetId, transactionId },
      body: {
        description,
        amount: Number(amount),
        type: type as Type,
      },
    }).unwrap()

    navigate(`/tracking/${budgetId}`)
  }

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
      <TextField label="description" value={description} setValue={setDescription} />
      <NumberField label="amount" value={amount.toString()} setValue={setAmount} />

      <Button type="submit">Update Transaction</Button>
    </Stack>
  )
}
