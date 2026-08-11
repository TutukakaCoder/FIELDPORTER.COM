import { absoluteUrl } from "@/lib/social-metadata";
import { Metadata } from "next";

const privacyDescription =
  "How FIELDPORTER collects and uses information on fieldporter.com: contact forms, booking, newsletter signup, and first-party analytics.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyDescription,
  keywords: [
    "FIELDPORTER privacy policy",
    "data protection",
    "website privacy",
    "New Zealand privacy",
  ],
  openGraph: {
    title: "FIELDPORTER | Privacy Policy",
    description: privacyDescription,
    type: "website",
    url: absoluteUrl("/privacy-policy"),
  },
  twitter: {
    card: "summary",
    title: "FIELDPORTER | Privacy Policy",
    description: privacyDescription,
  },
  alternates: {
    canonical: absoluteUrl("/privacy-policy"),
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
