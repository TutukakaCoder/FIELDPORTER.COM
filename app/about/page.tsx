import {
  AboutHero,
  ConsultancyExpertise,
  FounderExpertise,
  SubsidiaryShowcase,
} from '@/components/about';
import { PageWrapper } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About FIELDPORTER | AI Strategy Consultancy & Business Building',
  description:
    "Learn about FIELDPORTER's unique approach to AI consulting. We're not just advisors - we're operators building AI companies while providing strategic guidance to enterprises.",
  keywords: [
    'AI consultancy team',
    'business building consultants',
    'AI strategy experts',
    'enterprise AI advisors',
    'technology consulting firm',
    'AI implementation specialists',
  ],
  openGraph: {
    title: 'About FIELDPORTER | AI Strategy Consultancy & Business Building',
    description:
      'Discover how FIELDPORTER combines AI consulting expertise with hands-on business building to deliver proven strategies.',
    type: 'website',
    url: 'https://fieldporter.com/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'FIELDPORTER - About Our AI Consultancy',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <AboutHero />
      <FounderExpertise />
      <ConsultancyExpertise />
      <SubsidiaryShowcase />
    </PageWrapper>
  );
}
