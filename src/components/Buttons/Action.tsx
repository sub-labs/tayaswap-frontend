'use client'
import { Button, type ButtonProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface IActionButton extends ButtonProps {
  icon?: ReactNode
  text: string
  onClickHandler: () => void
  height?: string
}

export function ActionButton({ height = '45px', text, icon, onClickHandler, ...props }: IActionButton) {
  return (
    <Button
      onClick={onClickHandler}
      variant="outline"
      height={height}
      background="accent-button-background"
      color="accent-button-color"
      border="1px solid"
      fontSize="16px"
      borderColor="custom-blue"
      pr={icon ? 5 : undefined}
      _hover={{ background: 'custom-blue', color: 'white' }}
      {...props}
    >
      {icon && icon} {text}
    </Button>
  )
}
