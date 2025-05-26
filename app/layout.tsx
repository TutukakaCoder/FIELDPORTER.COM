import { EnhancedChatWidget } from '@/components/chat';
import { BackToTop, Footer, Header } from '@/components/layout';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fieldporter.com'),
  title: 'FIELDPORTER | AI Strategy Consultancy That Builds What We Recommend',
  description:
    'We build AI-powered businesses while providing strategic guidance to enterprises. Direct access to principals, agile decision-making, and proven operational expertise.',
  keywords:
    'AI strategy, AI consulting, business automation, AI implementation, startup consultancy',
  authors: [{ name: 'FIELDPORTER' }],
  creator: 'FIELDPORTER',
  publisher: 'FIELDPORTER',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fieldporter.com',
    title: 'FIELDPORTER | AI Strategy Consultancy That Builds What We Recommend',
    description:
      'We build AI-powered businesses while providing strategic guidance to enterprises. Direct access to principals, agile decision-making, and proven operational expertise.',
    siteName: 'FIELDPORTER',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIELDPORTER | AI Strategy Consultancy That Builds What We Recommend',
    description:
      'We build AI-powered businesses while providing strategic guidance to enterprises. Direct access to principals, agile decision-making, and proven operational expertise.',
    creator: '@fieldporter',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <EnhancedChatWidget />
      </body>
    </html>
  );
}
