import _ from 'lodash'
import { For, Portal, Select } from '@chakra-ui/react'
import type { ListCollection, SelectValueChangeDetails } from '@chakra-ui/react'

interface SelectFieldProps {
  collection: ListCollection
  label: string
  value: string
  setValue: (newValue: string) => void
}

export const SelectField = ({ collection, label, value, setValue }: SelectFieldProps) => {
  const handleSelect = (ev: SelectValueChangeDetails) => {
    setValue(ev.value.at(0) || '')
  }

  return (
    <Select.Root
      collection={collection}
      width="320px"
      value={[value]}
      onValueChange={handleSelect}
    >
      <Select.HiddenSelect />
      <Select.Label>{_.capitalize(label)}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={_.capitalize(label)} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <For each={collection.items}>
              {(item) => (
                <Select.Item key={item.value} item={item}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
