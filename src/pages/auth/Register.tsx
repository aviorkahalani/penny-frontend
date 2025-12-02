import { useState } from 'react'
import { Button, Container, VStack, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router'
import { useRegisterMutation } from '@/store'
import { AppLogo } from '@/components/global/AppLogo'
import { FormHeader } from '@/components/form/FormHeader'
import { TextField } from '@/components/form/TextField'
import { PasswordField } from '@/components/form/PasswordField'

export const Register = () => {
  const navigate = useNavigate()
  const [register] = useRegisterMutation()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    await register({ email, name, password })
    navigate('/')
  }

  return (
    <Container as="section" pt="10" maxWidth="lg" m="auto">
      <AppLogo />

      <VStack alignItems="start" as="form" gap="5" onSubmit={handleSubmit}>
        <FormHeader text="register" />

        <TextField label="Email" value={email} setValue={setEmail} />
        <TextField label="Name" value={name} setValue={setName} />
        <PasswordField
          label="Password"
          value={password}
          setValue={setPassword}
        />

        <Button type="submit" width="full">
          Join Now
        </Button>
      </VStack>

      <Text mt="1" textStyle="sm" textAlign="center">
        Already have an account?{' '}
        <Link to="/login" style={{ textDecoration: 'underline' }}>
          Login
        </Link>
      </Text>
    </Container>
  )
}
