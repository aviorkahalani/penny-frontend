import { Button } from '@chakra-ui/react'
import { Link } from 'react-router'

export default function GuestActions() {
  return (
    <>
      <Button variant="subtle" as="li">
        <Link to="/login">Login</Link>
      </Button>
      <Button variant="solid" as="li">
        <Link to="/register">Join Now</Link>
      </Button>
    </>
  )
}
