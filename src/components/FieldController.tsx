import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Label, TextInput, TextInputProps } from 'flowbite-react';

interface IFormControllerField<T extends FieldValues> extends TextInputProps {
    name: Path<T>
    label: string
    control: Control<T>
    error: string | undefined
}

const FieldController = <T extends FieldValues> ({ name, control, error, label, ...props }: IFormControllerField<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className='mb-2' >
            <div className="mb-2 block">
              <Label htmlFor={name} value={label} className="text-md" />
            </div>
            <TextInput
              id={name}
              color={error ? 'failure' : 'gray'}
              helperText={error}
              {...field}
              {...props}
            />
          </div>)}
      />
    </>
  )
}

export default FieldController