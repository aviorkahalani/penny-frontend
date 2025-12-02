import _ from 'lodash'
import { Portal, Select } from '@chakra-ui/react'
import type { ListCollection, SelectValueChangeDetails } from '@chakra-ui/react'

interface SelectFieldProps {
  collection: ListCollection
  label: string
  value: string
  setValue: (newValue: string) => void
}

export const SelectField = ({
  collection,
  label,
  value,
  setValue,
}: SelectFieldProps) => {
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
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
