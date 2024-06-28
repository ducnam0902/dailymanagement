'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from 'flowbite-react';
import FieldController from './FieldController';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInValidationSchema } from '@/utils/ValidationSchema';

interface IFormInput {
  email: string
  password: string
}

const SignInForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(signInValidationSchema)
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // const response = await signIn('credentials', {
    //   email: data.email,
    //   password: data.password,
    //   callbackUrl: '/',
    //   redirect: false
    // });
    // console.log(response);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldController name='email' label='Email' control={control} error={errors.email?.message}/>
      <FieldController name='password' label='Password' control={control} error={errors.password?.message} type='password'/>
      <Button className='w-full' type='submit' isProcessing={isSubmitting} >Sign In</Button>
    </form>
  )
}

export default SignInForm
