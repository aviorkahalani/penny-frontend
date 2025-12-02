import _ from 'lodash'
import { Heading } from '@chakra-ui/react'

interface FormHeaderProps {
  text: string
}

export const FormHeader = ({ text }: FormHeaderProps) => {
  return (
    <Heading as="h1" mt="4">
      {_.capitalize(text)}
    </Heading>
  )
}
