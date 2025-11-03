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
import type { Credentials } from '@/types'
import { useNavigate } from 'react-router'
import { useLoginMutation } from '@/store'

export default function Login() {
  const [login, results] = useLoginMutation()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<Omit<Credentials, 'name'>>({
    email: '',
    password: '',
  })

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [ev.target.name]: ev.target.value,
    }))
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()

    login(credentials).finally(() => {
      setCredentials({ email: '', password: '' })
      navigate('/')
    })
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
            name="email"
            placeholder="me@example.com"
            value={credentials.email}
            onChange={handleChange}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <PasswordInput
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </Field.Root>

        <Button type="submit" width="full" disabled={results.isLoading}>
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
