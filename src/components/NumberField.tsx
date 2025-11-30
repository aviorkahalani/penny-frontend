import { Field, NumberInput } from '@chakra-ui/react'

interface NumberFieldProps {
  value: string
  setValue: (value: string) => void
}

export const NumberField = ({ value, setValue }: NumberFieldProps) => {
  return (
    <Field.Root>
      <Field.Label>Planned Amount</Field.Label>
      <NumberInput.Root
        min={0}
        value={value === '0' ? '' : value}
        onValueChange={(ev) => setValue(ev.value)}
        defaultValue=" "
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
    </Field.Root>
  )
}
