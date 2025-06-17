import {
  ContactHero,
  ContactMethods,
  SimpleContactForm,
  WorkingStyleSection,
} from '@/components/contact';
import { PageWrapper } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strategic Research & Development Services | FIELDPORTER',
  description:
    'Strategic research intelligence, rapid development, workflow optimization, and AI training for businesses ready to implement solutions.',
  keywords: [
    'strategic research intelligence',
    'rapid development',
    'workflow optimization',
    'AI training',
    'business automation',
    'AI consulting',
  ],
  openGraph: {
    title: 'Strategic Research & Development Services | FIELDPORTER',
    description:
      'Strategic research intelligence, rapid development, workflow optimization, and AI training for businesses ready to implement solutions.',
    type: 'website',
    url: 'https://fieldporter.com/contact',
    siteName: 'FIELDPORTER',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Strategic Research & Development Services - FIELDPORTER',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strategic Research & Development Services | FIELDPORTER',
    description:
      'Strategic research intelligence, rapid development, workflow optimization, and AI training for businesses ready to implement solutions.',
    images: ['/og-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <ContactHero />
      <SimpleContactForm />
      <WorkingStyleSection />
      <ContactMethods />
    </PageWrapper>
  );
}
