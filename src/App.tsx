import { Outlet } from 'react-router'
import { Container, Flex } from '@chakra-ui/react'
import { useFetchMeQuery } from '@/store'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const App = () => {
  // fetch current user (might not be authenticated)
  useFetchMeQuery()

  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Container as="main" paddingBlock="20" maxWidth="5xl" flex="1">
        <Outlet />
      </Container>
      <Footer />
    </Flex>
  )
}
