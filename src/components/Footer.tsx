import { Text, Container } from '@chakra-ui/react'

export default function Footer() {
  return (
    <footer>
      <Container
        display="flex"
        paddingBlock="4"
        maxWidth="5xl"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>&copy; 2025. Made by Avior Kahalani.</Text>
      </Container>
    </footer>
  )
}
