import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | FIELDPORTER Services',
    default: 'Services | FIELDPORTER',
  },
  description:
    'AI-powered strategic research, rapid prototyping, and business advisory services for VCs and growth-stage companies.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
