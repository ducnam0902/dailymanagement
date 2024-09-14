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

export type ImageResponse = {
  filePath: string
}

export type UserResType = {
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  image: string;
}

export type ResponseStatus = {
  ok: boolean
}