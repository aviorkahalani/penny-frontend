import { CloseButton, Drawer, Portal } from '@chakra-ui/react'
import { ListIcon } from '@phosphor-icons/react'
import NavigationLinks from './NavigationLinks'

export default function MobileNavigation() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild display={{ md: 'none' }}>
        <ListIcon size="24" cursor="pointer" />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content paddingBlock="10">
            <Drawer.Body>
              <NavigationLinks />
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
