import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { matchesUA } from "browserslist-useragent";
import pkg from "./package.json";

export default function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  const isSupported = matchesUA(ua, {
    browsers: pkg.browserslist,
    allowHigherVersions: true,
    ignoreMinor: true,
    ignorePatch: true,
  });
  console.log({
    isSupported,
    ua
  });
  if (!isSupported) {
    return NextResponse.redirect(new URL("/v2", req.url));
  }

  return NextResponse.next();
}
