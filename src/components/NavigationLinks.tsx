import { Link } from 'react-router'
import { useFetchMeQuery, useLogoutMutation } from '@/store'
import { Button, Flex } from '@chakra-ui/react'
import { UserActions } from '@/components/UserActions'
import { GuestActions } from '@/components/GuestActions'

export const NavigationLinks = () => {
  const { data: user } = useFetchMeQuery()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    await logout()
  }

  const links = [
    { to: 'planning', label: 'Planning' },
    { to: 'tracking', label: 'Tracking' },
    { to: 'dashboard', label: 'Dashboard' },
  ]

  return (
    <Flex as="ul" gap="1" direction={{ base: 'column', md: 'row' }}>
      {links.map((link) => (
        <Button key={link.label} variant="ghost" as="li">
          <Link to={link.to}>{link.label}</Link>
        </Button>
      ))}

      {user ? <UserActions user={user} onLogout={handleLogout} /> : <GuestActions />}
    </Flex>
  )
}
