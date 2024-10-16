import React from 'react';
import {
  Label,
  TextInput,
  TextInputProps,
  FileInput,
  Select
} from 'flowbite-react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path
} from 'react-hook-form';
import { INPUT_TYPE } from '@/utils/constants';

interface IFormField<T extends FieldValues> extends TextInputProps {
  kindOfInput?: INPUT_TYPE;
  name: Path<T>;
  label?: string;
  control: Control<T>;
  options?: string[];
  error: FieldError | undefined;
}

function FormField<T extends FieldValues>({
  kindOfInput = INPUT_TYPE.TEXT,
  name,
  label,
  control,
  error,
  options,
  ...props
}: IFormField<T>) {
  return (
    <div className="mb-2">
      {label && (
        <div className="mb-2 block">
          <Label htmlFor={name} value={label} className="text-lg" />
        </div>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          if (kindOfInput === INPUT_TYPE.FILE) {
            return (
              <FileInput
                id={name}
                color={!!error?.message ? 'failure' : 'gray'}
                helperText={error?.message}
                {...props}
              />
            );
          }

          if (kindOfInput === INPUT_TYPE.SELECT) {
            return (
              <Select id={name} {...field}>
                {options?.map((item: string) => (
                  <option key={item?.toString()}>{item}</option>
                ))}
              </Select>
            );
          }

          return (
            <TextInput
              id={name}
              color={!!error?.message ? 'failure' : 'gray'}
              helperText={error?.message}
              {...field}
              {...props}
            />
          );
        }}
      />
    </div>
  );
}

export default FormField;
