import { Button, Flex, Table, Text } from '@chakra-ui/react'
import { Link } from 'react-router'

interface TransactionTableCaptionProps {
  budgetId: string
}

export const TransactionTableCaption = ({ budgetId }: TransactionTableCaptionProps) => {
  return (
    <Table.Caption mb="4" captionSide="top" fontSize="md" textAlign="start">
      <Flex alignItems="center" justifyContent="space-between">
        <Text>Transactions</Text>
        <Button asChild size="xs" variant="outline">
          <Link to={`/budget/${budgetId}/transaction`}>Add Transaction</Link>
        </Button>
      </Flex>
    </Table.Caption>
  )
}
