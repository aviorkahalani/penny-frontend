import { Box, Button, Menu, Portal } from '@chakra-ui/react'
import { DotsThreeIcon, TrashIcon } from '@phosphor-icons/react'

interface CategoryTableRowActionsProps {
  categoryId: string
  handleDelete: (categoryId: string) => void
}

export const CategoryTableRowActions = ({
  categoryId,
  handleDelete,
}: CategoryTableRowActionsProps) => {
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
            <Menu.Item
              value="delete"
              color="red"
              onClick={() => handleDelete(categoryId)}
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
