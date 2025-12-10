import { Box, Button, Menu, Portal } from '@chakra-ui/react'
import { DotsThreeIcon, TrashIcon, PenIcon } from '@phosphor-icons/react'

interface TransactionTableRowActionsProps {
  transactionId: string
  handleUpdate: (transactionId: string) => void
  handleDelete: (transactionId: string) => void
}

export const TransactionTableRowActions = ({
  transactionId,
  handleUpdate,
  handleDelete,
}: TransactionTableRowActionsProps) => {
  return (
    <Menu.Root closeOnSelect variant="subtle">
      <Menu.Trigger asChild>
        <Button variant="ghost" onClick={(ev) => ev.stopPropagation()}>
          <DotsThreeIcon />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="edit" onClick={() => handleUpdate(transactionId)}>
              <PenIcon />
              <Box flex="1">Edit</Box>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item
              value="delete"
              color="red"
              onClick={() => handleDelete(transactionId)}
            >
              <TrashIcon />
              <Box flex="1">Delete</Box>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
