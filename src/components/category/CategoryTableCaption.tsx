import _ from 'lodash'
import { Button, Flex, Table, Text } from '@chakra-ui/react'
import type { Type } from '@/interfaces'

interface CategoryTableCaptionProps {
  type: Type
  handleCreateCategory: () => void
}

export const CategoryTableCaption = ({
  type,
  handleCreateCategory,
}: CategoryTableCaptionProps) => {
  const tableCaption = _.capitalize(type + 's')

  return (
    <Table.Caption mb="4" captionSide="top" fontSize="md" textAlign="start">
      <Flex alignItems="center" justifyContent="space-between">
        <Text>{tableCaption}</Text>
        <Button onClick={handleCreateCategory} size="xs" variant="outline">
          Add {_.capitalize(type)}
        </Button>
      </Flex>
    </Table.Caption>
  )
}
