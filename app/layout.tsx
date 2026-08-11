import {
  BackToTop,
  ConditionalLayout,
  EntranceProvider,
  ScrollRestoration,
} from "@/components/layout";
import { FieldporterStructuredData } from "@/components/layout/fieldporter-structured-data";
import { PageTransition } from "@/components/ui/page-transition";
import { SEO_DEFAULTS, SITE_ORIGIN } from "@/config/constants";
import { SOCIAL_IMAGE, absoluteUrl, socialImages } from "@/lib/social-metadata";
import { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type React from "react";
import "./globals.css";

const googleSiteVerification =
  process.env["GOOGLE_SITE_VERIFICATION"]?.trim();

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zoom
  userScalable: true, // Enable user zooming
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    template: "FIELDPORTER | %s",
    default: SEO_DEFAULTS.title,
  },
  description: SEO_DEFAULTS.description,
  keywords: SEO_DEFAULTS.keywords.join(", "),
  authors: [{ name: "FIELDPORTER" }],
  creator: "FIELDPORTER",
  publisher: "FIELDPORTER",
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "standard",
    "max-snippet": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "standard",
      "max-snippet": -1,
    },
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  icons: {
    icon: [
      // Default fallback (for browsers that don't support media queries)
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      // Light mode favicon (black F on transparent/white background)
      {
        url: "/favicon-light.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      // Dark mode favicon (white F on transparent/dark background)
      {
        url: "/favicon-dark.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      // Multiple sizes for better browser support
      {
        url: "/favicon-light-16.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark-16.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light-48.png",
        type: "image/png",
        sizes: "48x48",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark-48.png",
        type: "image/png",
        sizes: "48x48",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/apple-icon-light.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/apple-icon-dark.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon-light.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        url: "/favicon-dark.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    siteName: "FIELDPORTER",
    images: socialImages(SOCIAL_IMAGE.defaultAlt),
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [SOCIAL_IMAGE.path],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.add(theme);
              } catch {}
            `,
          }}
        />
      </head>
      <body
        className={`${plusJakartaSans.className} bg-white dark:bg-black transition-colors duration-300`}
      >
        {/* Outside EntranceProvider so crawlers always receive Organization/WebSite JSON-LD. */}
        <FieldporterStructuredData />
        <EntranceProvider>
          <ScrollRestoration />
          <ConditionalLayout>
            <PageTransition>
              <div className="flex-1 flex flex-col">{children}</div>
            </PageTransition>
          </ConditionalLayout>
          <BackToTop />
        </EntranceProvider>
      </body>
    </html>
  );
}
