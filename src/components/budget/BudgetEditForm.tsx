import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useFetchBudgetByIdQuery, useUpdateBudgetMutation } from '@/store'
import { Button, Group, Stack } from '@chakra-ui/react'
import { FormHeader } from '../form/FormHeader'
import { SelectField } from '../form/SelectField'
import { createCollection } from '@/utils/helpers'
import { RadioField } from '../form/RadioField'
import { CoinIcon, CurrencyDollarIcon } from '@phosphor-icons/react'
import { TextField } from '../form/TextField'
import { TextareaField } from '../form/TextareaField'
import type { Currency } from '@/interfaces'

interface BudgetEditFormProps {
  budgetId: string
}

export const BudgetEditForm = ({ budgetId }: BudgetEditFormProps) => {
  const navigate = useNavigate()
  const { data: budget, isLoading } = useFetchBudgetByIdQuery(budgetId)
  const [updateBudget] = useUpdateBudgetMutation()

  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [currency, setCurrency] = useState<string>('NIS')
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (budget) {
      setMonth(budget.date.month.toString())
      setYear(budget.date.year.toString())
      setCurrency(budget.currency as string)
      setName(budget.name)
      setNotes(budget.notes || '')
    }
  }, [budget])

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    await updateBudget({
      _id: budget?._id,
      name,
      currency: currency as Currency,
      date: {
        month: Number(month),
        year: Number(year),
      },
      notes,
    }).unwrap()
    navigate('/planning')
  }

  const currYear = new Date().getFullYear()

  let content: React.ReactNode = null
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (budget) {
    content = (
      <Stack as="form" onSubmit={handleSubmit} gap="4">
        <FormHeader text="create budget" />

        <Group>
          <SelectField
            collection={createCollection(1, 12)}
            label="select month"
            value={month}
            setValue={setMonth}
          />
          <SelectField
            collection={createCollection(currYear, currYear + 5)}
            label="select year"
            value={year}
            setValue={setYear}
          />
        </Group>

        <RadioField
          items={[
            { value: 'NIS', title: 'NIS', icon: <CoinIcon /> },
            { value: 'USD', title: 'USD', icon: <CurrencyDollarIcon /> },
          ]}
          label="select currency"
          value={currency}
          setValue={setCurrency}
        />

        <TextField label="name" value={name} setValue={setName} />
        <TextareaField label="notes" value={notes} setValue={setNotes} />
        <Button type="submit">Update Budget</Button>
      </Stack>
    )
  }

  return content
}
