import type { ILink } from '@/interfaces'
import { useLogoutMutation } from '@/store'
import { Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router'
import { useAppSelector } from '@/hooks'
import UserActions from './UserActions'
import GuestActions from './GuestActions'

export default function NavigationLinks() {
  const user = useAppSelector((state) => state.authSlice.user)
  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    logout()
  }

  const links: ILink[] = [
    { to: 'planning', label: 'Planning', variant: 'ghost' },
    { to: 'tracking', label: 'Tracking', variant: 'ghost' },
    { to: 'dashboard', label: 'Dashboard', variant: 'ghost' },
  ]

  return (
    <Flex as="ul" gap="1" direction={{ base: 'column', md: 'row' }}>
      {links.map((link) => (
        <Button key={link.label} variant={link.variant} as="li">
          <Link to={link.to}>{link.label}</Link>
        </Button>
      ))}

      {user ? (
        <UserActions user={user} onLogout={handleLogout} />
      ) : (
        <GuestActions />
      )}
    </Flex>
  )
}
