import { Container } from '@chakra-ui/react'
import { Link } from 'react-router'
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
        <Link className="logo" to="/">
          PENNY
        </Link>
        <MobileNavigation />
        <DesktopNavigation />
      </Container>
    </header>
  )
}
