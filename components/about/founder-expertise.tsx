'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Code, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export function FounderExpertise() {
  const achievements = [
    {
      icon: <Building2 className='w-6 h-6 text-fieldporter-blue' />,
      title: 'Active Operator',
      description: 'Currently building and scaling subsidiary businesses',
      detail: 'Not a consultant who never built anything - hands-on business builder',
    },
    {
      icon: <Code className='w-6 h-6 text-fieldporter-purple' />,
      title: 'Technical Background',
      description: 'Deep technical expertise without overwhelming business audiences',
      detail: 'Bridges the gap between technical implementation and business strategy',
    },
    {
      icon: <TrendingUp className='w-6 h-6 text-green-500' />,
      title: 'Proven Results',
      description: 'Family Care development progress, user acquisition, operational efficiency',
      detail: 'Real metrics from actual business building, not theoretical frameworks',
    },
    {
      icon: <Users className='w-6 h-6 text-fieldporter-blue' />,
      title: 'Team Growth',
      description: 'Building expertise through doing, not just studying',
      detail: 'Growing team of operators who understand both strategy and execution',
    },
  ];

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
            Why I Build Businesses
            <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
              {' '}
              Instead of Just Advising
            </span>
          </h2>
          <p className='text-body-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'>
            The best advice comes from current operational experience. I believe in building what I
            recommend, proving strategies work in practice before sharing them with clients.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start'>
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            <GlassCard className='p-8'>
              <div className='space-y-6'>
                <h3 className='text-heading-lg font-semibold text-fieldporter-white'>
                  Personal Philosophy
                </h3>

                <div className='space-y-4 text-body-md text-fieldporter-gray leading-relaxed'>
                  <p>
                    <strong className='text-fieldporter-white'>
                      &ldquo;I started FIELDPORTER because I was tired of consultants who had never
                      built anything giving advice about building things.&rdquo;
                    </strong>
                  </p>

                  <p>
                    After years in traditional consulting, I realized the fundamental disconnect:
                    how can you advise on AI implementation if you&apos;ve never implemented AI
                    systems yourself? How can you recommend business strategies if you&apos;ve never
                    built a business?
                  </p>

                  <p>
                    That&apos;s why FIELDPORTER operates differently. We&apos;re not just
                    consultants - we&apos;re operators. Every strategy we recommend has been tested
                    in our own businesses first. Every framework we share comes from real
                    implementation experience.
                  </p>

                  <p>
                    <strong className='text-fieldporter-blue'>
                      Currently building and scaling subsidiary businesses while providing strategic
                      guidance to enterprises.
                    </strong>{' '}
                    This hands-on approach ensures our recommendations have the credibility that
                    only comes from actual execution.
                  </p>
                </div>

                <div className='p-4 rounded-lg bg-fieldporter-blue/10 border border-fieldporter-blue/20'>
                  <p className='text-body-sm text-fieldporter-white font-medium'>
                    &ldquo;Work with someone who&apos;s building, not just talking&rdquo;
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Operational Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            <GlassCard className='p-8'>
              <div className='space-y-6'>
                <h3 className='text-heading-lg font-semibold text-fieldporter-white'>
                  Current Operations
                </h3>

                <div className='space-y-4'>
                  <div className='p-4 rounded-lg bg-white/5 border border-white/10'>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-2'>
                      Family Care Platform
                    </h4>
                    <p className='text-body-sm text-fieldporter-gray mb-3'>
                      AI-powered family organization platform currently in development
                    </p>
                    <ul className='space-y-1 text-body-xs text-fieldporter-gray'>
                      <li>• User research completed with 200+ families</li>
                      <li>• MVP in development using Next.js and AI automation</li>
                      <li>• Pilot testing scheduled for Q2 2024</li>
                      <li>• Mobile-first design with real-time collaboration</li>
                    </ul>
                  </div>

                  <div className='p-4 rounded-lg bg-white/5 border border-white/10'>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-2'>
                      Portfolio Development
                    </h4>
                    <p className='text-body-sm text-fieldporter-gray mb-3'>
                      Additional businesses in early research and validation phase
                    </p>
                    <ul className='space-y-1 text-body-xs text-fieldporter-gray'>
                      <li>• Business 2: Market research and opportunity analysis</li>
                      <li>• Business 3: Technical feasibility and competitive landscape</li>
                      <li>• Investment framework for new market validation</li>
                      <li>• Lessons learned documentation for client application</li>
                    </ul>
                  </div>
                </div>

                <div className='pt-4'>
                  <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-3'>
                    What We&apos;ve Learned Building Our Own AI Product
                  </h4>
                  <ul className='space-y-2 text-body-sm text-fieldporter-gray'>
                    <li className='flex items-start space-x-2'>
                      <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue flex-shrink-0 mt-2' />
                      <span>AI implementation is 80% process design, 20% technology</span>
                    </li>
                    <li className='flex items-start space-x-2'>
                      <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-purple flex-shrink-0 mt-2' />
                      <span>User experience matters more than AI sophistication</span>
                    </li>
                    <li className='flex items-start space-x-2'>
                      <div className='w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-2' />
                      <span>ROI measurement must be built in from day one</span>
                    </li>
                    <li className='flex items-start space-x-2'>
                      <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue flex-shrink-0 mt-2' />
                      <span>Change management is the biggest implementation challenge</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-16'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className='p-6 text-center h-full hover:scale-[1.02] transition-all duration-300'>
                  <div className='space-y-4'>
                    <div className='w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto'>
                      {achievement.icon}
                    </div>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white'>
                      {achievement.title}
                    </h4>
                    <p className='text-body-sm text-fieldporter-gray leading-relaxed'>
                      {achievement.description}
                    </p>
                    <p className='text-body-xs text-fieldporter-gray/80 leading-relaxed'>
                      {achievement.detail}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          <GlassCard className='p-8 md:p-12 max-w-4xl mx-auto'>
            <div className='space-y-6'>
              <h3 className='text-heading-lg md:text-heading-xl font-semibold text-fieldporter-white'>
                Ready to Work with Operators, Not Just Consultants?
              </h3>

              <p className='text-body-md text-fieldporter-gray leading-relaxed max-w-2xl mx-auto'>
                Get strategic guidance from someone who&apos;s currently building AI businesses. Our
                recommendations come from real operational experience, not theoretical frameworks.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
                <Button variant='primary' size='enterprise' className='group' asChild>
                  <Link href='/contact'>
                    Schedule a Consultation
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>

                <Button variant='fieldporter-secondary' size='enterprise' className='group' asChild>
                  <Link href='/services'>
                    Our Services
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
