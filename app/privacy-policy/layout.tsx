import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FIELDPORTER",
  description:
    "FIELDPORTER's comprehensive privacy policy covering AI consulting services, data collection, and enterprise client data protection standards.",
  keywords: [
    "FIELDPORTER privacy policy",
    "data protection",
    "AI consulting privacy",
    "enterprise data security",
    "GDPR compliance",
  ],
  openGraph: {
    title: "Privacy Policy | FIELDPORTER",
    description:
      "Learn how FIELDPORTER protects your data and privacy in our AI consulting services.",
    type: "website",
    url: "https://fieldporter.com/privacy-policy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | FIELDPORTER",
    description:
      "Learn how FIELDPORTER protects your data and privacy in our AI consulting services.",
  },
  alternates: {
    canonical: "https://fieldporter.com/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
