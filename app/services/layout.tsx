import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Integration & Automation Services",
  description:
    "FIELDPORTER provides AI integration, automation, and strategic research for founder-led and operator-led businesses. Production systems in weeks; decision-ready insights when you need them.",
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
      "FIELDPORTER provides AI integration, automation, and strategic research for founder-led and operator-led businesses. Production systems in weeks; decision-ready insights when you need them.",
    type: "website",
    url: "https://fieldporter.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER | AI Integration & Automation Services",
    description:
      "FIELDPORTER provides AI integration, automation, and strategic research for founder-led and operator-led businesses. Production systems in weeks; decision-ready insights when you need them.",
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
