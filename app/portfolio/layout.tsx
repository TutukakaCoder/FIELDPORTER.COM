import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Coming Soon | FIELDPORTER',
  description:
    'Our portfolio showcase is currently under development. Discover our strategic consulting work and business building projects soon.',
  keywords: [
    'FIELDPORTER portfolio',
    'AI consulting projects',
    'business building portfolio',
    'strategic consulting work',
  ],
  openGraph: {
    title: 'Portfolio - Coming Soon | FIELDPORTER',
    description:
      'Our portfolio showcase is currently under development. Discover our strategic consulting work and business building projects soon.',
    type: 'website',
    url: 'https://fieldporter.com/portfolio',
    siteName: 'FIELDPORTER',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
