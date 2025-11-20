import { SegmentGroup } from '@chakra-ui/react'
import type { Currency } from '@/interfaces'

interface CurrencyFieldProps {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

const currencies = ['NIS', 'USD']

export default function CurrencyField({
  currency,
  setCurrency,
}: CurrencyFieldProps) {
  return (
    <SegmentGroup.Root
      defaultValue={currency}
      value={currency}
      onValueChange={(ev) => setCurrency(ev.value as Currency)}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={currencies} />
    </SegmentGroup.Root>
  )
}
