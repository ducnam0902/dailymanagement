import userApi from '@/api/user';
import { HttpError } from '@/lib/http';
import { cookies } from 'next/headers';


export async function GET() {

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!accessToken || !refreshToken) {
    return Response.json({ message: 'Not have accessToken or refreshToken' }, { status: 401 })
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  try {
    const result = await userApi.signOutToServer();
    return Response.json(result, {
      status: 200,
      headers: {
        'authorization': ''
      }
    })
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.message, {
        status: error.statusCode
      })
    } else {
      return Response.json({
        message: 'Unexpected error'
      }, {
        status: 500
      })
    }
  }
}