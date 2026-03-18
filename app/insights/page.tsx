import {
  BlogGrid,
  InsightsHero,
  NewsletterSignup,
} from "@/components/insights";
import { PageWrapper } from "@/components/layout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Insights | FIELDPORTER",
  description:
    "AI strategy, business automation, and implementation insights from FIELDPORTER. Practical frameworks and thought leadership for AI adoption.",
  keywords: [
    "AI strategy insights",
    "business automation",
    "AI implementation",
    "strategic research",
    "workflow automation",
  ],
  openGraph: {
    title: "Insights | FIELDPORTER",
    description:
      "AI strategy and implementation insights from FIELDPORTER. Practical frameworks for AI adoption.",
    type: "website",
    url: "https://fieldporter.com/insights",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FIELDPORTER Insights",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://fieldporter.com/insights" },
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
