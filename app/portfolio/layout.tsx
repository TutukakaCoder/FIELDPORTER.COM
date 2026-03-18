import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description:
    "Real results from FIELDPORTER's AI automation projects and client work. See live systems, workflows, and outcomes for growing companies.",
  keywords: [
    "FIELDPORTER portfolio",
    "AI automation projects",
    "client case studies",
    "strategic research",
    "AI integration results",
    "automation consulting portfolio",
    "business AI solutions",
    "project case studies",
  ],
  openGraph: {
    title: "FIELDPORTER | Portfolio & Case Studies",
    description:
      "Real results from FIELDPORTER's AI automation projects and client work. See live systems, workflows, and outcomes for growing companies.",
    type: "website",
    url: "https://fieldporter.com/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER | Portfolio & Case Studies",
    description:
      "Real results from FIELDPORTER's AI automation projects and client work. See live systems, workflows, and outcomes for growing companies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
