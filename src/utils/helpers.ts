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

export const capitalize = (str: string) => {
  return str
    .split(' ')
    .map((word) => {
      const firstLetter = word.charAt(0).toUpperCase()
      const restOfWord = word.slice(1)
      return firstLetter + restOfWord
    })
    .join(' ')
}

export const createCollection = (start: number, end: number) => {
  const items = []

  for (let i = start; i <= end; i++) {
    items.push({ label: i.toString(), value: i.toString() })
  }

  return createListCollection({ items })
}
