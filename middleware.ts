// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { matchesUA } from 'browserslist-useragent';
import { supportedBrowsers } from './supportedBrowsers';

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  const isSupported = matchesUA(ua, {
    browsers: supportedBrowsers,
    allowHigherVersions: true,
    ignoreMinor: true,
    ignorePatch: true,
  });

  if (!isSupported) {
    return NextResponse.redirect(new URL('/v2', req.url));
  }
  return NextResponse.next();
}
