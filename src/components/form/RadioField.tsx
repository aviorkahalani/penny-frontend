import _ from 'lodash'
import { For, HStack, Icon, RadioCard } from '@chakra-ui/react'
import type { RadioGroupValueChangeDetails } from '@chakra-ui/react'

interface RadioFieldProps {
  items: { value: string; title: string; icon: React.ReactNode }[]
  label: string
  value: string
  setValue: (newValue: string) => void
}

export const RadioField = ({ items, label, value, setValue }: RadioFieldProps) => {
  const handleValueChange = (ev: RadioGroupValueChangeDetails) => {
    setValue(ev.value as string)
  }

  return (
    <RadioCard.Root value={value} onValueChange={handleValueChange}>
      <RadioCard.Label>{_.capitalize(label)}</RadioCard.Label>
      <HStack align="stretch">
        <For each={items}>
          {(item) => (
            <RadioCard.Item key={item.value} value={item.value}>
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <Icon fontSize="xl" color="fg.subtle">
                  {item.icon}
                </Icon>
                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
              </RadioCard.ItemControl>
            </RadioCard.Item>
          )}
        </For>
      </HStack>
    </RadioCard.Root>
  )
}
