import {
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-gray-900" />

      {/* Static aurora blobs */}
      <div
        className="absolute -top-1/2 -left-1/3 w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.2))",
        }}
      />

      <div
        className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(249, 115, 22, 0.2))",
        }}
      />

      <div
        className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] rounded-full opacity-12 blur-[140px]"
        style={{
          background:
            "linear-gradient(225deg, rgba(59, 130, 246, 0.25), rgba(16, 185, 129, 0.15))",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "FIELDPORTER - Build Your Own AI Advantage | AI Integration",
  description:
    "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. Claude API, n8n automation, Cursor development that works.",
  keywords: [
    "FIELDPORTER",
    "AI integration",
    "Claude API automation",
    "n8n workflows",
    "Cursor development",
    "AI workflow setup",
    "business automation",
    "practical AI implementation",
    "working AI systems",
  ],
  openGraph: {
    title:
      "FIELDPORTER - Build Your Own AI Advantage | AI Integration",
    description:
      "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. Claude API, n8n automation, Cursor development that works.",
    type: "website",
    url: "https://fieldporter.com",
    siteName: "FIELDPORTER",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "FIELDPORTER - Build Your Own AI Advantage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "FIELDPORTER - Build Your Own AI Advantage | AI Integration",
    description:
      "FIELDPORTER provides AI integration, automation consulting, and strategic research for ambitious founders. Claude API, n8n automation, Cursor development that works.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "fieldporter-website-verification-pending", // Update when deploying to production
  },
};

export default function Home() {
  return (
    <PageWrapper className="relative" withPadding={false}>
      <UnifiedAuroraBackground />
      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <TrustIndicatorBar />
        <PortfolioSection />
        <CTASection />
      </div>
    </PageWrapper>
  );
}
