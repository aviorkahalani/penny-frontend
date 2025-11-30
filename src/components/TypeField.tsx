import { HStack, RadioCard } from '@chakra-ui/react'

interface TypeFieldProps {
  type: string | null
  setType: (type: string | null) => void
}

const items = [
  { title: 'Income', value: 'income' },
  { title: 'Expense', value: 'expense' },
  { title: 'Saving', value: 'saving' },
]

export const TypeField = ({ type, setType }: TypeFieldProps) => {
  return (
    <RadioCard.Root
      value={type}
      onValueChange={(ev) => setType(ev.value)}
      defaultValue="Income"
    >
      <RadioCard.Label>Select Type</RadioCard.Label>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  )
}
