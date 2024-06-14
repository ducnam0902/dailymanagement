export interface SignUpParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  image?: string;
}

export const enum statusMessage {
  "OK",
  "FAIL",
}

export type ResponseAPI<T> = {
  status: statusMessage;
  data?: T;
};
