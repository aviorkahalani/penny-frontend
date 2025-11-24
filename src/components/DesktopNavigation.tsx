import { Box } from '@chakra-ui/react'
import { NavigationLinks } from '@/components/NavigationLinks'

export const DesktopNavigation = () => {
  return (
    <Box as="nav" className="nav" display={{ base: 'none', md: 'flex' }}>
      <NavigationLinks />
    </Box>
  )
}
