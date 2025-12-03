import { Field } from '@chakra-ui/react'
import { PasswordInput } from '../ui/password-input'

interface PasswordFieldProps {
  label: string
  value: string
  setValue: (newValue: string) => void
}

export const PasswordField = ({ label, value, setValue }: PasswordFieldProps) => {
  return (
    <Field.Root required>
      <Field.Label>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <PasswordInput value={value} onChange={(ev) => setValue(ev.target.value)} />
    </Field.Root>
  )
}
