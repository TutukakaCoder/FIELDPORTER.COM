import { SITE_ORIGIN } from "@/config/constants";
import type { Metadata } from "next";

/** Canonical social preview image (Next.js ImageResponse route). */
export const SOCIAL_IMAGE = {
  path: "/opengraph-image",
  width: 1200,
  height: 630,
  defaultAlt: "FIELDPORTER — custom software for growing companies",
} as const;

/** Absolute public URL from a path. Always uses SITE_ORIGIN (never preview/localhost). */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_ORIGIN).toString();
}

export function socialImages(alt: string = SOCIAL_IMAGE.defaultAlt) {
  return [
    {
      url: SOCIAL_IMAGE.path,
      width: SOCIAL_IMAGE.width,
      height: SOCIAL_IMAGE.height,
      alt,
    },
  ];
}

type PageSocialOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  alt?: string;
  twitterCard?: "summary_large_image" | "summary";
  /** Include brand OG/Twitter images. Default true for marketing routes. */
  includeImages?: boolean;
  publishedTime?: string;
  authors?: string[];
  siteName?: string;
};

/**
 * Shared Open Graph + Twitter + canonical for marketing routes.
 * Images use relative `/opengraph-image` resolved via root metadataBase / SITE_ORIGIN.
 */
export function pageSocial({
  title,
  description,
  path,
  type = "website",
  alt = SOCIAL_IMAGE.defaultAlt,
  twitterCard = "summary_large_image",
  includeImages = true,
  publishedTime,
  authors,
  siteName = "FIELDPORTER",
}: PageSocialOptions): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const url = absoluteUrl(path);
  const images = includeImages ? socialImages(alt) : undefined;

  return {
    openGraph: {
      title,
      description,
      type,
      url,
      siteName,
      ...(images ? { images } : {}),
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && authors ? { authors } : {}),
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      ...(images ? { images: [SOCIAL_IMAGE.path] } : {}),
    },
    alternates: {
      canonical: url,
    },
  };
}
