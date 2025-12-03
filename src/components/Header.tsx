import { Box, CloseButton, Container, Drawer, Portal } from '@chakra-ui/react'
import { Logo } from '@/components/global/Logo'
import { HeaderLinks } from './header/HeaderLinks'
import { ListIcon } from '@phosphor-icons/react'
import { useFetchMeQuery, useLogoutMutation } from '@/store'

export const Header = () => {
  const { data: user } = useFetchMeQuery()
  const [logout] = useLogoutMutation()

  return (
    <Container
      as="header"
      paddingBlock="4"
      maxWidth="5xl"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Logo />

      {/* desktop */}
      <Box as="nav" display={{ base: 'none', md: 'flex' }}>
        <HeaderLinks user={user} logout={logout} />
      </Box>

      {/* mobile */}
      <Drawer.Root>
        <Drawer.Trigger asChild display={{ md: 'none' }}>
          <ListIcon size="24" cursor="pointer" />
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content paddingBlock="10">
              <Drawer.Body as="nav">
                <HeaderLinks user={user} logout={logout} />
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Container>
  )
}
