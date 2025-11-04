import _ from 'lodash'
import type { User } from '@/interfaces'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router'

interface UserActionsProps {
  user: User
  onLogout: () => void
}

export default function UserActions({ user, onLogout }: UserActionsProps) {
  return (
    <>
      <Button variant="subtle" as="li" onClick={onLogout}>
        Logout
      </Button>
      <Button variant="solid" as="li" bg="teal.solid" color="white">
        <Link to="/profile">{_.capitalize(user.name)}</Link>
      </Button>
    </>
  )
}
