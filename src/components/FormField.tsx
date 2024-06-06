import React from 'react'
import { Label, TextInput, TextInputProps } from 'flowbite-react';

interface IFormField extends TextInputProps {
    name: string;
    label: string;
}

const FormField: React.FC<IFormField> = ({ name, label, ...props }) => {
  return (
    <div>
      <div className="mb-1 block">
        <Label htmlFor={name} value={label} className='text-xs' />
      </div>
      <TextInput sizing="sm" id={name} required {...props}/>
    </div>
  )
}

export default FormField
