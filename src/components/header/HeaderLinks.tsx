import _ from 'lodash'
import { Flex, Button, Text, For } from '@chakra-ui/react'
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
      <For each={links}>
        {(link) => (
          <Button key={link} as="li" variant="ghost">
            <NavLink to={`/${link}`}>
              {({ isActive }) => (
                <Text color={isActive ? 'blue.600' : ''}>{_.capitalize(link)}</Text>
              )}
            </NavLink>
          </Button>
        )}
      </For>

      <Flex gap="1" flexDir={{ base: 'column', md: 'row' }}>
        {user ? (
          <AuthenticatedActions user={user} logout={logout} />
        ) : (
          <UnauthenticatedActions />
        )}
      </Flex>
    </Flex>
  )
}
