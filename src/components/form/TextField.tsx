import { Field, Input } from '@chakra-ui/react'

interface TextFieldProps {
  label: string
  value: string
  setValue: (newValue: string) => void
}

export const TextField = ({ label, value, setValue }: TextFieldProps) => {
  return (
    <Field.Root required>
      <Field.Label>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Input value={value} onChange={(ev) => setValue(ev.target.value)} />
    </Field.Root>
  )
}
