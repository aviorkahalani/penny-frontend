import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useLoginMutation } from '@/store'
import { Button, Container, VStack, Text } from '@chakra-ui/react'

import { AppLogo } from '@/components/global/AppLogo'
import { TextField } from '@/components/form/TextField'
import { PasswordField } from '@/components/form/PasswordField'
import { FormHeader } from '@/components/form/FormHeader'

export const Login = () => {
  const navigate = useNavigate()
  const [login] = useLoginMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    await login({ email, password })
    navigate('/')
  }

  return (
    <Container as="section" pt="10" maxWidth="lg" m="auto">
      <AppLogo />

      <VStack alignItems="start" as="form" gap="5" onSubmit={handleSubmit}>
        <FormHeader text="login" />

        <TextField label="Email" value={email} setValue={setEmail} />
        <PasswordField label="Password" value={password} setValue={setPassword} />

        <Button type="submit" width="full">
          Login
        </Button>
      </VStack>

      <Text mt="1" textStyle="sm" textAlign="center">
        Don't have an account yet?{' '}
        <Link to="/register" style={{ textDecoration: 'underline' }}>
          register now
        </Link>
      </Text>
    </Container>
  )
}
