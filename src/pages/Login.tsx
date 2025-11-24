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
import { toaster } from '@/components/ui/toaster'
import { Link } from 'react-router'
import type { Credentials, User } from '@/interfaces'
import { useNavigate } from 'react-router'
import { useLoginMutation } from '@/store'
import { AppLogo } from '@/components/AppLogo'

const options = {
  duration: 2000,
  closable: true,
}

export const Login = () => {
  const [login, { isLoading }] = useLoginMutation()
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

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    await login(credentials)
      .unwrap()
      .then((user: User) => {
        setCredentials({ email: '', password: '' })
        toaster.create({
          ...options,
          type: 'success',
          description: `${user.name}, Good the have you back`,
        })
        navigate('/')
      })
  }

  return (
    <Container as="section" pt="10" maxWidth="lg" m="auto">
      <AppLogo />

      <Heading as="h1" marginBlock="8">
        Login
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
            Password
            <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </Field.Root>

        <Button type="submit" width="full" disabled={isLoading}>
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
