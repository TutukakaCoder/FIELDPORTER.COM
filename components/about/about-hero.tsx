'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Lightbulb, Target, Users } from 'lucide-react';
import Link from 'next/link';

export function AboutHero() {
  const stats = [
    { value: '2023', label: 'Founded' },
    { value: '3+', label: 'Business Verticals' },
    { value: '100%', label: 'AI-Focused' },
    { value: 'Global', label: 'Operations' },
  ];

  return (
    <section className='relative py-20 lg:py-28 overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-black via-black to-fieldporter-blue/10' />

      {/* Grid Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]' />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-8'
          >
            {/* Icon */}
            <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple p-5'>
              <Building2 className='w-full h-full text-fieldporter-white' />
            </div>

            {/* Title */}
            <div className='space-y-4'>
              <h1 className='text-display-sm md:text-display-md font-bold text-fieldporter-white leading-tight'>
                We Build What We Recommend
              </h1>
              <p className='text-heading-lg text-fieldporter-blue font-semibold'>
                AI Consultancy Through Business Building
              </p>
            </div>

            {/* Description */}
            <p className='text-body-lg text-fieldporter-gray leading-relaxed max-w-xl'>
              FIELDPORTER isn&apos;t just another consulting firm. We&apos;re operators who build
              AI-powered businesses while providing strategic guidance to enterprises. This hands-on
              approach gives our recommendations the credibility that only comes from real-world
              execution.
            </p>

            {/* Mission Statement */}
            <div className='p-6 rounded-xl glass-dark border border-white/10'>
              <h3 className='text-heading-md font-semibold text-fieldporter-white mb-3'>
                Our Mission
              </h3>
              <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                To bridge the gap between AI strategy and execution by building successful
                AI-powered businesses while sharing proven methodologies with enterprise clients.
              </p>
            </div>

            {/* CTA */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button variant='primary' size='enterprise' className='group' asChild>
                <Link href='/contact'>
                  Work With Us
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
          </motion.div>

          {/* Stats & Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className='space-y-8'
          >
            {/* Stats Grid */}
            <div className='grid grid-cols-2 gap-6'>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className='p-6 rounded-xl glass-dark border border-white/10 text-center'
                >
                  <div className='text-display-xs font-bold text-fieldporter-blue mb-2'>
                    {stat.value}
                  </div>
                  <div className='text-body-sm text-fieldporter-gray'>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Core Values */}
            <div className='space-y-4'>
              <h3 className='text-heading-lg font-semibold text-fieldporter-white'>Our Approach</h3>

              <div className='space-y-4'>
                <div className='flex items-start space-x-4 p-4 rounded-lg glass-dark border border-white/10'>
                  <div className='w-10 h-10 rounded-lg bg-fieldporter-blue/20 p-2 flex-shrink-0'>
                    <Target className='w-full h-full text-fieldporter-blue' />
                  </div>
                  <div>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-1'>
                      Practical Strategy
                    </h4>
                    <p className='text-body-sm text-fieldporter-gray'>
                      We develop AI strategies based on real implementation experience, not
                      theoretical frameworks.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4 p-4 rounded-lg glass-dark border border-white/10'>
                  <div className='w-10 h-10 rounded-lg bg-fieldporter-purple/20 p-2 flex-shrink-0'>
                    <Lightbulb className='w-full h-full text-fieldporter-purple' />
                  </div>
                  <div>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-1'>
                      Innovation Through Building
                    </h4>
                    <p className='text-body-sm text-fieldporter-gray'>
                      Our subsidiary companies serve as testing grounds for the strategies we
                      recommend.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4 p-4 rounded-lg glass-dark border border-white/10'>
                  <div className='w-10 h-10 rounded-lg bg-green-500/20 p-2 flex-shrink-0'>
                    <Users className='w-full h-full text-green-500' />
                  </div>
                  <div>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-1'>
                      Collaborative Partnership
                    </h4>
                    <p className='text-body-sm text-fieldporter-gray'>
                      We work alongside your teams, not above them, ensuring knowledge transfer and
                      capability building.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
