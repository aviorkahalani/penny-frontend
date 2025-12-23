import _ from 'lodash'
import { Link } from 'react-router'
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
      <Button asChild variant="solid">
        <Link to="/profile">{_.capitalize(user.name)}</Link>
      </Button>
    </Flex>
  )
}
