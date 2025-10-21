import { Outlet } from 'react-router'
import Header from '@/components/Header'
import { Container } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Header />
      <Container as="main" paddingBlock="20" maxWidth="5xl">
        <Outlet />
      </Container>
    </>
  )
}
