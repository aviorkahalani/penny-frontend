import { Button } from '@chakra-ui/react'

interface SubmitButtonProps {
  text: string
}

export const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <Button type="submit" variant="solid">
      {text}
    </Button>
  )
}
