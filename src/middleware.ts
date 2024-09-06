import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
const privatePaths = ['/'];
const authPaths = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken');

  if (privatePaths.some(path => pathname === path) && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if ( authPaths.some(path => pathname.startsWith(path)) && !!accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/sign-in', '/sign-up']
}