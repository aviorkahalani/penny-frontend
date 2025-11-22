import { useNavigate } from 'react-router'
import { Card, Skeleton, Text } from '@chakra-ui/react'
import BudgetItemActions from './BudgetItemAction'
import type { Budget } from '@/interfaces'
import { useDeleteBudgetMutation } from '@/store'

interface BudgetListItemProps {
  budget: Budget
  loading: boolean
}

export default function BudgetListItem({
  budget,
  loading,
}: BudgetListItemProps) {
  const [deleteBudget] = useDeleteBudgetMutation()
  const navigate = useNavigate()
  const formatedMonth = budget.date.month.toString().padStart(2, '0')

  const onEdit = () => {
    navigate('/edit/' + budget._id)
  }

  const onDelete = async () => {
    await deleteBudget(budget._id)
  }

  return (
    <Skeleton loading={loading}>
      <Card.Root
        onClick={() => navigate('/budget/' + budget._id)}
        variant="outline"
        cursor="pointer"
        _hover={{ shadow: 'sm' }}
      >
        <Card.Header>
          <Text color="fg.subtle" font="small-caption" fontSize="xs">
            {budget.name.toUpperCase()}
          </Text>
        </Card.Header>
        <Card.Body>
          <Text color="fg.muted" fontWeight="black" fontSize="xl">
            {formatedMonth} / {budget.date.year}
          </Text>
        </Card.Body>
        <Card.Footer display="flex" justifyContent="flex-end">
          <BudgetItemActions onEdit={onEdit} onDelete={onDelete} />
        </Card.Footer>
      </Card.Root>
    </Skeleton>
  )
}
