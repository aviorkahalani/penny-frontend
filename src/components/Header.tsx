import { Link } from 'react-router'
import { Container, Button } from '@chakra-ui/react'
import MobileNavigation from './MobileNavigation'
import DesktopNavigation from './DesktopNavigation'

export default function Header() {
  return (
    <header>
      <Container
        paddingBlock="4"
        maxWidth="5xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
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

        <MobileNavigation />
        <DesktopNavigation />
      </Container>
    </header>
  )
}
