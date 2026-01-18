import {
  AIAuditSection,
  CTASection,
  HeroSection,
  PortfolioSection,
  ServicesSection,
  TrustIndicatorBar,
} from "@/components/homepage";
import { PageWrapper } from "@/components/layout";
import { Metadata } from "next";

// Unified aurora background component for entire homepage
function UnifiedAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient - theme aware */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-black dark:via-gray-950 dark:to-gray-900" />

      {/* Animated aurora blobs - subtle drift animation, expanded, scattered, and very faint */}

      {/* 1. Top Left - Cyan/Emerald mix */}
      <div
        className="fixed -top-[20%] -left-[10%] w-[100vw] h-[100vh] max-w-[1200px] max-h-[1200px] rounded-full opacity-[0.08] dark:opacity-[0.12] blur-[140px] animate-aurora-drift-1"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.3), transparent 70%)",
        }}
      />

      {/* 2. Center Right - Purple/Orange mix */}
      <div
        className="fixed top-[10%] -right-[10%] w-[90vw] h-[90vh] max-w-[1000px] max-h-[1000px] rounded-full opacity-[0.06] dark:opacity-[0.1] blur-[160px] animate-aurora-drift-2"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 85, 247, 0.3), rgba(249, 115, 22, 0.25), transparent 70%)",
        }}
      />

      {/* 3. Bottom Left - Blue/Indigo mix */}
      <div
        className="fixed bottom-[10%] -left-[5%] w-[95vw] h-[80vh] max-w-[1100px] max-h-[900px] rounded-full opacity-[0.07] dark:opacity-[0.1] blur-[150px] animate-aurora-drift-3"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.35), rgba(79, 70, 229, 0.25), transparent 70%)",
        }}
      />

      {/* 4. Bottom Center/Right - Extra coverage to break linearity */}
      <div
        className="fixed -bottom-[10%] right-[20%] w-[80vw] h-[70vh] max-w-[900px] max-h-[800px] rounded-full opacity-[0.05] dark:opacity-[0.08] blur-[130px] animate-pulse"
        style={{
          background:
            "radial-gradient(circle at center, rgba(14, 165, 233, 0.3), rgba(16, 185, 129, 0.2), transparent 70%)",
          animationDuration: "15s",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: {
    absolute: "FIELDPORTER - Build Your Own AI Advantage | AI Integration",
  },
  description:
    "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. De-risk decisions, validate concepts, and reclaim high-value time with production-ready AI systems.",
  keywords: [
    "FIELDPORTER",
    "AI integration consultant",
    "business automation expert",
    "Claude AI implementation",
    "workflow automation services",
    "AI strategy consulting",
    "DeepSeek integration",
    "Cursor development",
    "AI transformation partner",
    "strategic AI research",
  ],
  openGraph: {
    title: "FIELDPORTER - Build Your Own AI Advantage",
    description:
      "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. De-risk decisions, validate concepts, and reclaim high-value time.",
    type: "website",
    url: "https://fieldporter.com",
    siteName: "FIELDPORTER",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FIELDPORTER - Build Your Own AI Advantage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELDPORTER - Build Your Own AI Advantage",
    description:
      "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. De-risk decisions, validate concepts, and reclaim high-value time.",
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
        <AIAuditSection />
        <ServicesSection />
        <TrustIndicatorBar />
        <PortfolioSection />
        <CTASection />
      </div>
    </PageWrapper>
  );
}
