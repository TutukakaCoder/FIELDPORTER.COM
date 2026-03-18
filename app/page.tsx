import {
  AIAuditSection,
  CTASection,
  HeroSection,
  PortfolioSection,
  ServicesSection,
  TrustIndicatorBar,
} from "@/components/homepage";
import { PageWrapper } from "@/components/layout";
import { HERO_HEADLINE } from "@/config/constants";
import { Metadata } from "next";

// Full-viewport background - simplified so content stands out
function UnifiedAuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient - theme aware */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-black dark:via-gray-950 dark:to-gray-900" />

      {/* Two subtle blobs only - no animation classes to reduce motion */}
      <div
        className="fixed -top-[20%] -left-[10%] w-[80vw] max-w-[800px] h-[60vh] max-h-[600px] rounded-full opacity-[0.06] dark:opacity-[0.08] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.35), rgba(16, 185, 129, 0.2), transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-[0%] right-[0%] w-[70vw] max-w-[700px] h-[50vh] max-h-[500px] rounded-full opacity-[0.05] dark:opacity-[0.07] blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 85, 247, 0.25), rgba(249, 115, 22, 0.2), transparent 70%)",
        }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: {
    absolute: `FIELDPORTER - ${HERO_HEADLINE}`,
  },
  description:
    "FIELDPORTER builds practical AI systems, automations, and internal tools for growing companies. First useful system in 1–3 weeks.",
  keywords: [
    "FIELDPORTER",
    "AI integration consultant",
    "business automation expert",
    "Claude AI implementation",
    "workflow automation services",
    "AI strategy consulting",
    "DeepSeek integration",
    "Cursor development",
    "workflow automation",
    "strategic AI research",
  ],
  openGraph: {
    title: `FIELDPORTER - ${HERO_HEADLINE}`,
    description:
      "FIELDPORTER builds practical AI systems, automations, and internal tools for growing companies. First useful system in 1–3 weeks.",
    type: "website",
    url: "https://fieldporter.com",
    siteName: "FIELDPORTER",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `FIELDPORTER - ${HERO_HEADLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `FIELDPORTER - ${HERO_HEADLINE}`,
    description:
      "FIELDPORTER builds practical AI systems, automations, and internal tools for growing companies. First useful system in 1–3 weeks.",
    images: ["/opengraph-image"],
    creator: "@fieldporter",
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "standard",
    "max-snippet": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "standard",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://fieldporter.com",
  },
  verification: {
    google: "fieldporter-website-verification-pending", // Update when deploying to production
  },
};

export default function Home() {
  return (
    <PageWrapper className="relative min-h-screen" withPadding={false}>
      <UnifiedAuroraBackground />
      <div className="relative z-10 space-y-0">
        <HeroSection />
        <TrustIndicatorBar />
        <AIAuditSection />
        <ServicesSection />
        <PortfolioSection />
        <CTASection />
      </div>
    </PageWrapper>
  );
}
