import _ from 'lodash'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toaster } from '@/components/ui/toaster'
import type { Middleware } from '@reduxjs/toolkit'
import type { ErrorResponse } from '@/interfaces'

const DEFAULT_ERR_MESSAGE = 'Something went wrong'

export const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as { data?: ErrorResponse }
    const data = payload.data

    toaster.create({
      type: 'error',
      duration: 2000,
      closable: true,
      description: isErrorResponse(data)
        ? _.capitalize(data.message)
        : DEFAULT_ERR_MESSAGE,
    })
  }

  return next(action)
}

const isErrorResponse = (value: unknown): value is ErrorResponse => {
  return (
    typeof value === 'object' &&
    value != null &&
    'success' in value &&
    'code' in value &&
    'message' in value
  )
}
