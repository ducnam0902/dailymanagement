import envConfig from '@/utils/config';
import { HttpErrorType, EntityErrorType, ErrorPayloadType } from '@/utils/types';
import httpStatus from 'http-status';
import { getCookies } from './helperApi';
import { redirect } from 'next/navigation';
type CustomOptions = Omit<RequestInit, 'method'>;
export const isClient = () => typeof window !== 'undefined';
export class HttpError extends Error {
  statusCode: number;
  message: string;

  constructor({ statusCode, message }: HttpErrorType) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class EntityError extends Error {
  statusCode: number
  payload: {
    errors: ErrorPayloadType[]
  }

  constructor({ statusCode, payload }: EntityErrorType) {
    super();
    this.statusCode = statusCode;
    this.payload = payload;
  }
}

export const request = async <Response> (url: string, method: 'GET' | 'POST' | 'PUT'| 'DELETE', isServerApi: boolean, options?: CustomOptions) => {
  const prefixUrl: string = isServerApi ? envConfig.NEXT_PUBLIC_SERVER_API : '';
  const fullUrl: string = url.startsWith('/') ? `${prefixUrl}${url}` : `${prefixUrl}/${url}`;
  const baseHeaders: {
    [key: string]: string
  } = options?.body instanceof FormData ? {} : {
    'Content-Type': 'application/json'
  };

  if (isClient()) {
    const userStorage = localStorage.getItem('user');
    if (!!userStorage) {
      const user = JSON.parse(userStorage);
      baseHeaders.Authorization = `Bearer ${user.accessToken}`;
    }
  } else {
    const accessToken = await getCookies('accessToken');
    baseHeaders.Authorization = `Bearer ${accessToken}`
  }

  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  const response = await fetch(fullUrl, {
    ...options,
    method: method,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    body
  })

  const payload = await response?.json();

  if (!response.ok) {
    if (response.status === httpStatus.UNAUTHORIZED && Array.isArray((payload).errors)) {
      throw new EntityError({
        statusCode: response.status,
        payload: payload
      });
    }
    if (response.status === httpStatus.CONFLICT) {
      throw new EntityError({
        statusCode: response.status,
        payload: payload
      });
    }

    if (response.status === httpStatus.UNAUTHORIZED) {
      if (isClient()) {
        console.log(baseHeaders);
        const result = await fetch('/api/user/logout', {
          headers: {
            ...baseHeaders
          },
          cache: 'no-store'
        });
        localStorage.removeItem('user');
        location.href = '/sign-in'
      } else {
        redirect('/sign-out')
      }
    } else {
      throw new HttpError({
        statusCode: response.status,
        message: payload?.message
      });
    }
  }

  return payload as Response;
}

const http = {
  get<Respond>(url: string, options?: Omit<CustomOptions, 'body'> | undefined, isServerApi: boolean = true) {
    return request<Respond>(url, 'GET', isServerApi, options);
  },
  post<Respond>(url: string, body: any, options?: CustomOptions | undefined, isServerApi: boolean = true) {
    return request<Respond>(url, 'POST', isServerApi, {
      ...options,
      body
    });
  },
  put<Respond>(url: string, body?: any, options?: CustomOptions | undefined, isServerApi: boolean = true) {
    return request<Respond>(url, 'PUT', isServerApi, {
      ...options,
      body
    });
  },
  delete<Respond>(url: string, options: Omit<CustomOptions, 'body'> | undefined, isServerApi: boolean = true) {
    return request<Respond>(url, 'DELETE', isServerApi, options);
  }
}

export default http;