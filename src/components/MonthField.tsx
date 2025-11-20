import { Portal, Select } from '@chakra-ui/react'
import { createCollectionList } from '@/utils/helpers'

interface MonthFieldProps {
  month: string[]
  setMonth: (months: string[]) => void
}

const months = createCollectionList(1, 12)

export default function MonthField({ month, setMonth }: MonthFieldProps) {
  return (
    <Select.Root
      collection={months}
      value={month}
      onValueChange={(ev) => setMonth([ev.items[0].value])}
      width="200px"
    >
      <Select.HiddenSelect />
      <Select.Label>Select Month</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Month" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {months.items.map((month) => (
              <Select.Item item={month} key={month.value}>
                {month.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
