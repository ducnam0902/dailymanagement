'use client';
import React, { useState } from 'react';
import FormField from './FormField';
import { signUp } from '@/actions/user.action';
import { Label, FileInput } from 'flowbite-react';
import { SubmitButton } from './SubmitButton';
import { signUpValidationSchema } from '@/utils/ValidationSchema';
import { uploadImageToCloudiary } from '@/api/user';
import { SignUpParams, statusMessage } from '@/utils/types';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

interface SignUpErrorField {
  firstName?: string[],
  lastName?: string[],
  email?: string[],
  password?: string[],
  confirmPassword?: string[],
  image?: string[],
}

type keysOfProps = keyof SignUpErrorField;

const SignUpForm: React.FC = () => {
  const [errors, setErrors] = useState<SignUpErrorField>({});


  const handleSignUp = async (formData: FormData) => {
    let data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      image: formData.get('image')
    };

    const validatedFields = signUpValidationSchema.safeParse({
      ...data,
      confirmPassword: formData.get('confirmPassword')
    });
    if (!validatedFields.success) {
      const flattenField = validatedFields.error.flatten().fieldErrors;
      const errorField:SignUpErrorField = Object.keys(flattenField)
        .reduce((total: SignUpErrorField, item) => ({ ...total, [item]: flattenField[item as keysOfProps] }), {});
      setErrors(errorField);
    } else {
      setErrors({});
      const uploadedImage = await uploadImageToCloudiary(data.image as File);
      if (uploadedImage.status === statusMessage.OK) {
        data.image = uploadedImage.data ?? '';
        const responseSignUp = await signUp(data as SignUpParams);
        if (responseSignUp.status === statusMessage.OK) {
          toast.success('Created user successfully!');
          redirect('/sign-in')
        } else {
          toast.error(responseSignUp.error);
        }
      } else {
        toast.error('Something went wrong!');
      }

    }
  };
  return (
    <form
      className="flex max-w-md flex-col gap-4"
      action={handleSignUp}
    >
      <div className="md:flex gap-4 ">
        <div className='md:basis-1/2'>
          <FormField name='firstName' label='First name' errorState={errors?.firstName}/>
        </div>
        <div className='md:basis-1/2'>
          <FormField name='lastName' label='Last name' errorState={errors?.lastName}/>
        </div>
      </div>
      <FormField name='email' label='Email' type="email" errorState={errors?.email}/>
      <FormField name='password' label='Password' type="password" errorState={errors?.password}/>
      <FormField name='confirmPassword' label='Confirm password' type="password" errorState={errors?.confirmPassword}/>
      <div id="image" className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="image" value="Upload file" className="text-md" />
        </div>
        <FileInput
          id="image"
          name={'image'}
          color={ !!errors.image && errors.image[0] !== '' ? 'failure' : 'gray'}
          helperText={
            errors?.image &&
          <>
            <span className="font-medium">{errors.image.join('\n')}</span>
          </>
          }
        />
      </div>
      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
};

export default SignUpForm;
