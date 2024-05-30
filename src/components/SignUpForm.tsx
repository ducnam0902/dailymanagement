'use client';
import React from 'react';
import { Button, Label, FileInput } from 'flowbite-react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormField from './FormField';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: File;
}

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password have at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Confirm password have at least 6 characters' })
  // image: z.object()
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match',
      path: ['confirmPassword']
    });
  }
});


const SignUpForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(data.image);
  };
  console.log(errors);
  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="md:flex gap-4 ">
        <div className='md:basis-1/2'>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormField label={'First name'} {...field} />
            )}
          />
        </div>
        <div className='md:basis-1/2'>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormField
                className="justify-stretch"
                label={'Last name'}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FormField label={'Email'} type="email" {...field} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FormField label={'Password'} type="password" {...field} />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => <FormField label={'Confirm password'} {...field} />}
      />
      <Controller
        name="image"
        control={control}
        render={({ field }) => {
          const { name, onChange, ref, onBlur } = field
          return (
            <div id="image" className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="image" value="Upload file" className='text-xs' />
              </div>
              <FileInput
                sizing={'sm'}
                id="image"
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.files)}
              />
            </div>
          )
        }}
      />
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
