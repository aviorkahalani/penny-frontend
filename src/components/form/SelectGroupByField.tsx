import _ from 'lodash'
import { For, Portal, Select } from '@chakra-ui/react'
import type { ListCollection, SelectValueChangeDetails } from '@chakra-ui/react'

interface SelectGroupByFieldProps {
  collection: ListCollection
  label: string
  value: string
  disabled?: boolean
  setValue: (newValue: string) => void
}

export const SelectGroupByField = ({
  collection,
  label,
  value,
  disabled = false,
  setValue,
}: SelectGroupByFieldProps) => {
  const items = Object.entries(_.groupBy(collection.items, (c) => c.key))

  const handleSelect = (ev: SelectValueChangeDetails) => {
    setValue(ev.value.at(0) || '')
  }

  return (
    <Select.Root
      collection={collection}
      value={[value]}
      onValueChange={handleSelect}
      size="sm"
      width="320px"
      disabled={disabled}
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
            <For each={items}>
              {([category, items]) => (
                <Select.ItemGroup key={category}>
                  <Select.ItemGroupLabel fontSize="xs" color="gray.400">
                    {_.capitalize(category)} categories
                  </Select.ItemGroupLabel>
                  {items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
