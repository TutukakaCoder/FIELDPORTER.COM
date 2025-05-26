import { BlogGrid, InsightsHero, NewsletterSignup } from '@/components/insights';
import { PageWrapper } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Strategy Insights | FIELDPORTER Thought Leadership',
  description:
    'Expert insights on AI strategy, business automation, and enterprise transformation. Learn from operators who build AI companies while consulting on strategic implementations.',
  keywords: [
    'AI strategy insights',
    'business automation trends',
    'enterprise AI transformation',
    'AI implementation best practices',
    'technology consulting insights',
    'AI thought leadership',
  ],
  openGraph: {
    title: 'AI Strategy Insights | FIELDPORTER Thought Leadership',
    description:
      'Expert insights on AI strategy and implementation from operators who build AI companies while providing strategic consulting.',
    type: 'website',
    url: 'https://fieldporter.com/insights',
    images: [
      {
        url: '/og-insights.jpg',
        width: 1200,
        height: 630,
        alt: 'FIELDPORTER - AI Strategy Insights',
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
      <InsightsHero />
      <BlogGrid />
      <NewsletterSignup />
    </PageWrapper>
  );
}
