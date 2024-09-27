import http from '@/lib/http'
import { ImageResponse, ResponseStatus, UserResType } from '@/utils/types';
import { SignInType, SignUpType } from '@/utils/formType';

const userApi = {
  uploadImage: async (body: FormData) => await http.post<ImageResponse>('/user/upload-image', body),
  createUser: async (data: SignUpType) => await http.post('/user', data),
  signInServer: async (data: UserResType) => await http.post<ResponseStatus>('/api/user', data, undefined, false),
  signIn: async (body: SignInType) => await http.post<UserResType>('/user/login', body),
  signOut: async () => await http.get<ResponseStatus>('/api/user/logout', undefined, false),
  signOutToServer: async () => await http.get<ResponseStatus>('/user/logout')
}

export default userApi;