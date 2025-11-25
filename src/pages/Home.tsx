import { Heading, Text, Button, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'

export const Home = () => {
  return (
    <section>
      <VStack mb="10" alignItems="start" gap="4" maxWidth="md">
        <Heading as="h1" fontSize="3xl">
          Manage Your Finances with Confidence
        </Heading>
        <Text as="p">
          Streamline your budgeting, track expenses effortlessly, and gain clear
          insights into your financial health — all in one platform
        </Text>
      </VStack>
      <Button size="xl" variant="solid" asChild>
        <Link to="/planning">Start Managing Today</Link>
      </Button>
    </section>
  )
}
