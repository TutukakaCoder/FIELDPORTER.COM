import { isCanonicalHost } from "@/lib/canonical-host";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Non-canonical hosts (localhost, Firebase preview, *.web.app):
 * - robots.txt → Disallow: /
 * - all HTML responses → X-Robots-Tag: noindex, nofollow
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const canonical = isCanonicalHost(host);

  if (!canonical && request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=300",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const response = NextResponse.next();
  if (!canonical) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Skip static Next assets and common image/font files.
     * Still run for /robots.txt and all pages.
     */
    "/((?!_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2|ttf|eot)$).*)",
  ],
};
