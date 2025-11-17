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
