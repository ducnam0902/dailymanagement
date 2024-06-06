import React from 'react'
import { Label, TextInput, TextInputProps } from 'flowbite-react';
interface IFormField extends TextInputProps {
    name: string;
    label: string;
    errorState: string[] | undefined
}
const FormField:React.FC<IFormField> = ({ name, label, errorState, ...props }) => {
  return (
    <div className='mb-2' >
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} className="text-md" />
      </div>
      <TextInput
        name={name}
        id={name}
        color={!!errorState && errorState[0] !== '' ? 'failure' : 'gray'}
        helperText={errorState && errorState[0]}
        {...props}
      />
    </div>
  )
}

export default FormField
