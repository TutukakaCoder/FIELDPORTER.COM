import {
  CredibilitySection,
  CTASection,
  HeroSection,
  PortfolioSection,
  ServicesSection,
} from '@/components/homepage';
import { PageWrapper } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Strategy Consultancy That Builds What We Recommend | FIELDPORTER',
  description:
    'We build AI-powered businesses while providing strategic guidance to enterprises. Direct access to principals, agile decision-making, and proven operational expertise through hands-on business building.',
  keywords: [
    'AI strategy consulting',
    'business building consultancy',
    'AI implementation',
    'startup consultancy',
    'operational AI expertise',
    'strategic AI guidance',
  ],
  openGraph: {
    title: 'AI Strategy Consultancy That Builds What We Recommend | FIELDPORTER',
    description:
      'We build AI-powered businesses while providing strategic guidance to enterprises. Direct access to principals and proven operational expertise.',
    type: 'website',
    url: 'https://fieldporter.com',
    siteName: 'FIELDPORTER',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FIELDPORTER - AI Strategy Consultancy That Builds What We Recommend',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Strategy Consultancy That Builds What We Recommend | FIELDPORTER',
    description:
      'We build AI-powered businesses while providing strategic guidance to enterprises. Direct access to principals and proven operational expertise.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // TODO: Add actual verification code
  },
};

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <ServicesSection />
      <CredibilitySection />
      <PortfolioSection />
      <CTASection />
    </PageWrapper>
  );
}
