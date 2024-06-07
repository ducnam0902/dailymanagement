'use client'
import { signIn } from '@/actions/user.action';
import { Button } from 'flowbite-react';
import React from 'react';
import { useFormState } from 'react-dom';
import FormField from './FormField';
import { SubmitButton } from './SubmitButton';

const initialState = {
  email: [''],
  password: ['']
}

const SignInForm = () => {
  const [state, formAction] = useFormState(signIn, initialState);
  return (
    <form action={formAction}>
      <FormField name='email' label='Email' errorState={state?.email}/>
      <FormField name='password' label='Password' errorState={state?.password} type='password'/>

      <SubmitButton type="submit" className='mt-8 w-full'>Sign In</SubmitButton>
    </form>
  )
}

export default SignInForm
