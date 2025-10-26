import { useState } from 'react'
import {
  Button,
  Container,
  Field,
  Heading,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react'
import { PasswordInput } from '@/components/ui/password-input'
import { Link } from 'react-router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()

    console.log('form submitted.')
  }

  return (
    <Container as="section" pt="10" maxWidth="lg" m="auto">
      <Link className="logo" to="/">
        PENNY
      </Link>

      <Heading as="h1" marginBlock="8">
        Login
      </Heading>

      <VStack as="form" onSubmit={handleSubmit}>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            placeholder="me@example.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <PasswordInput
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </Field.Root>

        <Button type="submit" width="full">
          Login
        </Button>

        <Text textStyle="sm">
          Don't have an account yet?{' '}
          <Link to="/register" style={{ textDecoration: 'underline' }}>
            register now
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}
