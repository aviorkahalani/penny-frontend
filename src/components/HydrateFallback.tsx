import { AbsoluteCenter, Spinner, Text } from '@chakra-ui/react'

export default function HydrateFallback() {
  return (
    <AbsoluteCenter display="flex" flexDir="column" gap="1">
      <Spinner size="xl" />
      <Text>Loading, please wait...</Text>
    </AbsoluteCenter>
  )
}
