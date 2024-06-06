'use server';
import { signUpUser, signInUser } from '@/api/user';
import {
  signInValidationSchema,
  SignInParams
} from '@/utils/ValidationSchema';
import { ResponseAPI, SignUpParams } from '@/utils/types';

export const signUp = async (data: SignUpParams): Promise<ResponseAPI<string>> => {
  const signUpUserStatus = await signUpUser(data);
  return signUpUserStatus;

};

export const signIn = async (prevState: any, formData: FormData) => {
  const validatedFields = signInValidationSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const { email, password } = validatedFields.error.flatten().fieldErrors;
    return {
      email: email,
      password: password
    };
  }
  const payload = {
    email: formData.get('email'),
    password: formData.get('password')
  };
  const response = await signInUser(payload as SignInParams);
  // if (response?.accessToken) {
  //   redirect('/')
  // }

};
