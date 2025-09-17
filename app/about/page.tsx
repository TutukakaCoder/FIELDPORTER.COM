import {
  AboutCTA,
  AboutHero,
  CompanyFoundation,
  SystematicApproach,
  TechnicalCapability,
  TechStack,
} from "@/components/about";
import { PageWrapper } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our AI Consulting Approach",
  description:
    "FIELDPORTER combines systematic research methodology with hands-on AI development. Learn about our approach to AI integration, automation consulting, and strategic research for ambitious founders.",
  keywords: [
    "FIELDPORTER about",
    "AI consulting approach",
    "automation consulting",
    "strategic research methodology",
    "AI development team",
    "business AI solutions",
    "consulting philosophy",
  ],
  openGraph: {
    title: "FIELDPORTER | About Our AI Consulting Approach",
    description:
      "FIELDPORTER combines systematic research methodology with hands-on AI development. Learn about our approach to AI integration, automation consulting, and strategic research for ambitious founders.",
    type: "website",
    url: "https://fieldporter.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER | About Our AI Consulting Approach",
    description:
      "FIELDPORTER combines systematic research methodology with hands-on AI development. Learn about our approach to AI integration, automation consulting, and strategic research for ambitious founders.",
  },
  alternates: {
    canonical: "https://fieldporter.com/about",
  },
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <AboutHero />
      <CompanyFoundation />
      <SystematicApproach />
      <TechnicalCapability />
      <TechStack />
      <AboutCTA />
    </PageWrapper>
  );
}
