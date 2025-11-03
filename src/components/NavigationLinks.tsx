import type { ILink } from '@/interfaces'
import { useFetchMeQuery, useLogoutMutation } from '@/store'
import { Button, Flex, Skeleton } from '@chakra-ui/react'
import { Link } from 'react-router'
import _ from 'lodash'

export default function NavigationLinks() {
  const { data: user, error, isLoading } = useFetchMeQuery()
  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    logout()
  }

  const links: ILink[] = [
    { to: 'planning', label: 'Planning', variant: 'ghost' },
    { to: 'tracking', label: 'Tracking', variant: 'ghost' },
    { to: 'dashboard', label: 'Dashboard', variant: 'ghost' },
  ]

  const authButtons = (
    <>
      <Button variant="subtle" as="li">
        <Link to="/login">Login</Link>
      </Button>

      <Button variant="solid" as="li">
        <Link to="/register">Join Now</Link>
      </Button>
    </>
  )

  let content: React.ReactNode = authButtons
  if (isLoading) {
    content = <Skeleton height="5" />
  } else if (error) {
    content = authButtons
  } else if (user) {
    const [name] = user.name.split(' ')
    content = (
      <>
        <Button variant="subtle" as="li" onClick={handleLogout}>
          <Link to="/">Logout</Link>
        </Button>

        <Button variant="solid" as="li">
          <Link to="/profile">{_.capitalize(name)}</Link>
        </Button>
      </>
    )
  }

  return (
    <Flex as="ul" gap="1" direction={{ base: 'column', md: 'row' }}>
      {links.map((link) => (
        <Button key={link.label} variant={link.variant} as="li">
          <Link to={link.to}>{link.label}</Link>
        </Button>
      ))}

      {content}
    </Flex>
  )
}
