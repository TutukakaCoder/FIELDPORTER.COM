'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { ArrowRight, Building2, Rocket, Zap } from 'lucide-react';

interface PortfolioItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'Coming Soon' | 'In Development' | 'Beta' | 'Live';
  category: string;
}

function PortfolioCard({ icon, title, description, status, category }: PortfolioItemProps) {
  return (
    <GlassCard className='p-6 h-full group hover:scale-[1.02] transition-all duration-300'>
      <div className='space-y-4'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple p-3 group-hover:scale-110 transition-transform duration-300'>
            {icon}
          </div>
          <span className='px-3 py-1 text-xs font-medium bg-fieldporter-purple/20 text-fieldporter-purple rounded-full border border-fieldporter-purple/30'>
            {status}
          </span>
        </div>

        {/* Content */}
        <div className='space-y-3'>
          <div className='space-y-1'>
            <h3 className='text-heading-md font-semibold text-fieldporter-white'>{title}</h3>
            <p className='text-body-xs text-fieldporter-blue font-medium uppercase tracking-wider'>
              {category}
            </p>
          </div>

          <p className='text-body-sm text-fieldporter-gray leading-relaxed'>{description}</p>
        </div>

        {/* Interest CTA */}
        <div className='pt-2'>
          <Button
            variant='fieldporter-ghost'
            size='sm'
            className='group/btn text-xs'
            onClick={() => {
              // Track interest in portfolio item
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'portfolio_interest', {
                  portfolio_item: title,
                });
              }
            }}
          >
            Express Interest
            <ArrowRight className='ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform' />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}

export function PortfolioSection() {
  const portfolioItems = [
    {
      icon: <Zap className='w-full h-full text-fieldporter-white' />,
      title: 'AutoFlow AI',
      description:
        'AI-powered workflow automation that learns from your team&apos;s patterns and optimizes processes automatically.',
      status: 'Beta' as const,
      category: 'SaaS Platform',
    },
    {
      icon: <Building2 className='w-full h-full text-fieldporter-white' />,
      title: 'Enterprise Insights',
      description:
        'Executive dashboard that transforms enterprise data into actionable strategic insights using advanced AI.',
      status: 'Live' as const,
      category: 'Analytics Platform',
    },
    {
      icon: <Rocket className='w-full h-full text-fieldporter-white' />,
      title: 'VC Intelligence',
      description:
        'AI-driven due diligence platform that analyzes portfolio companies and identifies optimization opportunities.',
      status: 'In Development' as const,
      category: 'FinTech Platform',
    },
  ];

  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-primary' />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center space-y-6 mb-16'>
          <h2 className='text-display-sm md:text-display-md font-bold text-fieldporter-white'>
            We Build What
            <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
              {' '}
              We Recommend
            </span>
          </h2>

          <p className='text-body-lg text-fieldporter-gray max-w-2xl mx-auto leading-relaxed'>
            Our subsidiary companies aren&apos;t just side projects—they&apos;re our laboratory for
            testing AI strategies in the real world.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
          {portfolioItems.map((item, index) => (
            <div
              key={item.title}
              className='animate-slide-up'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PortfolioCard {...item} />
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className='max-w-4xl mx-auto'>
          <GlassCard className='p-8 md:p-12 text-center'>
            <div className='space-y-6'>
              <h3 className='text-heading-lg md:text-heading-xl font-semibold text-fieldporter-white'>
                Why Partner with an Umbrella Company?
              </h3>

              <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                When we advise on AI implementation, we&apos;re drawing from real experience
                building and scaling these systems. This gives our recommendations the credibility
                that only comes from actually shipping products.
              </p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-6'>
                <div className='space-y-2'>
                  <div className='text-heading-sm font-semibold text-fieldporter-white'>
                    Proven Execution
                  </div>
                  <div className='text-body-sm text-fieldporter-gray'>
                    We build what we recommend
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='text-heading-sm font-semibold text-fieldporter-white'>
                    Market Validation
                  </div>
                  <div className='text-body-sm text-fieldporter-gray'>
                    Real customers, real revenue
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='text-heading-sm font-semibold text-fieldporter-white'>
                    Continuous Innovation
                  </div>
                  <div className='text-body-sm text-fieldporter-gray'>
                    Always at the cutting edge
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Investment & Partnership CTAs */}
        <div className='text-center pt-16 space-y-6'>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button
              variant='primary'
              size='enterprise'
              className='group min-w-[240px]'
              onClick={() => {
                // Navigate to contact page for investment inquiries
                window.location.href = '/contact';
              }}
            >
              Investment Opportunities
              <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
            </Button>

            <Button
              variant='fieldporter-secondary'
              size='enterprise'
              className='group min-w-[240px]'
              onClick={() => {
                // Navigate to contact page for partnership inquiries
                window.location.href = '/contact';
              }}
            >
              Strategic Partnerships
              <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
            </Button>
          </div>

          <p className='text-body-sm text-fieldporter-gray'>
            Interested in our portfolio companies or strategic partnerships? Let&apos;s discuss
            opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
