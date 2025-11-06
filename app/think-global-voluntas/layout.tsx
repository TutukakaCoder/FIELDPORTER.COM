import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://fieldporter.com"),
  title: "ANZ Market Expansion for Cyberport Portfolio",
  description:
    "Think Global × Voluntas Group partnership to support Cyberport HK startups expanding into ANZ.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      {
        url: "/partnership-assets/voluntas-logo.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "Think Global × Voluntas",
    title: "ANZ Market Expansion for Cyberport Portfolio",
    description:
      "Think Global × Voluntas Group partnership to support Cyberport HK startups expanding into ANZ.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "ANZ Market Expansion for Cyberport Portfolio",
    description:
      "Think Global × Voluntas Group partnership to support Cyberport HK startups expanding into ANZ.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
