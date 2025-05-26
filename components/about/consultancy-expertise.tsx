'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Cog, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export function ConsultancyExpertise() {
  const services = [
    {
      icon: <Brain className='w-full h-full text-fieldporter-white' />,
      title: 'AI Strategy Consulting',
      description:
        'Strategic AI transformation planning for enterprises ready to move beyond pilot projects.',
      capabilities: [
        'AI readiness assessment',
        'Strategic implementation roadmaps',
        'Executive stakeholder alignment',
        'ROI-focused transformation planning',
      ],
      href: '/services/ai-strategy',
    },
    {
      icon: <Cog className='w-full h-full text-fieldporter-white' />,
      title: 'Business Automation',
      description:
        'Intelligent process automation that delivers immediate ROI through strategic implementation.',
      capabilities: [
        'Process optimization analysis',
        'Custom automation solutions',
        'Enterprise system integration',
        'Performance monitoring & analytics',
      ],
      href: '/services/automation',
    },
    {
      icon: <TrendingUp className='w-full h-full text-fieldporter-white' />,
      title: 'VC Portfolio Optimization',
      description: 'Strategic AI guidance for portfolio companies and investment due diligence.',
      capabilities: [
        'Portfolio company AI assessment',
        'Technology due diligence',
        'Growth acceleration strategies',
        'Exit preparation optimization',
      ],
      href: '/services/vc-consulting',
    },
  ];

  const differentiators = [
    {
      title: 'Operator Experience',
      description: 'We build and operate AI businesses, giving our advice real-world credibility.',
      icon: <Zap className='w-6 h-6 text-fieldporter-blue' />,
    },
    {
      title: 'Proven Methodologies',
      description: 'Our frameworks are battle-tested through our own business implementations.',
      icon: <Brain className='w-6 h-6 text-fieldporter-purple' />,
    },
    {
      title: 'End-to-End Support',
      description: 'From strategy development to implementation and optimization.',
      icon: <Cog className='w-6 h-6 text-green-500' />,
    },
  ];

  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-primary' />

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
            Our Consulting
            <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
              {' '}
              Expertise
            </span>
          </h2>
          <p className='text-body-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'>
            We provide strategic AI consulting services backed by real operational experience. Our
            recommendations come from building and scaling AI systems ourselves.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className='p-8 h-full hover:scale-[1.02] transition-all duration-300 group'>
                <div className='space-y-6'>
                  {/* Icon */}
                  <div className='w-16 h-16 rounded-xl bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple p-4 group-hover:scale-110 transition-transform duration-300'>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className='space-y-4'>
                    <h3 className='text-heading-lg font-semibold text-fieldporter-white'>
                      {service.title}
                    </h3>
                    <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                      {service.description}
                    </p>

                    {/* Capabilities */}
                    <ul className='space-y-2'>
                      {service.capabilities.map((capability, capIndex) => (
                        <li
                          key={capIndex}
                          className='flex items-center space-x-2 text-body-sm text-fieldporter-gray'
                        >
                          <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue flex-shrink-0' />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button
                    variant='fieldporter-ghost'
                    className='group/btn w-full justify-between'
                    asChild
                  >
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
                    </Link>
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* What Makes Us Different */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='max-w-4xl mx-auto'
        >
          <GlassCard className='p-8 md:p-12'>
            <div className='text-center space-y-8'>
              <h3 className='text-heading-xl font-semibold text-fieldporter-white'>
                What Makes Us Different
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {differentiators.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className='text-center space-y-4'
                  >
                    <div className='w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto'>
                      {item.icon}
                    </div>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white'>
                      {item.title}
                    </h4>
                    <p className='text-body-sm text-fieldporter-gray leading-relaxed'>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className='pt-8'>
                <Button variant='primary' size='enterprise' className='group' asChild>
                  <Link href='/contact'>
                    Discuss Your Project
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
