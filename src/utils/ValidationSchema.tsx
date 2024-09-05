import * as z from 'zod';
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
  image: z.string({ message: 'Image is required' })
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Confirm password did not match with the password',
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