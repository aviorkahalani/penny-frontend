import { Field, Input } from '@chakra-ui/react'

interface TextFieldProps {
  label: string
  value: string
  setValue: (newValue: string) => void
  required?: boolean
}

export const TextField = ({
  label,
  value,
  setValue,
  required = true,
}: TextFieldProps) => {
  return (
    <Field.Root required={required}>
      <Field.Label>
        {label}
        {required && <Field.RequiredIndicator />}
      </Field.Label>
      <Input value={value} onChange={(ev) => setValue(ev.target.value)} />
    </Field.Root>
  )
}
