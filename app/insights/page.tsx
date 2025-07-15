import { InsightsComingSoon } from "@/components/insights";
import { PageWrapper } from "@/components/layout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "AI Strategy Insights - Coming Soon | FIELDPORTER",
  description:
    "Advanced AI strategy insights and business intelligence platform coming soon. Join our newsletter for early access to cutting-edge research, implementation frameworks, and strategic intelligence.",
  keywords: [
    "AI strategy insights coming soon",
    "business intelligence platform",
    "strategic research early access",
    "AI implementation frameworks",
    "technology consulting insights",
    "AI thought leadership",
    "early access newsletter",
  ],
  openGraph: {
    title: "AI Strategy Insights - Coming Soon | FIELDPORTER",
    description:
      "Advanced AI strategy insights platform in development. Join our newsletter for early access to strategic research and implementation frameworks.",
    type: "website",
    url: "https://fieldporter.com/insights",
    images: [
      {
        url: "/og-insights-coming-soon.jpg",
        width: 1200,
        height: 630,
        alt: "FIELDPORTER - AI Strategy Insights Coming Soon",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function InsightsPage() {
  return (
    <PageWrapper>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <InsightsComingSoon />
      </Suspense>
    </PageWrapper>
  );
}
