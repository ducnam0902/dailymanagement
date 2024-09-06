import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const response = await request.json();
  const { accessToken, refreshToken } = response;

  cookieStore.set('accessToken', accessToken);
  cookieStore.set('refreshToken', refreshToken);

  return new Response(JSON.stringify({
    message: 'Success'
  }), {
    status: 200
  })
}