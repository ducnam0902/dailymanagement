import React from 'react';
import {
  Label,
  TextInput,
  TextInputProps,
  FileInput,
  Select,
  Checkbox,
  Datepicker
} from 'flowbite-react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path
} from 'react-hook-form';
import { INPUT_TYPE } from '@/utils/constants';
import { formatDate } from '@/utils/helper';
import moment from 'moment';

interface IFormField<T extends FieldValues> extends TextInputProps {
  kindOfInput?: INPUT_TYPE;
  name: Path<T>;
  label?: string;
  control: Control<T>;
  options?: string[];
  error?: FieldError | undefined;
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
          <Label htmlFor={name} value={label} className="text-md lg:text-lg" />
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

          if (kindOfInput === INPUT_TYPE.CHECKBOX) {
            const { theme, ...checkboxProps } = props;
            return (
              <>
                <Checkbox id={name}
                  {...field}
                  {...checkboxProps}
                />
                <Label htmlFor={name}>{label}</Label>
              </>

            );
          }

          if (kindOfInput === INPUT_TYPE.DATEPICKER) {
            const { theme, ...datePickerProps } = props;
            const onChangeDatePicker = (date: Date) => {
              field.onChange(formatDate(moment(date), 'DD MMMM YYYY'));
            }
            return (
              <Datepicker
                id={name}
                minDate={ new Date()}
                showClearButton={false}
                showTodayButton={false}
                weekStart={1}
                theme={{
                  popup: {
                    root: {
                      inner: 'inline-block rounded-lg bg-white md:p-4 shadow-lg dark:bg-gray-700'
                    }
                  }
                }}
                {...field}
                {...datePickerProps}
                onSelectedDateChanged={onChangeDatePicker}
              />
            )
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
