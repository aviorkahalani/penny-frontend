import { useNavigate } from 'react-router'
import { useDeleteBudgetMutation } from '@/store'
import { Box, Button, Card, Menu, Portal, Text } from '@chakra-ui/react'
import { DotsThreeIcon, PenIcon, TrashIcon } from '@phosphor-icons/react'
import type { Budget } from '@/interfaces'

interface BudgetPreviewProps {
  budget: Budget
}

export const BudgetPreview = ({ budget }: BudgetPreviewProps) => {
  const navigate = useNavigate()
  const [deleteBudget] = useDeleteBudgetMutation()

  const handleEdit = () => {
    navigate(`/edit/${budget._id}`)
  }

  const handleDelete = () => {
    deleteBudget(budget._id)
  }

  const paddedMonth = budget.date.month.toString().padStart(2, '0')

  return (
    <Card.Root onClick={() => {}} cursor="pointer" _hover={{ shadow: 'sm' }}>
      <Card.Header>
        <Text color="fg.subtle" fontSize="xs">
          {budget.name.toUpperCase()}
        </Text>
      </Card.Header>
      <Card.Body>
        <Text color="fg.muted" fontWeight="black" fontSize="xl">
          {paddedMonth} / {budget.date.year}
        </Text>
      </Card.Body>
      <Card.Footer display="flex" justifyContent="flex-end">
        <Menu.Root closeOnSelect variant="subtle">
          <Menu.Trigger asChild>
            <Button variant="ghost" onClick={(ev) => ev.stopPropagation()}>
              <DotsThreeIcon />
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
      </Card.Footer>
    </Card.Root>
  )
}
