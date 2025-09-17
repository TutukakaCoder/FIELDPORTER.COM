import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Integration & Automation Services",
  description:
    "FIELDPORTER provides strategic research, rapid AI development, workflow optimization, and AI training services for small and medium businesses looking to implement AI solutions.",
  keywords: [
    "FIELDPORTER services",
    "AI integration services",
    "automation consulting",
    "strategic research",
    "rapid development",
    "workflow optimization",
    "AI training",
    "business AI solutions",
  ],
  openGraph: {
    title: "FIELDPORTER | AI Integration & Automation Services",
    description:
      "FIELDPORTER provides strategic research, rapid AI development, workflow optimization, and AI training services for small and medium businesses looking to implement AI solutions.",
    type: "website",
    url: "https://fieldporter.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER | AI Integration & Automation Services",
    description:
      "FIELDPORTER provides strategic research, rapid AI development, workflow optimization, and AI training services for small and medium businesses looking to implement AI solutions.",
  },
  alternates: {
    canonical: "https://fieldporter.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
