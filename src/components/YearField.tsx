import { Portal, Select } from '@chakra-ui/react'
import { createCollection } from '@/utils/helpers'

interface YearFieldProps {
  year: string[]
  setYear: (years: string[]) => void
}

const currentYear = new Date().getFullYear().toString()
const years = createCollection(Number(currentYear), Number(currentYear) + 5)

export const YearField = ({ year, setYear }: YearFieldProps) => {
  return (
    <Select.Root
      collection={years}
      value={year}
      onValueChange={(ev) => setYear([ev.items[0].value])}
      width="200px"
    >
      <Select.HiddenSelect />
      <Select.Label>Select Year</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Year" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {years.items.map((year) => (
              <Select.Item item={year} key={year.value}>
                {year.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
