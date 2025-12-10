import { Button, Flex, Table, Text } from '@chakra-ui/react'

interface TransactionTableCaptionProps {
  handleCreate: () => void
}

export const TransactionTableCaption = ({
  handleCreate,
}: TransactionTableCaptionProps) => {
  return (
    <Table.Caption mb="4" captionSide="top" fontSize="md" textAlign="start">
      <Flex alignItems="center" justifyContent="space-between">
        <Text>Transactions</Text>
        <Button onClick={handleCreate} size="xs" variant="outline">
          Add Transaction
        </Button>
      </Flex>
    </Table.Caption>
  )
}
