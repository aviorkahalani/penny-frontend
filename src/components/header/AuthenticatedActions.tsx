import _ from 'lodash'
import { Button, Flex } from '@chakra-ui/react'
import type { User } from '@/interfaces'

interface AuthenticatedActionsProps {
  user: User
  logout: () => void
}

export const AuthenticatedActions = ({ user, logout }: AuthenticatedActionsProps) => {
  return (
    <Flex gap="1" flexDir={{ base: 'column', md: 'row' }}>
      <Button onClick={logout} variant="outline">
        Logout
      </Button>
      <Button variant="solid">{_.capitalize(user.name)}</Button>
    </Flex>
  )
}
