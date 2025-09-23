// middleware.ts
import { isSupportedUA } from '@/lib/useragent/uaCheck';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';

  if (!isSupportedUA(ua)) {
    return NextResponse.redirect(new URL('/v2', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!app|_next|static|favicon.ico).*)'],
};