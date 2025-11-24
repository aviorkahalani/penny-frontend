import { Text } from '@chakra-ui/react'
import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface ErrorMessageProps {
  error?: FetchBaseQueryError | SerializedError
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  console.log({ error })

  return (
    <Text textAlign="center" color="red.solid">
      Oh no! something went wrong...
    </Text>
  )
}
