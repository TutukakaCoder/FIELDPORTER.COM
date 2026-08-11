import { pageSocial } from "@/lib/social-metadata";
import { Metadata } from "next";

const aiosTitle = "FIELDPORTER | AI Readiness Assessment";
const aiosDescription =
  "Scored automation roadmap: written Assessment Report plus consultation calls. Know what to automate first before you commit to a build.";

export const metadata: Metadata = {
  title: "AI Readiness Assessment",
  description: aiosDescription,
  keywords: ["AI Readiness", "AI Assessment", "Automation Roadmap", "AI Audit"],
  ...pageSocial({
    title: aiosTitle,
    description: aiosDescription,
    path: "/aios",
    alt: aiosTitle,
  }),
};

export default function AIOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
