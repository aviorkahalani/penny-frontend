import { Container } from '@chakra-ui/react'
import { AppLogo } from '@/components/global/AppLogo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { DesktopNavigation } from '@/components/DesktopNavigation'

export const Header = () => {
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
