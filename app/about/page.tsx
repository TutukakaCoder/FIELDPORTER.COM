import {
  AboutCTA,
  AboutHero,
  CompanyFoundation,
  SystematicApproach,
  TechnicalCapability,
  TechStack,
} from "@/components/about";
import { PageWrapper } from "@/components/layout";
import { pageSocial } from "@/lib/social-metadata";
import { Metadata } from "next";

const aboutTitle = "FIELDPORTER | About";
const aboutDescription =
  "FIELDPORTER builds custom software with AI where it helps. How we scope, build, deploy, and hand working systems to your team.";

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  keywords: [
    "FIELDPORTER about",
    "custom software company",
    "automation and AI capability",
    "Auckland software studio",
    "how FIELDPORTER works",
  ],
  ...pageSocial({
    title: aboutTitle,
    description: aboutDescription,
    path: "/about",
    alt: aboutTitle,
  }),
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
