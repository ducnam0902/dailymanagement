import * as z from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/utils/constants';
import { containsAtLeastCharacter } from '@/utils/helper';

export const signUpValidationSchema = z.object({
  firstName: z.string()
    .refine(value => value.length > 0, { message: 'First name is required field' })
    .refine( value => !containsAtLeastCharacter(value, 'specialCharacter'), { message: 'First name must not have special characters' } ),
  lastName: z.string()
    .refine(value => value.length > 0, { message: 'Last name is required field' })
    .refine( value => !containsAtLeastCharacter(value, 'specialCharacter'), { message: 'Last name must not have special characters' } ),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(6, { message: 'Password have at least 6 characters' })
    .refine(value => (containsAtLeastCharacter(value, 'number')), { message: 'Password have at least a number' } )
    .refine(value => (containsAtLeastCharacter(value, 'uppercase')), { message: 'Password have at least an uppercase character' } )
    .refine(value => (containsAtLeastCharacter(value, 'lowercase')), { message: 'Password have at least a lowercase character' } )
    .refine(value => (containsAtLeastCharacter(value, 'specialCharacter')), { message: 'Password have at least a special character' } ),
  confirmPassword: z.string().min(6, { message: 'Confirm password have at least 6 characters' }),
  image: z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: '.jpg, .jpeg, .png and .webp files are accepted.'
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'Max file size is 5MB.'
    })
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match',
      path: ['confirmPassword']
    });
  }
});

export type SignUpType = z.infer<typeof signUpValidationSchema>;
export const signInValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password have at least 6 characters' })
});

export type SignInParams = z.infer<typeof signInValidationSchema>;