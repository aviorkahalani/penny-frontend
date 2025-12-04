import _ from 'lodash'
import { Flex, Button, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router'
import { AuthenticatedActions } from './AuthenticatedActions'
import { UnauthenticatedActions } from './UnauthenticatedActions'
import type { User } from '@/interfaces'

interface HeaderLinksProps {
  user?: User | null
  logout: () => void
}

export const HeaderLinks = ({ user, logout }: HeaderLinksProps) => {
  const links = ['planning', 'tracking', 'dashboard']

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
        {user ? <AuthenticatedActions user={user} logout={logout} /> : <UnauthenticatedActions />}
      </Flex>
    </Flex>
  )
}
