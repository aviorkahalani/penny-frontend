import { AbsoluteCenter, Icon, Text } from '@chakra-ui/react'
import { BugIcon } from '@phosphor-icons/react'

export const Error = () => {
  return (
    <AbsoluteCenter display="flex" flexDir="column" gap="1">
      <Icon size="2xl" color="red.solid">
        <BugIcon />
      </Icon>
      <Text>There was an error.</Text>
    </AbsoluteCenter>
  )
}
