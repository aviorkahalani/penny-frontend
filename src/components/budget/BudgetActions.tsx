import { useNavigate } from 'react-router'
import { useDeleteBudgetMutation } from '@/store'
import { Box, Button, Menu, Portal, Text } from '@chakra-ui/react'
import { ListIcon, PenIcon, TrashIcon } from '@phosphor-icons/react'

interface BudgetActionsProps {
  budgetId: string
}

export const BudgetActions = ({ budgetId }: BudgetActionsProps) => {
  const navigate = useNavigate()
  const [deleteBudget] = useDeleteBudgetMutation()

  const handleEdit = (ev: React.MouseEvent) => {
    ev.stopPropagation()

    navigate(`/edit/${budgetId}`)
  }

  const handleDelete = async (ev: React.MouseEvent) => {
    ev.stopPropagation()
    await deleteBudget(budgetId).unwrap()
    navigate('/planning')
  }

  return (
    <Menu.Root closeOnSelect variant="subtle">
      <Menu.Trigger asChild>
        <Button variant="subtle" onClick={(ev) => ev.stopPropagation()}>
          <ListIcon />
          <Text>Menu</Text>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
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
