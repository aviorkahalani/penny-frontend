import { Heading, Text, Button, Image, VStack, Stack, Highlight } from '@chakra-ui/react'
import { Link } from 'react-router'

export const Home = () => {
  return (
    <Stack
      flexDirection={{ base: 'column', md: 'row' }}
      as="section"
      justifyContent="space-between"
      alignItems="center"
      gap="10"
    >
      <VStack alignItems="start" gap="4">
        <Heading
          as="h1"
          fontSize={{ base: '4xl', md: '6xl' }}
          lineHeight="normal"
          fontWeight="black"
        >
          <Highlight
            query="FUTURE"
            styles={{ bg: 'colorPalette.muted', color: 'colorPalette.solid' }}
          >
            INVEST IN YOUR FUTURE
          </Highlight>
        </Heading>
        <Text as="p" mb="10" color="fg.muted" fontSize="lg">
          We help you grow your money.
        </Text>
        <Button size="xl" variant="solid" asChild>
          <Link to="/planning">Start Managing Today</Link>
        </Button>
      </VStack>

      <Image w={{ md: '1/2' }} flex="1" src="/illustration.svg" />
    </Stack>
  )
}
