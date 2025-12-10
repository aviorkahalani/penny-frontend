import { createListCollection } from '@chakra-ui/react'
import type { ErrorResponse } from '@/interfaces'

export const isErrorResponse = (value: unknown): value is ErrorResponse => {
  return (
    typeof value === 'object' &&
    value != null &&
    'success' in value &&
    'code' in value &&
    'message' in value
  )
}

export const createCollection = (start: number, end: number) => {
  const items = []

  for (let i = start; i <= end; i++) {
    items.push({ label: i.toString(), value: i.toString() })
  }

  return createListCollection({ items })
}

export const getDaysInMonth = (year: number, month: number) => {
  // Create a Date object for the 0th day of the next month.
  // Months are 0-indexed in JavaScript (0 for January, 11 for December).
  // So, if you want days in February (month 1), you'd pass 2 as the month argument to Date().
  // The 0th day of the 3rd month (March) is the last day of the 2nd month (February).
  return new Date(year, month, 0).getDate()
}
