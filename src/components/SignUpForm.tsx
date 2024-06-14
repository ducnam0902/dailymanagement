'use client';
import React, { useState } from 'react';
import FormField from './FormField';
import { signUp } from '@/actions/user.action';
import { Label, FileInput } from 'flowbite-react';
import { SubmitButton } from './SubmitButton';
import { signUpValidationSchema } from '@/utils/ValidationSchema';
import { SignUpParams } from '@/utils/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { uploadImageToCloudiary } from '@/api/user';

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
  const navigate = useRouter();

  const validateData = (formData: FormData):boolean => {
    const validatedFields = signUpValidationSchema.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      image: formData.get('image'),
      confirmPassword: formData.get('confirmPassword')
    });
    if (!validatedFields.success) {
      const flattenField = validatedFields.error.flatten().fieldErrors;
      const errorField:SignUpErrorField = Object.keys(flattenField)
        .reduce((total: SignUpErrorField, item) => ({ ...total, [item]: flattenField[item as keysOfProps] }), {});
      setErrors(errorField);
      return false;
    }
    setErrors({});
    return true;
  }

  const handleSignUp = async (formData: FormData) => {
    const isValidData = validateData(formData);
    if (isValidData) {
      try {
        const uploadedImage = await uploadImageToCloudiary(formData.get('image') as File);
        const data: SignUpParams= {
          firstName: formData.get('firstName') as string,
          lastName: formData.get('lastName') as string,
          image: uploadedImage.data,
          email: formData.get('email') as string,
          password:  formData.get('password') as string
        }
        const responseSignUp = await signUp(data);
        if (responseSignUp === '201') {
          toast.success('Created user successfully!');
          navigate.push('/sign-in')
        } else {
          throw Error('Something went wrong when sign up user');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong when sign up user');
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
