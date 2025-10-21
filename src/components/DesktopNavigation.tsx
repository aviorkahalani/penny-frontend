import { Box } from '@chakra-ui/react'
import NavigationLinks from './NavigationLinks'

export default function DesktopNavigation() {
  return (
    <Box as="nav" className="nav" display={{ base: 'none', md: 'flex' }}>
      <NavigationLinks />
    </Box>
  )
}
