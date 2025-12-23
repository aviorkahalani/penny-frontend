import { Link } from 'react-router'
import { Button, Flex } from '@chakra-ui/react'

export const UnauthenticatedActions = () => {
  return (
    <Flex gap="1" flexDir={{ base: 'column', md: 'row' }}>
      <Button asChild variant="subtle">
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link to="/register">Register</Link>
      </Button>
    </Flex>
  )
}
