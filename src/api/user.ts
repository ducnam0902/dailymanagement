import http from '@/lib/http'
import { SignUpParams, ImageResponse } from '@/utils/types';

const userApi = {
  uploadImage: async (body: FormData) => await http.post<ImageResponse>('/user/upload-image', body),
  createUser: async (data: SignUpParams) => await http.post('/user', data)
}

export default userApi;