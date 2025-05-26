import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | FIELDPORTER Services',
    default: 'Enterprise AI Services | FIELDPORTER',
  },
  description:
    'Strategic AI consulting services for Fortune 500 enterprises. AI strategy, business automation, and VC portfolio optimization solutions.',
  keywords: [
    'AI strategy consulting',
    'business automation',
    'VC portfolio optimization',
    'enterprise AI transformation',
    'Fortune 500 AI consulting',
  ],
  openGraph: {
    type: 'website',
    siteName: 'FIELDPORTER',
    images: [
      {
        url: '/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'FIELDPORTER Enterprise AI Services',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface ServicesLayoutProps {
  children: ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return <>{children}</>;
}
