export interface SignUpParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
}

export type ImageResponse = {
  filePath: string
}

export const enum INPUT_TYPE {
  "TEXT",
  "FILE",
}

export const enum statusMessage {
  "OK",
  "FAIL",
}

export type ErrorPayloadType = {
  field: string,
  message: string | string[]
}

export type EntityErrorType = {
  statusCode: number;
  payload: {
    errors: ErrorPayloadType[]
  }
}

export type HttpErrorType = {
  statusCode: number;
  message: string;
}