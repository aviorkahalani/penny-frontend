import { Center, Text } from '@chakra-ui/react'

interface InfoMessageProps {
  text: string
}

export const InfoMessage = ({ text }: InfoMessageProps) => {
  return (
    <Center>
      <Text fontFamily="mono" fontSize="sm" color="fg.muted">
        {text}
      </Text>
    </Center>
  )
}
