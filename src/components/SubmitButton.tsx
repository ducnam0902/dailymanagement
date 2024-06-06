'use client'

import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from 'flowbite-react';

interface ISubmitButton extends ButtonProps {
    children: React.ReactNode
};

export function SubmitButton({ children, ...rest }: ISubmitButton) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" isProcessing={pending} disabled={pending} {...rest}>
      {children}
    </Button>
  )
}