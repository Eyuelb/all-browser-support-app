// middleware.ts
import { isSupportedUA } from "@/lib/useragent/uaCheck";
import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { browser, device, ua, isBot } = userAgent(req);
  const name = browser.name || "";
  const major = parseInt(browser.version?.split(".")[0] || "0", 10);
  console.log({
    browser,device,ua,isBot
  })
  let supported = false;
  if (name === "Chrome" && major >= 90) supported = true;
  else if (name === "Safari" && major >= 14) supported = true;
  else if (name === "Firefox" && major >= 80) supported = true;
  // etc.
  if (!supported) {
    return NextResponse.redirect(new URL("/v2", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!app|_next|static|favicon.ico).*)"],
};
