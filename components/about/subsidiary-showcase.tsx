'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Heart, Rocket, Zap } from 'lucide-react';
import Link from 'next/link';

export function SubsidiaryShowcase() {
  const subsidiaries = [
    {
      icon: <Heart className='w-full h-full text-fieldporter-white' />,
      name: 'Family Care',
      description:
        'AI-powered family care coordination platform helping families manage elderly care with intelligent scheduling and health monitoring.',
      status: 'In Development' as const,
      category: 'HealthTech',
      features: [
        'Intelligent care scheduling',
        'Health monitoring integration',
        'Family communication tools',
        'Care provider coordination',
      ],
    },
    {
      icon: <Zap className='w-full h-full text-fieldporter-white' />,
      name: 'AutoFlow AI',
      description:
        'Business process automation platform that learns from organizational patterns to optimize workflows automatically.',
      status: 'Beta' as const,
      category: 'SaaS Platform',
      features: [
        'Intelligent workflow automation',
        'Pattern recognition engine',
        'Enterprise integrations',
        'Performance analytics',
      ],
    },
    {
      icon: <Rocket className='w-full h-full text-fieldporter-white' />,
      name: 'FIELDPORTER Ventures',
      description:
        'AI-focused investment and portfolio optimization for venture capital firms and startup acceleration.',
      status: 'Active' as const,
      category: 'FinTech',
      features: [
        'Portfolio optimization',
        'Due diligence automation',
        'Growth acceleration tools',
        'Exit preparation support',
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Beta':
        return 'bg-fieldporter-blue/20 text-fieldporter-blue border-fieldporter-blue/30';
      case 'In Development':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-fieldporter-gray/20 text-fieldporter-gray border-fieldporter-gray/30';
    }
  };

  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary to-bg-fieldporter-secondary' />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center space-y-6 mb-16'
        >
          <h2 className='text-display-sm md:text-display-md font-bold text-fieldporter-white'>
            Our Portfolio
            <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
              {' '}
              Companies
            </span>
          </h2>
          <p className='text-body-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'>
            We don&apos;t just advise on AI strategy—we build AI-powered businesses. These companies
            serve as our testing ground for the methodologies we recommend to clients.
          </p>
        </motion.div>

        {/* Subsidiaries Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
          {subsidiaries.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className='p-8 h-full hover:scale-[1.02] transition-all duration-300 group'>
                <div className='space-y-6'>
                  {/* Header */}
                  <div className='flex items-start justify-between'>
                    <div className='w-16 h-16 rounded-xl bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple p-4 group-hover:scale-110 transition-transform duration-300'>
                      {company.icon}
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(company.status)}`}
                    >
                      {company.status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <h3 className='text-heading-lg font-semibold text-fieldporter-white'>
                        {company.name}
                      </h3>
                      <p className='text-body-xs text-fieldporter-blue font-medium uppercase tracking-wider'>
                        {company.category}
                      </p>
                    </div>

                    <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                      {company.description}
                    </p>

                    {/* Features */}
                    <ul className='space-y-2'>
                      {company.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className='flex items-center space-x-2 text-body-sm text-fieldporter-gray'
                        >
                          <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue flex-shrink-0' />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interest CTA */}
                  <Button
                    variant='fieldporter-ghost'
                    size='sm'
                    className='group/btn w-full justify-between'
                    onClick={() => {
                      // Track interest in portfolio company
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'portfolio_interest', {
                          company_name: company.name,
                        });
                      }
                      // Navigate to contact for more information
                      window.location.href = '/contact';
                    }}
                  >
                    Express Interest
                    <ArrowRight className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='max-w-4xl mx-auto'
        >
          <GlassCard className='p-8 md:p-12'>
            <div className='text-center space-y-8'>
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple p-4 mx-auto'>
                <Building2 className='w-full h-full text-fieldporter-white' />
              </div>

              <h3 className='text-heading-xl font-semibold text-fieldporter-white'>
                Why We Build Our Own Companies
              </h3>

              <p className='text-body-lg text-fieldporter-gray leading-relaxed max-w-2xl mx-auto'>
                When we recommend AI strategies to clients, we&apos;re drawing from real experience
                building and scaling these systems. This gives our consulting the credibility that
                only comes from actual execution.
              </p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 pt-8'>
                <div className='space-y-3'>
                  <div className='w-12 h-12 rounded-xl bg-fieldporter-blue/20 flex items-center justify-center mx-auto'>
                    <Zap className='w-6 h-6 text-fieldporter-blue' />
                  </div>
                  <h4 className='text-heading-sm font-semibold text-fieldporter-white'>
                    Proven Execution
                  </h4>
                  <p className='text-body-sm text-fieldporter-gray'>
                    We build what we recommend, proving our strategies work in practice.
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='w-12 h-12 rounded-xl bg-fieldporter-purple/20 flex items-center justify-center mx-auto'>
                    <Rocket className='w-6 h-6 text-fieldporter-purple' />
                  </div>
                  <h4 className='text-heading-sm font-semibold text-fieldporter-white'>
                    Market Validation
                  </h4>
                  <p className='text-body-sm text-fieldporter-gray'>
                    Real customers and revenue validate our AI implementation approaches.
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto'>
                    <Building2 className='w-6 h-6 text-green-500' />
                  </div>
                  <h4 className='text-heading-sm font-semibold text-fieldporter-white'>
                    Continuous Innovation
                  </h4>
                  <p className='text-body-sm text-fieldporter-gray'>
                    Our portfolio companies keep us at the cutting edge of AI capabilities.
                  </p>
                </div>
              </div>

              {/* Investment & Partnership CTAs */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center pt-8'>
                <Button variant='primary' size='enterprise' className='group' asChild>
                  <Link href='/contact'>
                    Investment Opportunities
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>

                <Button variant='fieldporter-secondary' size='enterprise' className='group' asChild>
                  <Link href='/contact'>
                    Strategic Partnerships
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
