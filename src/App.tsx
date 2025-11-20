import { Outlet } from 'react-router'
import { Container } from '@chakra-ui/react'
import { useFetchMeQuery } from '@/store'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function App() {
  // fetch current user (might not be authenticated)
  useFetchMeQuery()

  return (
    <>
      <Header />
      <Container as="main" paddingBlock="20" maxWidth="5xl" height="full">
        <Outlet />
      </Container>
      {/* <Footer /> */}
    </>
  )
}
