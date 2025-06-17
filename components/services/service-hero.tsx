'use client';

import { Button } from '@/components/ui/button';
import { animations } from '@/lib/animations';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  ctaText: string;
  ctaHref: string;
}

export function ServiceHero({
  title,
  subtitle,
  description,
  stats,
  ctaText,
  ctaHref,
}: ServiceHeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className='relative section-spacing overflow-hidden bg-black pt-24 md:pt-32 lg:pt-20'
    >
      {/* Sophisticated Background */}
      <div className='absolute inset-0 bg-black' />
      <motion.div
        variants={animations.parallaxBackground}
        animate={isInView ? 'animate' : 'initial'}
        className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,255,0.08),transparent_60%)]'
      />

      {/* Enhanced Grid Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]' />

      <div className='relative z-10 content-container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
          {/* Content */}
          <motion.div
            variants={animations.premiumStaggerContainer}
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            className='component-spacing'
          >
            {/* Title with mobile-optimized typography */}
            <motion.div variants={animations.premiumFadeInUp} className='text-spacing'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-fieldporter-white leading-tight tracking-[-0.02em]'>
                {title}
              </h1>
              <p className='text-lg sm:text-xl md:text-2xl text-fieldporter-blue font-semibold mt-4'>
                {subtitle}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={animations.premiumFadeInUp}
              className='text-base sm:text-lg md:text-xl text-fieldporter-gray leading-relaxed'
            >
              {description}
            </motion.p>

            {/* Enhanced CTA with mobile optimization */}
            <motion.div variants={animations.premiumFadeInUp}>
              <Button
                variant='fieldporter-blue'
                size='enterprise'
                enableAnimations={true}
                className='group min-h-[48px] w-full sm:w-auto'
                onClick={() => {
                  window.location.href = ctaHref;
                }}
              >
                {ctaText}
                <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform' />
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats with mobile optimization */}
          <motion.div
            variants={animations.premiumStaggerContainer}
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6'
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={animations.premiumFadeInUp}
                className='text-center lg:text-left p-4 sm:p-6 rounded-2xl glass-premium hover:glass-hover transition-all duration-300 group'
              >
                <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-fieldporter-white mb-2 group-hover:scale-105 transition-transform duration-300'>
                  {stat.value}
                </div>
                <div className='text-sm sm:text-base text-fieldporter-gray font-medium'>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
