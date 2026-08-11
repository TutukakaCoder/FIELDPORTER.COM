import { pageSocial } from "@/lib/social-metadata";
import { Metadata } from "next";

const portfolioTitle = "FIELDPORTER | Portfolio";
const portfolioDescription =
  "Client portals, internal tools, and automation systems shipped by FIELDPORTER. Real platforms and workflows for growing companies.";

export const metadata: Metadata = {
  title: "Portfolio",
  description: portfolioDescription,
  keywords: [
    "FIELDPORTER portfolio",
    "client portals",
    "custom software projects",
    "workflow automation",
    "internal tools",
  ],
  ...pageSocial({
    title: portfolioTitle,
    description: portfolioDescription,
    path: "/portfolio",
    alt: portfolioTitle,
  }),
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
