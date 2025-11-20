import { Field, Input } from '@chakra-ui/react'

interface NameFieldProps {
  name: string
  setName: (name: string) => void
}

export default function NameField({ name, setName }: NameFieldProps) {
  return (
    <Field.Root required>
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        name="name"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
    </Field.Root>
  )
}
