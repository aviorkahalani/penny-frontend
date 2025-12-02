import { HStack, Stack, Skeleton, Separator } from '@chakra-ui/react'

export const BudgetSkeleton = () => {
  const table = (
    <Stack>
      <Skeleton height="6" width="full" />
      <Skeleton height="4" width="full" />
      <Skeleton height="4" width="full" />
      <Skeleton height="4" width="full" />
    </Stack>
  )

  return (
    <Stack gap="5">
      <HStack alignItems="center" justifyContent="space-between">
        <Stack>
          <Skeleton height="8" width="xs" />
          <Skeleton height="3" width="xs" mb="2" />
        </Stack>
        <Skeleton height="8" width="60" />
      </HStack>

      <Separator />

      <Stack gap="10">
        {table}
        {table}
        {table}
      </Stack>
    </Stack>
  )
}
