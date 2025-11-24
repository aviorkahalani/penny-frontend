import { Field, Textarea } from '@chakra-ui/react'

interface NotesFieldProps {
  notes: string
  setNotes: (notes: string) => void
}

export const NotesField = ({ notes, setNotes }: NotesFieldProps) => {
  return (
    <Field.Root>
      <Field.Label>Notes</Field.Label>
      <Textarea
        placeholder="Add notes here"
        rows={5}
        value={notes}
        onChange={(ev) => setNotes(ev.target.value)}
      />
    </Field.Root>
  )
}
