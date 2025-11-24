import { Box, Button, Menu, Portal } from '@chakra-ui/react'
import {
  DotsThreeIcon,
  CopyIcon,
  PenIcon,
  TrashIcon,
} from '@phosphor-icons/react'

interface BudgetItemActionsProps {
  onEdit: () => void
  onDelete: () => void
}

export const BudgetItemActions = ({
  onEdit,
  onDelete,
}: BudgetItemActionsProps) => {
  const handleDuplicate = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation()
  }

  const handleEdit = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation()
    onEdit()
  }

  const handleDelete = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation()
    onDelete()
  }

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
            <Menu.Item value="duplicate" onClick={handleDuplicate}>
              <CopyIcon />
              <Box flex="1">Duplicate</Box>
            </Menu.Item>
            <Menu.Item value="edit" onClick={handleEdit}>
              <PenIcon />
              <Box flex="1">Edit</Box>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item value="delete" color="red" onClick={handleDelete}>
              <TrashIcon />
              <Box flex="1">Delete</Box>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
