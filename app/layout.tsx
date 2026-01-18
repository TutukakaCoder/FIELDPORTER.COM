import { ConditionalFieldporterExtras } from "@/components/layout/conditional-fieldporter-extras";
import {
  BackToTop,
  ConditionalLayout,
  EntranceProvider,
  ScrollRestoration,
} from "@/components/layout";
import { PageTransition } from "@/components/ui/page-transition";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
  metadataBase: new URL("https://fieldporter.com"),
  title: {
    template: "FIELDPORTER | %s",
    default:
      "FIELDPORTER - Build Your Own AI Advantage | AI Integration & Automation",
  },
  description:
    "AI integration and automation consulting that protects your margins. Build production AI systems in weeks. Save 15+ hours weekly through workflow automation. Strategic research for founders.",
  keywords:
    "AI integration, automation consulting, margin protection, workflow automation, AI systems, business automation, FIELDPORTER, AI consulting, production AI",
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
    url: "https://fieldporter.com",
    title: "FIELDPORTER - AI Integration & Automation Consulting",
    description:
      "Build production AI systems in weeks. Save 15+ hours weekly. Protect your margins with automation that works.",
    siteName: "FIELDPORTER",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FIELDPORTER - AI Integration & Automation Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER - AI Integration & Automation Consulting",
    description:
      "Build production AI systems in weeks. Save 15+ hours weekly. Protect your margins with automation that works.",
    creator: "@fieldporter",
    images: ["/opengraph-image"],
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
        className={`${inter.className} bg-white dark:bg-black transition-colors duration-300`}
      >
        <EntranceProvider>
          <ScrollRestoration />
          <ConditionalLayout>
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
          </ConditionalLayout>
          <BackToTop />
          <ConditionalFieldporterExtras />
        </EntranceProvider>
      </body>
    </html>
  );
}
