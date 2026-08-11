import { absoluteUrl } from "@/lib/social-metadata";
import { Metadata } from "next";

const termsDescription =
  "Terms governing FIELDPORTER custom software builds, automation work, and related professional services on fieldporter.com.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: termsDescription,
  keywords: [
    "FIELDPORTER terms of service",
    "custom software terms",
    "service agreement",
    "professional services terms",
  ],
  openGraph: {
    title: "FIELDPORTER | Terms of Service",
    description: termsDescription,
    type: "website",
    url: absoluteUrl("/terms-of-service"),
  },
  twitter: {
    card: "summary",
    title: "FIELDPORTER | Terms of Service",
    description: termsDescription,
  },
  alternates: {
    canonical: absoluteUrl("/terms-of-service"),
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
