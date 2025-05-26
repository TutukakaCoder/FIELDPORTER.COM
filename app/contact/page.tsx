import {
  ConsultationForm,
  ContactHero,
  ContactMethods,
  SecondaryConversions,
} from '@/components/contact';
import { PageWrapper } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact FIELDPORTER | Schedule Strategic AI Consultation',
  description:
    "Ready to transform your business with AI? Schedule a strategic consultation with FIELDPORTER's enterprise AI experts. Get your $50,000 strategic framework included.",
  keywords: [
    'AI consultation booking',
    'enterprise AI strategy consultation',
    'business transformation consultation',
    'AI implementation planning',
    'strategic AI advisory',
    'Fortune 500 AI consulting',
  ],
  openGraph: {
    title: 'Contact FIELDPORTER | Schedule Strategic AI Consultation',
    description:
      'Transform your enterprise with strategic AI consultation. Book your session with Fortune 500 AI experts.',
    type: 'website',
    url: 'https://fieldporter.com/contact',
    siteName: 'FIELDPORTER',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'FIELDPORTER - Schedule AI Strategy Consultation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact FIELDPORTER | Schedule Strategic AI Consultation',
    description: 'Transform your enterprise with strategic AI consultation.',
    images: ['/og-contact.jpg'],
  },
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <ContactHero />
      <ConsultationForm />
      <SecondaryConversions />
      <ContactMethods />
    </PageWrapper>
  );
}
