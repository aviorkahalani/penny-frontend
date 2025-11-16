import type { ILink } from '@/interfaces'
import { useFetchMeQuery, useLogoutMutation } from '@/store'
import { Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router'
import UserActions from './UserActions'
import GuestActions from './GuestActions'

export default function NavigationLinks() {
  const { data: user } = useFetchMeQuery()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    await logout()
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
