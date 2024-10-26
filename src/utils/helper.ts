import { EntityError, HttpError } from '@/lib/http';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SignUpType } from './formType';
import moment from 'moment';
type allType = 'uppercase' | 'lowercase' | 'number' | 'specialCharacter';

export const containsAtLeastCharacter = (
  ch: string,
  type: allType
): boolean => {
  const upperCaseReg = new RegExp('[A-Z]');
  const lowerCaseReg = new RegExp('[a-z]');
  const numberReg = new RegExp('[0-9]');
  const specialReg = new RegExp(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/);
  switch (type) {
  case 'uppercase':
    return upperCaseReg.test(ch);
  case 'lowercase':
    return lowerCaseReg.test(ch);
  case 'number':
    return numberReg.test(ch);
  case 'specialCharacter':
    return specialReg.test(ch);
  default:
    return false;
  }
};

export const handleErrorApiResponse = (
  error: any,
  setError?: UseFormSetError<any> | null
) => {
  if (error instanceof EntityError && !!setError) {
    error.payload.errors?.forEach((item) =>
      setError(item.field as keyof SignUpType, {
        message: Array.isArray(item.message)
          ? item.message.join(' /n')
          : item.message
      })
    );
  } else if (error instanceof HttpError) {
    toast.error(error.message);
  } else {
    toast.error('Something went wrong when calling data');
  }
};

export const TaskTypeColor: {
  [key: string]: string;
} = {
  Activities: 'success',
  Development: 'indigo',
  'New Routine': 'failure',
  Planning: 'warning',
  Shopping: 'purple',
  Other: 'dark'
};

export const formatDate = (date: moment.Moment, formatType: string = 'YYYY-MM-DD'): string => {
  return date.format(formatType);
}