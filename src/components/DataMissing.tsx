import { Center, Text } from '@chakra-ui/react'

interface DataMissingProps {
  message: string
}

export default function DataMissing({ message }: DataMissingProps) {
  return (
    <Center paddingBlock="10">
      <Text fontSize="sm">{message}</Text>
    </Center>
  )
}
