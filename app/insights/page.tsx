import {
  BlogGrid,
  InsightsHero,
  NewsletterSignup,
} from "@/components/insights";
import { PageWrapper } from "@/components/layout";
import { pageSocial } from "@/lib/social-metadata";
import { Metadata } from "next";
import { Suspense } from "react";

const insightsTitle = "FIELDPORTER | Insights";
const insightsDescription =
  "Notes from FIELDPORTER on custom software, workflow automation, and practical AI inside real systems—from pilot to production.";

export const metadata: Metadata = {
  title: "Insights",
  description: insightsDescription,
  keywords: [
    "AI strategy insights",
    "business automation",
    "AI agents",
    "custom software",
    "workflow automation",
  ],
  ...pageSocial({
    title: insightsTitle,
    description: insightsDescription,
    path: "/insights",
    alt: "FIELDPORTER Insights",
  }),
  robots: { index: true, follow: true },
};

export default function InsightsPage() {
  return (
    <PageWrapper className="pt-0">
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <InsightsHero />
        <BlogGrid />
        <NewsletterSignup />
      </Suspense>
    </PageWrapper>
  );
}
