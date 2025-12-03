import { isRejectedWithValue } from '@reduxjs/toolkit'
import { isErrorResponse, capitalize } from '@/utils/helpers'
import { toaster } from '@/components/ui/toaster'
import type { Middleware } from '@reduxjs/toolkit'
import type { ErrorResponse } from '@/interfaces'

const DEFAULT_ERR_MESSAGE = 'Something went wrong'
const UNAUTHORIZED_CODE = 401

export const errorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as { data?: ErrorResponse }
    const data = payload.data

    if (data?.code === UNAUTHORIZED_CODE) return next(action)

    toaster.create({
      type: 'error',
      duration: 2000,
      closable: true,
      description: isErrorResponse(data) ? capitalize(data.message) : DEFAULT_ERR_MESSAGE,
    })
  }

  return next(action)
}
