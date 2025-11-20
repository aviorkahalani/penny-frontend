import { Button } from '@chakra-ui/react'

interface SubmitButtonProps {
  text: string
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <Button type="submit" variant="solid">
      {text}
    </Button>
  )
}
