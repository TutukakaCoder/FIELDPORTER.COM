import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies',
  description: 'FIELDPORTER\'s portfolio of AI automation projects, strategic research, and client platform development. See real results from our AI integration and automation consulting work.',
  keywords: [
    'FIELDPORTER portfolio',
    'AI automation projects',
    'client case studies',
    'strategic research',
    'AI integration results',
    'automation consulting portfolio',
    'business AI solutions',
    'project case studies',
  ],
  openGraph: {
    title: 'FIELDPORTER | Portfolio & Case Studies',
    description: 'FIELDPORTER\'s portfolio of AI automation projects, strategic research, and client platform development. See real results from our AI integration and automation consulting work.',
    type: 'website',
    url: 'https://fieldporter.com/portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIELDPORTER | Portfolio & Case Studies',
    description: 'FIELDPORTER\'s portfolio of AI automation projects, strategic research, and client platform development. See real results from our AI integration and automation consulting work.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
