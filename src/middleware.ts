import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
const privatePaths = ['/'];
const authPaths = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken');

  if (privatePaths.some(path => pathname === path) && !sessionToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if ( authPaths.some(path => pathname.startsWith(path)) && !!sessionToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/sign-in', '/sign-up']
}