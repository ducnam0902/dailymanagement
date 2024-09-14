'use client';
import React, { useState } from 'react';

import FormField from './FormField';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import envConfig from '@/utils/config';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/utils/constants';
import { Button } from 'flowbite-react';
import userApi from '@/api/user';
import { handleErrorApiResponse } from '@/utils/helper';
import { INPUT_TYPE } from '@/utils/constants';
import { SignUpType, signUpValidationSchema } from '@/utils/formType';
import { toast } from 'react-toastify';


const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const {
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpValidationSchema)
  });

  const isValidImage = (file: File | null): boolean => {
    if (file && file?.size > MAX_FILE_SIZE) {
      setError('image', { message: 'Max file size is 5MB.' });
      return false;
    }
    if (file && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('image', {
        message: '.jpg, .jpeg, .png and .webp files are accepted.'
      });
      return false;
    }

    return true;
  };

  const uploadAvatarImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const body = formData;
    let result: string = '';
    try {
      const data = await userApi.uploadImage(body);
      result = data.filePath;
    } catch (error) {
      handleErrorApiResponse(error, setError);
    }
    return result;
  }

  const createUser = async (data: SignUpType) => {
    try {
      await userApi.createUser(data);
      toast.success('Sign up successfully')
      router.push('/sign-in');
    } catch (error) {
      handleErrorApiResponse(error, setError);
    }
  }

  const onSubmit = handleSubmit( async (data) => {
    const validImage = isValidImage(file);
    if (validImage) {
      const resultImage: string = await uploadAvatarImage(file as File);
      const payload = {
        ...data,
        image: resultImage
      }

      await createUser(payload);
    }
  });
  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
      <div className="md:flex gap-4 ">
        <div className="md:basis-1/2">
          <FormField
            label="First name"
            name="firstName"
            control={control}
            error={errors.firstName}
          />
        </div>
        <div className="md:basis-1/2">
          <FormField
            label="Last name"
            name="lastName"
            control={control}
            error={errors.lastName}
          />
        </div>
      </div>
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
      <FormField
        label="Confirm password"
        type="password"
        name="confirmPassword"
        control={control}
        error={errors.confirmPassword}
      />
      <div id="image" className="max-w-md">
        <FormField
          kindOfInput={INPUT_TYPE.FILE}
          label="Upload image"
          name="image"
          control={control}
          error={errors.image}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
              setValue('image', envConfig.NEXT_PUBLIC_URL + file.name);
            }
          }}
        />
      </div>
      <Button type="submit" isProcessing={isSubmitting}>Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
