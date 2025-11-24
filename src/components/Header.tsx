import { Container } from '@chakra-ui/react'
import MobileNavigation from './MobileNavigation'
import DesktopNavigation from './DesktopNavigation'
import { AppLogo } from './AppLogo'

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
        <AppLogo />
        <MobileNavigation />
        <DesktopNavigation />
      </Container>
    </header>
  )
}
