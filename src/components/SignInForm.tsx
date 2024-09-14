'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import FormField from './FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import { SignInType, signInValidationSchema } from '@/utils/formType';
import userApi from '@/api/user';
import { handleErrorApiResponse } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/AppProvider';
import { toast } from 'react-toastify';


const SignInForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignInType>({
    resolver: zodResolver(signInValidationSchema)
  });

  const router = useRouter();
  const { setUser } = useAppContext();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await userApi.signIn(data);
      const result = await userApi.signInServer(response);
      if (result.ok) {
        setUser(response);
        toast.success('Sign in successfully')
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      handleErrorApiResponse(error, setError);
    }

  });

  return (
    <form onSubmit={onSubmit}>
      <FormField
        label="Email"
        type="email"
        name="email"
        control={control}
        error={errors.email}
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        control={control}
        error={errors.password}
      />
      <Button className='mt-6 w-full' type="submit" isProcessing={isSubmitting}>Sign In</Button>
    </form>
  )
}

export default SignInForm
