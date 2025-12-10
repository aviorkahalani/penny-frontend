import { Spinner, Text, VStack } from '@chakra-ui/react'

export const Loader = () => {
  return (
    <VStack colorPalette="fg">
      <Spinner />
      <Text fontSize="xs">Loading...</Text>
    </VStack>
  )
}
