import {
  AboutCTA,
  AboutHero,
  CompanyFoundation,
  SystematicApproach,
  TechnicalCapability,
  TechStack,
} from "@/components/about";
import { PageWrapper } from "@/components/layout";
import { COMPANY_MODEL } from "@/config/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FIELDPORTER",
  description:
    COMPANY_MODEL.short +
    " We combine systematic research with hands-on build. Learn how we work.",
  keywords: [
    "FIELDPORTER about",
    "AI consulting and implementation",
    "automation consulting",
    "strategic research",
    "hybrid consulting",
  ],
  openGraph: {
    title: "FIELDPORTER | About",
    description:
      COMPANY_MODEL.short +
      " We combine systematic research with hands-on build.",
    type: "website",
    url: "https://fieldporter.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER | About",
    description:
      COMPANY_MODEL.short +
      " We combine systematic research with hands-on build.",
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
