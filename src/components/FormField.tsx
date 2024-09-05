import React from 'react'
import { Label, TextInput, TextInputProps, FileInput } from 'flowbite-react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { INPUT_TYPE } from '@/utils/types';

interface IFormField extends TextInputProps {
    kindOfInput?: INPUT_TYPE,
    name: string;
    label: string;
    control: Control;
    error: FieldError | undefined;
}
const FormField:React.FC<IFormField> = ({ kindOfInput = INPUT_TYPE.TEXT, name, label, control, error, ...props }) => {
  return (
    <div className='mb-2' >
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} className="text-md" />
      </div>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          if (kindOfInput === INPUT_TYPE.FILE) {
            return <FileInput
              id={name}
              color={!!error?.message ? 'failure' : 'gray'}
              helperText={error?.message}
              {...props}
            />
          }

          return <TextInput
            id={name}
            color={!!error?.message ? 'failure' : 'gray'}
            helperText={error?.message}
            {...field}
            {...props}
          />
        }}
      />

    </div>
  )
}

export default FormField
