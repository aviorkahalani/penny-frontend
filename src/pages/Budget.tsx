import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import {
  useCreateBudgetMutation,
  useFetchBudgetByIdQuery,
  useUpdateBudgetMutation,
} from '@/store'
import { Heading, VStack } from '@chakra-ui/react'
import { MonthField } from '@/components/MonthField'
import { YearField } from '@/components/YearField'
import { SubmitButton } from '@/components/SubmitButton'
import { CurrencyField } from '@/components/CurrencyField'
import { NameField } from '@/components/NameField'
import { NotesField } from '@/components/NotesField'
import type { Currency } from '@/interfaces'

const currentMonth = (new Date().getMonth() + 1).toString()
const currentYear = new Date().getFullYear().toString()

export const Budget = () => {
  const { id } = useParams<{ id?: string }>()
  const { data, error, isLoading } = useFetchBudgetByIdQuery(id ?? skipToken)
  const [createBudget] = useCreateBudgetMutation()
  const [updateBudget] = useUpdateBudgetMutation()
  const navigate = useNavigate()

  const [months, setMonths] = useState<string[]>([currentMonth])
  const [years, setYears] = useState<string[]>([currentYear])
  const [currency, setCurrency] = useState<Currency>('NIS')
  const [name, setName] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  useEffect(() => {
    if (data) {
      setName(data.name)
      setCurrency(data.currency)
      setYears([data.date.year.toString()])
      setMonths([data.date.month.toString()])
      setNotes(data.notes || '')
    }
  }, [data])

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    const [year] = years
    const [month] = months

    const budget = {
      name,
      currency,
      date: { year: Number(year), month: Number(month) },
      notes,
    }

    if (data) {
      await updateBudget({ ...budget, _id: data._id })
    } else {
      await createBudget(budget)
    }

    navigate('/planning')
  }

  if (error) return <div>Oh no...</div>

  if (isLoading) return <div>Loading...</div>

  return (
    <section>
      <Heading mb="4">{data ? 'Edit' : 'Create'} Budget</Heading>

      <VStack as="form" gap="4" alignItems="start" onSubmit={handleSubmit}>
        <MonthField month={months} setMonth={setMonths} />
        <YearField year={years} setYear={setYears} />
        <CurrencyField currency={currency} setCurrency={setCurrency} />
        <NameField name={name} setName={setName} />
        <NotesField notes={notes} setNotes={setNotes} />
        <SubmitButton text={data ? 'Update' : 'Save'} />
      </VStack>
    </section>
  )
}
