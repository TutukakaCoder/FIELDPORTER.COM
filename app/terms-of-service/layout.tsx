import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FIELDPORTER",
  description:
    "FIELDPORTER's comprehensive terms of service for AI consulting, business automation, and strategic advisory services.",
  keywords: [
    "FIELDPORTER terms of service",
    "AI consulting terms",
    "service agreement",
    "consulting contract",
    "professional services terms",
  ],
  openGraph: {
    title: "Terms of Service | FIELDPORTER",
    description:
      "Professional terms of service for FIELDPORTER's AI consulting and business automation services.",
    type: "website",
    url: "https://fieldporter.com/terms-of-service",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | FIELDPORTER",
    description:
      "Professional terms of service for FIELDPORTER's AI consulting and business automation services.",
  },
  alternates: {
    canonical: "https://fieldporter.com/terms-of-service",
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
