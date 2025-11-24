import { Button } from '@chakra-ui/react'
import { Link } from 'react-router'

export const AppLogo = () => {
  return (
    <Button
      padding="0"
      asChild
      variant="plain"
      fontWeight="bold"
      letterSpacing="wider"
    >
      <Link className="logo" to="/">
        PENNY
      </Link>
    </Button>
  )
}
