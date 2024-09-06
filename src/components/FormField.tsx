import React from 'react'
import { Label, TextInput, TextInputProps, FileInput } from 'flowbite-react';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { INPUT_TYPE } from '@/utils/constants';

interface IFormField<T extends FieldValues> extends TextInputProps {
    kindOfInput?: INPUT_TYPE,
    name: Path<T>;
    label: string;
    control: Control<T>;
    error: FieldError | undefined;
}

function FormField<T extends FieldValues>({ kindOfInput = INPUT_TYPE.TEXT, name, label, control, error, ...props }: IFormField<T>) {
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
