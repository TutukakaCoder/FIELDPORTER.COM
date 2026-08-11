import { ServicesFaqJsonLd } from "@/components/services/services-faq-json-ld";
import { pageSocial } from "@/lib/social-metadata";
import { Metadata } from "next";

const servicesTitle = "FIELDPORTER | Custom Software and Automation";
const servicesDescription =
  "Custom portals, databases, dashboards, integrations, and AI inside real workflows. Assessments in 2–5 days; focused portals typically 8–10 weeks.";

export const metadata: Metadata = {
  title: "Custom Software and Automation",
  description: servicesDescription,
  keywords: [
    "FIELDPORTER services",
    "custom software development",
    "client portals",
    "workflow automation",
    "system integrations",
    "internal tools",
    "AI-enabled workflows",
  ],
  ...pageSocial({
    title: servicesTitle,
    description: servicesDescription,
    path: "/services",
    alt: servicesTitle,
  }),
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServicesFaqJsonLd />
      {children}
    </>
  );
}
