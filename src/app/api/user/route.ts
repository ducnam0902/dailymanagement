import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const response = await request.json();
  const { accessToken, refreshToken } = response;

  cookieStore.set('accessToken', accessToken);
  cookieStore.set('refreshToken', refreshToken);

  return new Response(JSON.stringify({
    ok: true
  }), {
    status: 200
  })
}

export async function GET() {
  const cookieStore = cookies()

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  return new Response(JSON.stringify({
    ok: true
  }), {
    status: 200
  })
}