import type { Metadata } from "next";

const partnershipTitle = "ANZ Market Expansion for Cyberport Portfolio";
const partnershipDescription =
  "Think Global × Voluntas Group partnership to support Cyberport HK startups expanding into ANZ.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fieldporter.com"),
  title: {
    absolute: partnershipTitle,
  },
  description: partnershipDescription,
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
    title: partnershipTitle,
    description: partnershipDescription,
    images: [],
  },
  twitter: {
    card: "summary",
    title: partnershipTitle,
    description: partnershipDescription,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
