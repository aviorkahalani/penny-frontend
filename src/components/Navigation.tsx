import type { ILink } from '@/interfaces'
import { Flex, Button, Box } from '@chakra-ui/react'
import { Link } from 'react-router'

export default function Navigation() {
  const links: ILink[] = [
    { to: 'planning', label: 'Planning', variant: 'ghost' },
    { to: 'tracking', label: 'Tracking', variant: 'ghost' },
    { to: 'dashboard', label: 'Dashboard', variant: 'ghost' },
    { to: '/login', label: 'Login', variant: 'subtle' },
    { to: '/register', label: 'Join Now', variant: 'solid' },
  ]

  return (
    <Box
      as="nav"
      className="nav"
      position={{ base: 'fixed', md: 'static' }}
      top={{ base: 0 }}
      right={{ base: 0 }}
      zIndex={{ base: 'docked' }}
      height={{ base: '100vh', md: 'auto' }}
      width={{ base: 'xs', md: 'auto' }}
      borderLeftWidth={{ base: 1, md: 0 }}
      background={{ sm: 'bg.subtle', md: 'none' }}
    ></Box>
  )
}
