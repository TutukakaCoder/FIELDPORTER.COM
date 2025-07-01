"use client";

import {
  AboutCTA,
  AboutHero,
  CompanyFoundation,
  SystematicApproach,
  TechnicalCapability,
  TechStack,
} from "@/components/about";
import { PageWrapper } from "@/components/layout";

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
