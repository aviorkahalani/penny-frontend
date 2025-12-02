import { Center, Text } from '@chakra-ui/react'

interface ErrorMessageProps {
  error: string
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <Center>
      <Text fontFamily="mono" fontSize="sm" color="red.400">
        {error}
      </Text>
    </Center>
  )
}
