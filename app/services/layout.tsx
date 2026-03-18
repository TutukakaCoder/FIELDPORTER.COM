import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Integration & Automation Services",
  description:
    "Practical AI systems, automations, and internal tools for growing companies. Assessment in 2–5 days; first useful system in 1–3 weeks.",
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
      "Practical AI systems, automations, and internal tools for growing companies. Assessment in 2–5 days; first useful system in 1–3 weeks.",
    type: "website",
    url: "https://fieldporter.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER | AI Integration & Automation Services",
    description:
      "Practical AI systems, automations, and internal tools for growing companies. Assessment in 2–5 days; first useful system in 1–3 weeks.",
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
