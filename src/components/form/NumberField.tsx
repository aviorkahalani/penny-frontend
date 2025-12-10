import _ from 'lodash'
import { Field, NumberInput } from '@chakra-ui/react'

interface NumberFieldProps {
  label: string
  value: string
  setValue: (newValue: string) => void
  required?: boolean
}

export const NumberField = ({
  label,
  value,
  setValue,
  required = false,
}: NumberFieldProps) => {
  return (
    <Field.Root required={required}>
      <Field.Label>{_.capitalize(label)}</Field.Label>
      <NumberInput.Root min={0} value={value} onValueChange={(ev) => setValue(ev.value)}>
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
    </Field.Root>
  )
}
