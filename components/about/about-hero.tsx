'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { animations } from '@/lib/animations';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function AboutHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className='relative section-spacing bg-black pt-24 md:pt-32 lg:pt-20'>
      <div className='relative z-10 content-container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
          {/* Content */}
          <motion.div
            variants={animations.premiumStaggerContainer}
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            className='component-spacing'
          >
            {/* Icon */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 p-2 sm:p-3 md:p-4'
            >
              <Code className='w-full h-full text-fieldporter-blue' />
            </motion.div>

            {/* Title with mobile-optimized typography */}
            <motion.div variants={animations.premiumFadeInUp} className='text-spacing'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-fieldporter-white leading-tight tracking-[-0.02em]'>
                About Freddy
              </h1>
              <p className='text-lg sm:text-xl md:text-2xl text-fieldporter-blue font-semibold mt-4'>
                Building AI systems while helping others implement them
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={animations.premiumFadeInUp}
              className='text-base sm:text-lg md:text-xl text-fieldporter-gray leading-relaxed max-w-xl'
            >
              After working in tennis, automotive sales, and startups, we realized we&apos;re good
              at building systems that work. When Claude API and n8n became available, we started
              building our own projects to test what works.
            </motion.p>

            {/* Enhanced CTAs with mobile optimization */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className='flex flex-col sm:flex-row gap-4'
            >
              <Button
                variant='fieldporter-blue'
                size='enterprise'
                enableAnimations={true}
                className='min-h-[48px] w-full sm:w-auto'
                asChild
              >
                <Link href='/contact'>
                  <span>Discuss Your Project</span>
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>

              <Button
                variant='fieldporter-glass'
                size='enterprise'
                enableAnimations={true}
                className='min-h-[48px] w-full sm:w-auto'
                asChild
              >
                <Link href='/services'>
                  <span>View Services</span>
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats with mobile optimization */}
          <motion.div
            variants={animations.premiumStaggerContainer}
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            className='component-spacing'
          >
            <div className='grid grid-cols-1 gap-4 sm:gap-6'>
              {[
                { label: 'Self-Dev Platform', subtitle: '8+ Months Revenue', delay: 0.1 },
                { label: 'Family Care', subtitle: 'Claude API Testing', delay: 0.2 },
                { label: 'AI Workflows', subtitle: 'Daily Business Use', delay: 0.3 },
              ].map((stat, index) => (
                <Card
                  key={stat.label}
                  enableAnimations={true}
                  animationDelay={stat.delay}
                  className='glass-premium rounded-xl p-4 sm:p-6 text-center hover:glass-hover transition-all duration-300'
                >
                  <div className='text-xl sm:text-2xl md:text-3xl font-bold text-fieldporter-blue mb-2'>
                    {stat.label}
                  </div>
                  <div className='text-xs sm:text-sm text-fieldporter-gray font-medium'>
                    {stat.subtitle}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
