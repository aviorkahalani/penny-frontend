import _ from 'lodash'
import { Field, Textarea } from '@chakra-ui/react'

interface TextareaField {
  label: string
  value: string
  setValue: (notes: string) => void
}

export const TextareaField = ({ label, value, setValue }: TextareaField) => {
  return (
    <Field.Root>
      <Field.Label>{_.capitalize(label)}</Field.Label>
      <Textarea
        placeholder="Add notes here"
        rows={5}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </Field.Root>
  )
}
