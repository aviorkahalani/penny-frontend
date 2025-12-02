import { SimpleGrid, Skeleton } from '@chakra-ui/react'

export const BudgetListSkeleton = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="1">
      <Skeleton h={250} />
      <Skeleton />
      <Skeleton />
    </SimpleGrid>
  )
}
