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
import { Link, useNavigate } from 'react-router'
import { useRegisterMutation } from '@/store'
import type { Credentials } from '@/interfaces'
import { AppLogo } from '@/components/AppLogo'

export default function Register() {
  const [register, results] = useRegisterMutation()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    name: '',
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

    register(credentials)
      .unwrap()
      .finally(() => {
        setCredentials({ email: '', name: '', password: '' })
        navigate('/')
      })
  }

  return (
    <Container as="section" pt="10" maxWidth="lg" m="auto">
      <AppLogo />

      <Heading as="h1" marginBlock="8">
        Join Now
      </Heading>

      <VStack as="form" gap="5" onSubmit={handleSubmit}>
        <Field.Root required>
          <Field.Label>
            Email
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            name="email"
            placeholder="me@example.com"
            value={credentials.email}
            onChange={handleChange}
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label>
            Name
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            name="name"
            placeholder="John Doe"
            value={credentials.name}
            onChange={handleChange}
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label>
            Password
            <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </Field.Root>

        <Button type="submit" width="full" disabled={results.isLoading}>
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
