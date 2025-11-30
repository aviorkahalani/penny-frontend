import { useState } from 'react'
import { PlusIcon } from '@phosphor-icons/react'
import { Button, CloseButton, Dialog, Portal, Stack } from '@chakra-ui/react'
import { useCreateCategoryMutation } from '@/store'
import { NameField } from './NameField'
import { NumberField } from './NumberField'
import { TypeField } from './TypeField'
import type { Type } from '@/interfaces'

interface CategoryCreateDialogProps {
  budgetId: string
}

export const CategoryCreateDialog = ({
  budgetId,
}: CategoryCreateDialogProps) => {
  const [createCategory] = useCreateCategoryMutation()

  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string | null>(null)
  const [plannedAmount, setPlannedAmount] = useState<string>('')

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    await createCategory({
      budgetId,
      name,
      type: type as Type,
      plannedAmount: parseInt(plannedAmount),
    }).unwrap()

    setName('')
    setType(null)
    setPlannedAmount('')
  }

  return (
    <Dialog.Root
      size={{ mdDown: 'full', md: 'sm' }}
      placement="top"
      motionPreset="scale"
    >
      <Dialog.Trigger asChild>
        <Button variant="subtle" size="sm">
          <PlusIcon /> Create Category
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create Category</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack as="form" onSubmit={handleSubmit} gap="4">
                <NameField name={name} setName={setName} />

                <TypeField type={type} setType={setType} />
                <NumberField
                  value={plannedAmount}
                  setValue={(value) => setPlannedAmount(value)}
                />

                <Button type="submit" onClick={() => {}}>
                  Create Category
                </Button>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
