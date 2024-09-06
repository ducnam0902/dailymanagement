
import http from '@/lib/http'
import { ImageResponse, UserSignInSuccess } from '@/utils/types';
import { SignInType, SignUpType } from '@/utils/formType';

const userApi = {
  uploadImage: async (body: FormData) => await http.post<ImageResponse>('/user/upload-image', body),
  createUser: async (data: SignUpType) => await http.post('/user', data),
  signInServer: async (data: UserSignInSuccess) => await http.post<{message: string}>('/api/user', data, undefined, false),
  signIn: async (body: SignInType) => await http.post<UserSignInSuccess>('/user/login', body)
}

export default userApi;