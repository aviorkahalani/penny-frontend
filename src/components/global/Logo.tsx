import { Button } from '@chakra-ui/react'
import { Link } from 'react-router'

export const Logo = () => {
  return (
    <Button asChild p="0" variant="plain" fontWeight="bolder" letterSpacing="widest">
      <Link to="/">PENNY</Link>
    </Button>
  )
}
