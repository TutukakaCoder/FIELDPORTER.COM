'use client';

import { GlassCard } from '@/components/ui/card';
import { Quote, TrendingUp, Users, Zap } from 'lucide-react';

interface MetricProps {
  value: string;
  label: string;
  description: string;
}

function MetricCard({ value, label, description }: MetricProps) {
  return (
    <div className='text-center space-y-2'>
      <div className='text-display-sm md:text-display-md font-bold bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
        {value}
      </div>
      <div className='text-heading-sm font-semibold text-fieldporter-white'>{label}</div>
      <div className='text-body-sm text-fieldporter-gray'>{description}</div>
    </div>
  );
}

export function CredibilitySection() {
  const metrics = [
    {
      value: '85%',
      label: 'Success Rate',
      description: 'AI implementations that deliver measurable ROI',
    },
    {
      value: '6 Months',
      label: 'Time to Value',
      description: 'Average time from strategy to business impact',
    },
    {
      value: '$2.5M',
      label: 'Average ROI',
      description: 'Typical first-year return on AI investment',
    },
    {
      value: '3.2x',
      label: 'Growth Multiple',
      description: 'Portfolio company valuation increase',
    },
  ];

  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-tertiary to-bg-fieldporter-secondary' />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center space-y-6 mb-16'>
          <h2 className='text-display-sm md:text-display-md font-bold text-fieldporter-white'>
            Proven Results from
            <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
              {' '}
              Real Operations
            </span>
          </h2>

          <p className='text-body-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'>
            We don&apos;t just recommend AI strategies—we implement them in our own businesses
            first. Our track record comes from building profitable AI companies, not PowerPoint
            presentations.
          </p>
        </div>

        {/* Business Building Credentials */}
        <div className='mb-20'>
          <p className='text-center text-body-sm text-fieldporter-gray/80 uppercase tracking-wider mb-8'>
            Active Business Portfolio • Proven at Scale
          </p>
          <div className='flex flex-wrap justify-center items-center gap-12 text-fieldporter-gray/60'>
            <div className='text-center'>
              <div className='text-heading-sm font-semibold text-fieldporter-blue'>3+</div>
              <div className='text-body-sm'>AI Subsidiaries Operating</div>
            </div>
            <div className='text-center'>
              <div className='text-heading-sm font-semibold text-fieldporter-purple'>100%</div>
              <div className='text-body-sm'>AI-Focused Operations</div>
            </div>
            <div className='text-center'>
              <div className='text-heading-sm font-semibold text-green-500'>500+</div>
              <div className='text-body-sm'>Executives Guided</div>
            </div>
            <div className='text-center'>
              <div className='text-heading-sm font-semibold text-fieldporter-blue'>Global</div>
              <div className='text-body-sm'>Enterprise Reach</div>
            </div>
          </div>
        </div>

        {/* Results Metrics Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20'>
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className='animate-slide-up'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        {/* Client Testimonials */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20'>
          <GlassCard className='p-8 text-center'>
            <Quote className='w-10 h-10 text-fieldporter-blue mx-auto mb-6' />
            <blockquote className='text-body-md text-fieldporter-white leading-relaxed mb-6'>
              &ldquo;FIELDPORTER delivered 40% operational efficiency gains in 8 months. They
              understand AI implementation because they&apos;ve built it themselves.&rdquo;
            </blockquote>
            <div className='space-y-1'>
              <div className='text-heading-sm font-semibold text-fieldporter-white'>
                Chief Technology Officer
              </div>
              <div className='text-body-sm text-fieldporter-gray'>Fortune 500 Manufacturing</div>
            </div>
          </GlassCard>

          <GlassCard className='p-8 text-center'>
            <Quote className='w-10 h-10 text-fieldporter-purple mx-auto mb-6' />
            <blockquote className='text-body-md text-fieldporter-white leading-relaxed mb-6'>
              &ldquo;Their portfolio company AI strategy increased our valuation by 3x. Real
              operators who deliver measurable business impact.&rdquo;
            </blockquote>
            <div className='space-y-1'>
              <div className='text-heading-sm font-semibold text-fieldporter-white'>
                Managing Partner
              </div>
              <div className='text-body-sm text-fieldporter-gray'>Growth Equity Fund</div>
            </div>
          </GlassCard>
        </div>

        {/* Differentiators */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
          <div className='space-y-4'>
            <div className='w-16 h-16 bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple rounded-full mx-auto flex items-center justify-center'>
              <TrendingUp className='w-8 h-8 text-fieldporter-white' />
            </div>
            <h3 className='text-heading-sm font-semibold text-fieldporter-white'>
              ROI-Focused Implementation
            </h3>
            <p className='text-body-sm text-fieldporter-gray'>
              Every AI strategy includes measurable business outcomes and clear ROI projections
              based on our operational experience
            </p>
          </div>

          <div className='space-y-4'>
            <div className='w-16 h-16 bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple rounded-full mx-auto flex items-center justify-center'>
              <Zap className='w-8 h-8 text-fieldporter-white' />
            </div>
            <h3 className='text-heading-sm font-semibold text-fieldporter-white'>
              Battle-Tested Methodologies
            </h3>
            <p className='text-body-sm text-fieldporter-gray'>
              Frameworks proven through our own business building, not theoretical consulting models
            </p>
          </div>

          <div className='space-y-4'>
            <div className='w-16 h-16 bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple rounded-full mx-auto flex items-center justify-center'>
              <Users className='w-8 h-8 text-fieldporter-white' />
            </div>
            <h3 className='text-heading-sm font-semibold text-fieldporter-white'>
              Principal-Level Access
            </h3>
            <p className='text-body-sm text-fieldporter-gray'>
              Work directly with business builders and operators, not junior consultants or account
              managers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
