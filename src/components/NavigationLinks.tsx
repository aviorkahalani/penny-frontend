import type { ILink } from '@/interfaces'
import { Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router'

export default function NavigationLinks() {
  const links: ILink[] = [
    { to: 'planning', label: 'Planning', variant: 'ghost' },
    { to: 'tracking', label: 'Tracking', variant: 'ghost' },
    { to: 'dashboard', label: 'Dashboard', variant: 'ghost' },
    { to: '/login', label: 'Login', variant: 'subtle' },
    { to: '/register', label: 'Join Now', variant: 'solid' },
  ]

  return (
    <Flex as="ul" gap="1" direction={{ base: 'column', md: 'row' }}>
      {links.map((link) => (
        <Button key={link.label} variant={link.variant} as="li">
          <Link to={link.to}>{link.label}</Link>
        </Button>
      ))}
    </Flex>
  )
}
