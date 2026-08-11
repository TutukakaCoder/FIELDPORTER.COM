import { SITE_ORIGIN } from "@/config/constants";
import { isCanonicalHost } from "@/lib/canonical-host";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

/**
 * Production (fieldporter.com / www): allow marketing crawl; block API + private partnership.
 * Do not Disallow /_next/ — Google needs those assets to render.
 * Non-canonical hosts (localhost, *.web.app, preview): Disallow all.
 * Middleware also serves Disallow: / for non-canonical /robots.txt as a belt-and-suspenders.
 */
export default function robots(): MetadataRoute.Robots {
  const host = headers().get("host");

  if (!isCanonicalHost(host)) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/think-global-voluntas/"],
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
