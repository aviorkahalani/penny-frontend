import { useNavigate } from 'react-router'
import { Card, Text } from '@chakra-ui/react'
import { BudgetActions } from './BudgetActions'
import type { Budget } from '@/interfaces'

interface BudgetPreviewProps {
  budget: Budget
}

export const BudgetPreview = ({ budget }: BudgetPreviewProps) => {
  const navigate = useNavigate()

  const handleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation()
    navigate(`/budget/${budget._id}`)
  }

  const paddedMonth = budget.date.month.toString().padStart(2, '0')

  return (
    <Card.Root onClick={handleClick} cursor="pointer" _hover={{ shadow: 'sm' }}>
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
        <BudgetActions budgetId={budget._id} />
      </Card.Footer>
    </Card.Root>
  )
}
