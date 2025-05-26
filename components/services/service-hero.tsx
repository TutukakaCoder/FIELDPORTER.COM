'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  problemStatement: string;
  icon: React.ReactNode;
  stats?: {
    label: string;
    value: string;
  }[];
}

export function ServiceHero({
  title,
  subtitle,
  description,
  problemStatement,
  icon,
  stats,
}: ServiceHeroProps) {
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
              {icon}
            </div>

            {/* Title */}
            <div className='space-y-4'>
              <h1 className='text-display-sm md:text-display-md font-bold text-fieldporter-white leading-tight'>
                {title}
              </h1>
              <p className='text-heading-lg text-fieldporter-blue font-semibold'>{subtitle}</p>
            </div>

            {/* Description */}
            <p className='text-body-lg text-fieldporter-gray leading-relaxed max-w-xl'>
              {description}
            </p>

            {/* Problem Statement */}
            <div className='p-6 rounded-xl bg-gradient-to-r from-fieldporter-purple/10 to-fieldporter-blue/10 border border-fieldporter-blue/20'>
              <p className='text-body-md text-fieldporter-white font-medium leading-relaxed'>
                &ldquo;{problemStatement}&rdquo;
              </p>
            </div>

            {/* CTAs */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                variant='primary'
                size='enterprise'
                className='group'
                onClick={() => {
                  // TODO: Implement consultation booking
                  window.location.href = '/contact';
                }}
              >
                <Calendar className='mr-2 h-5 w-5' />
                Schedule Consultation
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Button>

              <Button
                variant='fieldporter-ghost'
                size='enterprise'
                onClick={() => {
                  // TODO: Implement case study download
                  window.open('/case-studies', '_blank');
                }}
              >
                Download Case Study
              </Button>
            </div>
          </motion.div>

          {/* Stats/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className='relative'
          >
            {stats && (
              <div className='grid grid-cols-2 gap-6'>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className='text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'
                  >
                    <div className='text-display-xs font-bold text-fieldporter-blue mb-2'>
                      {stat.value}
                    </div>
                    <div className='text-body-sm text-fieldporter-gray'>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
