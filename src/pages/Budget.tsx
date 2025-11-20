import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { skipToken } from '@reduxjs/toolkit/query'
import { useCreateBudgetMutation, useFetchBudgetByIdQuery } from '@/store'
import { Heading, VStack } from '@chakra-ui/react'
import type { Budget, Currency } from '@/interfaces'

import MonthField from '@/components/MonthField'
import YearField from '@/components/YearField'
import SubmitButton from '@/components/SubmitButton'
import CurrencyField from '@/components/CurrencyField'
import NameField from '@/components/NameField'
import NotesField from '@/components/NotesField'

const currentMonth = (new Date().getMonth() + 1).toString()
const currentYear = new Date().getFullYear().toString()

export default function Budget() {
  const { id } = useParams<{ id?: string }>()
  const { data, error, isLoading } = useFetchBudgetByIdQuery(id ?? skipToken)
  const [createBudget] = useCreateBudgetMutation()
  const navigate = useNavigate()

  const [month, setMonth] = useState<string[]>([currentMonth])
  const [year, setYear] = useState<string[]>([currentYear])
  const [currency, setCurrency] = useState<Currency>('NIS')
  const [name, setName] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  useEffect(() => {
    if (data) {
      console.log({ data }) // here the date is good

      setName(data.name)
      setCurrency(data.currency)
      setYear([data.date.year.toString()])
      setMonth([data.date.month.toString()])
      setNotes(data.notes || '')
    }
  }, [data])

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    await createBudget({
      name,
      currency,
      date: {
        year: Number(year.at(0)),
        month: Number(month.at(0)),
      },
      notes,
    })
    navigate('/planning')
  }

  if (error) return <div>Oh no...</div>

  if (isLoading) return <div>Loading...</div>

  return (
    <section>
      <Heading mb="4">{data ? 'Edit' : 'Create'} Budget</Heading>

      <VStack as="form" gap="4" alignItems="start" onSubmit={handleSubmit}>
        <MonthField month={month} setMonth={setMonth} />
        <YearField year={year} setYear={setYear} />
        <CurrencyField currency={currency} setCurrency={setCurrency} />
        <NameField name={name} setName={setName} />
        <NotesField notes={notes} setNotes={setNotes} />
        <SubmitButton text={data ? 'Update' : 'Save'} />
      </VStack>
    </section>
  )
}
