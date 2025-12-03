import _ from 'lodash'
import { Flex, Button, Text } from '@chakra-ui/react'
import { Link, NavLink } from 'react-router'
import type { User } from '@/interfaces'

interface HeaderLinksProps {
  user?: User | null
  logout: () => void
}

export const HeaderLinks = ({ user, logout }: HeaderLinksProps) => {
  const links = ['planning', 'tracking', 'dashboard']

  let actions: React.ReactNode = null

  if (user) {
    actions = (
      <>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
        <Button asChild variant="subtle">
          <Link to="/profile">Profile</Link>
        </Button>
      </>
    )
  } else {
    actions = (
      <>
        <Button asChild variant="subtle">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/register">Register</Link>
        </Button>
      </>
    )
  }

  return (
    <Flex as="ul" flexDir={{ base: 'column', md: 'row' }}>
      {links.map((link) => (
        <Button as="li" key={link} variant="ghost">
          <NavLink to={`/${link}`}>
            {({ isActive }) => <Text color={isActive ? 'blue.600' : ''}>{_.capitalize(link)}</Text>}
          </NavLink>
        </Button>
      ))}

      <Flex gap="1" flexDir={{ base: 'column', md: 'row' }}>
        {actions}
      </Flex>
    </Flex>
  )
}
