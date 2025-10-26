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

export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
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
        Join Now
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
          <Field.Label>Name</Field.Label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
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
          Join Now
        </Button>

        <Text textStyle="sm">
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'underline' }}>
            Login
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}
