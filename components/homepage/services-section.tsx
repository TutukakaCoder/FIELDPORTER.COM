'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { ArrowRight, Brain, Cog, TrendingUp } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  href: string;
  outcome: string;
}

function ServiceCard({ icon, title, description, features, href, outcome }: ServiceCardProps) {
  return (
    <GlassCard className='p-8 h-full group hover:scale-[1.02] transition-all duration-300'>
      <div className='space-y-6'>
        {/* Icon */}
        <div className='w-16 h-16 rounded-xl bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple p-4 group-hover:scale-110 transition-transform duration-300'>
          {icon}
        </div>

        {/* Content */}
        <div className='space-y-4'>
          <h3 className='text-heading-lg font-semibold text-fieldporter-white'>{title}</h3>

          <p className='text-body-md text-fieldporter-gray leading-relaxed'>{description}</p>

          {/* Outcome Statement */}
          <div className='p-4 rounded-lg bg-fieldporter-blue/10 border border-fieldporter-blue/20'>
            <p className='text-body-sm text-fieldporter-blue font-medium'>{outcome}</p>
          </div>

          {/* Features */}
          <ul className='space-y-2'>
            {features.map((feature, index) => (
              <li key={index} className='flex items-start gap-3 text-body-sm text-fieldporter-gray'>
                <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue mt-2 flex-shrink-0' />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className='pt-4'>
          <Button
            variant='fieldporter-ghost'
            className='group/btn w-full justify-between'
            onClick={() => {
              window.location.href = href;
            }}
          >
            Learn More
            <ArrowRight className='h-4 w-4 group-hover/btn:translate-x-1 transition-transform' />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}

export function ServicesSection() {
  const services = [
    {
      icon: <Brain className='w-full h-full text-fieldporter-white' />,
      title: 'AI Strategy Consulting',
      description:
        'Turn AI from expense into competitive advantage. We create actionable roadmaps based on real implementation experience, not theoretical frameworks.',
      outcome: 'Typical result: 40-60% efficiency gains within 12 months',
      features: [
        'ROI-focused transformation planning with measurable outcomes',
        'Executive stakeholder alignment and change management',
        'Pilot project design with scaling methodologies',
        'Technology stack recommendations from our own builds',
      ],
      href: '/services/ai-strategy',
    },
    {
      icon: <Cog className='w-full h-full text-fieldporter-white' />,
      title: 'Business Automation',
      description:
        'Eliminate repetitive work that kills productivity. We identify high-impact automation opportunities and implement solutions that deliver immediate ROI.',
      outcome: 'Average outcome: $2.5M annual savings from process optimization',
      features: [
        'Process analysis using our proven automation frameworks',
        'Custom solution development with enterprise integration',
        'Performance monitoring with continuous optimization',
        'Team training on systems we&apos;ve built and scaled',
      ],
      href: '/services/automation',
    },
    {
      icon: <TrendingUp className='w-full h-full text-fieldporter-white' />,
      title: 'VC Portfolio Optimization',
      description:
        'Accelerate portfolio company growth with proven AI systems. Strategic guidance that combines investment expertise with hands-on operational experience.',
      outcome: 'Portfolio impact: 3.2x average valuation increase through AI implementation',
      features: [
        'Technology due diligence with operational insights',
        'Growth acceleration through AI-powered efficiency',
        'Exit preparation with AI capability demonstrations',
        'Cross-portfolio knowledge sharing and best practices',
      ],
      href: '/services/vc-consulting',
    },
  ];

  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-tertiary' />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center space-y-6 mb-16'>
          <h2 className='text-display-sm md:text-display-md font-bold text-fieldporter-white'>
            AI Solutions That
            <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
              {' '}
              Deliver Measurable ROI
            </span>
          </h2>

          <p className='text-body-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'>
            We&apos;ve automated our own processes first. Now we help you implement the same systems
            that drive our business success.
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <div
              key={service.title}
              className='animate-slide-up'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='text-center pt-16'>
          <Button
            variant='primary'
            size='enterprise'
            className='group'
            onClick={() => {
              window.location.href = '/contact';
            }}
          >
            Schedule Your AI Strategy Session
            <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
          </Button>
        </div>
      </div>
    </section>
  );
}
