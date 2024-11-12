'use client';
import React, { useState } from 'react';
import FormField from './FormField';
import { REPEAT_TYPE } from '@/utils/helper';
import { INPUT_TYPE } from '@/utils/constants';
import { Controller, useFormContext } from 'react-hook-form';
import { ScheduleForm } from '@/utils/formType';
import { Label, TextInput, Checkbox } from 'flowbite-react';
import classNames from 'classnames';
const repeatOptions = Object.keys(REPEAT_TYPE).map((item) => item);
const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thurday',
  'Friday',
  'Saturday',
  'Sunday'
];
function RepeatTypeForm() {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    clearErrors
  } = useFormContext<ScheduleForm>();
  const repeatTypeValue = watch('repeatType');
  const [previousRepeatTypeValue, setPreviousRepeatTypeValue] =
    useState<string>(repeatTypeValue);

  if (repeatTypeValue !== previousRepeatTypeValue) {
    setPreviousRepeatTypeValue(repeatTypeValue);
    setValue(
      'repeatEach',
      repeatTypeValue === REPEAT_TYPE.Weekly ? '' : '1'
    );
  }

  return (
    <>
      <div className="my-8">
        <FormField
          label="Repeat"
          name="repeatType"
          control={control}
          error={errors.repeatType}
          options={repeatOptions}
          kindOfInput={INPUT_TYPE.SELECT}
          className="w-full"
        />
      </div>
      <div className="my-8 flex items-center gap-4">
        {(repeatTypeValue === REPEAT_TYPE.Daily ||
          repeatTypeValue === REPEAT_TYPE.Monthly) && (
          <>
            <Label
              htmlFor={'repeatEach'}
              value={'Repeat every '}
              className="text-md lg:text-lg"
            />
            <Controller
              name={'repeatEach'}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="flex flex-col justify-start">
                  <TextInput
                    type="number"
                    className="w-16 text-right"
                    id={'repeatEach'}
                    color={!!errors?.repeatEach?.message ? 'failure' : 'gray'}
                    helperText={errors?.repeatEach?.message}
                    {...field}
                  />
                </div>
              )}
            />
            <span className="font-medium text-gray-900 dark:text-white text-md lg:text-lg">
              {repeatTypeValue === REPEAT_TYPE.Daily && 'day(s)'}
              {repeatTypeValue === REPEAT_TYPE.Monthly && 'month(s)'}
            </span>
          </>
        )}
        {repeatTypeValue === REPEAT_TYPE.Weekly && (
          <div className="flex items-center">
            <Label
              htmlFor={'repeatEach'}
              value={'Repeat every '}
              className="text-lg pr-4"
            />
            <Controller
              name={'repeatEach'}
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                const { value } = field;
                const data = value.length === 0 ? [] : value.split(', ');
                const onChangeFieldValue = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  if (e.target.checked) {
                    data.push(e.target.id);
                    setValue('repeatEach', data.join(', '));
                  } else {
                    const filterData = data.filter(
                      (item) => item !== e.target.id
                    );
                    setValue('repeatEach', filterData.join(', '));
                  }
                  const newRepeatEachValue = watch('repeatEach');
                  if (newRepeatEachValue.length > 0 && errors?.repeatEach) {
                    clearErrors('repeatEach');
                  }
                };
                return (
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {weekdays.map((item) => (
                      <div key={item}>
                        <Label
                          htmlFor={item}
                          className={classNames(
                            'hover:cursor-pointer flex items-center justify-center border-2 text-xs w-10 h-10  rounded-full p-1 border-solid border-black',
                            {
                              'border-green-500 text-green-500':
                                data.includes(item),
                              'border-red-500 text-red-500': errors?.repeatEach
                            }
                          )}
                        >
                          <p>{item.charAt(0)}</p>
                        </Label>
                        <Checkbox
                          id={item}
                          className="hidden"
                          onChange={onChangeFieldValue}
                          hidden
                        />
                      </div>
                    ))}
                    {errors?.repeatEach && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        {errors.repeatEach.message}
                      </p>
                    )}
                  </div>
                );
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default RepeatTypeForm;
