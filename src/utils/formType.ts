import * as z from 'zod';
import { containsAtLeastCharacter, REPEAT_TYPE } from '@/utils/helper';

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
    .refine(value => (containsAtLeastCharacter(value, 'number')), { message: 'Password have at least a number' } )
    .refine(value => (containsAtLeastCharacter(value, 'uppercase')), { message: 'Password have at least an uppercase character' } )
    .refine(value => (containsAtLeastCharacter(value, 'lowercase')), { message: 'Password have at least a lowercase character' } )
    .refine(value => (containsAtLeastCharacter(value, 'specialCharacter')), { message: 'Password have at least a special character' } )
});

export type SignInType = z.infer<typeof signInValidationSchema>;

export type TaskType = {
  id: number,
  task: string,
  isCompleted: boolean,
  createdAt: string,
  updatedAt: string,
  dateCreated: string,
  type: string
}

export type CreateTaskDto = Pick<TaskType, 'task' | 'type'>

export const UpdateTaskValidationSchema = z.object({
  isCompleted: z.boolean()
})

export type CurrentWeekType = {
  startDate: string;
  endDate: string;
}

export const TemplateCreatedFormValidationType = z.object({
  task: z.string({ message: 'Task field is required' }).min(3, { message: 'At least 3 characters' }),
  type: z.string({ message: 'Type is required' }),
  startedAt: z.string({ message: 'Date started is required' }),
  repeatType: z.string({ message: 'Repeat type is required' }),
  repeatEach: z.string()
}).superRefine(({ repeatType, repeatEach }, ctx ) => {
  if (repeatType === REPEAT_TYPE.Daily || repeatType === REPEAT_TYPE.Monthly) {
    if (!Number.isNaN(parseInt(repeatEach, 10)) && Number(repeatEach) <= 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Expected positive number',
        path: ['repeatEach']
      })
    }
  }
  if (repeatType === REPEAT_TYPE.Weekly && repeatEach.length <= 0) {
    ctx.addIssue({
      code: 'custom',
      message: 'Expected at least a weekday',
      path: ['repeatEach']
    })
  }
});;
;

export type ScheduleForm = z.infer<typeof TemplateCreatedFormValidationType>;

export type ScheduleType = {
  id: number,
  createdAt: string,
  updatedAt: string,
  task: string,
  startedAt: string,
  type: string,
  repeatType: string,
  repeatEach: string
}