import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateBudgetMutation } from '@/store'
import { Button, Group, Stack } from '@chakra-ui/react'
import { FormHeader } from '../form/FormHeader'
import { createCollection } from '@/utils/helpers'
import { SelectField } from '../form/SelectField'
import { TextField } from '../form/TextField'
import { RadioField } from '../form/RadioField'
import { TextareaField } from '../form/TextareaField'
import { CoinIcon, CurrencyDollarIcon } from '@phosphor-icons/react'
import type { Currency } from '@/interfaces'

export const BudgetCreateForm = () => {
  const navigate = useNavigate()
  const [createBudget] = useCreateBudgetMutation()

  const currYear = new Date().getFullYear()
  const currMonth = new Date().getMonth() + 1

  const [month, setMonth] = useState(currMonth.toString())
  const [year, setYear] = useState(currYear.toString())
  const [currency, setCurrency] = useState<string>('NIS')
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    await createBudget({
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

  return (
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
      <Button type="submit">Create Budget</Button>
    </Stack>
  )
}
