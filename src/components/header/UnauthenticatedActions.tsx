import { Link } from 'react-router'
import { Button, Group } from '@chakra-ui/react'

export const UnauthenticatedActions = () => {
  return (
    <Group attached>
      <Button asChild variant="subtle">
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link to="/register">Register</Link>
      </Button>
    </Group>
  )
}
