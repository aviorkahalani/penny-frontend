import { Link } from 'react-router'
import { Button } from '@chakra-ui/react'
import { capitalize } from '@/utils/helpers'
import type { User } from '@/interfaces'

interface UserActionsProps {
  user: User
  onLogout: () => void
}

export const UserActions = ({ user, onLogout }: UserActionsProps) => {
  return (
    <>
      <Button variant="subtle" as="li" onClick={onLogout}>
        Logout
      </Button>
      <Button variant="solid" as="li">
        <Link to="/profile">{capitalize(user.name)}</Link>
      </Button>
    </>
  )
}
