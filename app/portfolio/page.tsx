'use client';

import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { animations } from '@/lib/animations';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar, Construction } from 'lucide-react';
import { useRef } from 'react';

export default function PortfolioPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <PageWrapper>
      <section
        ref={ref}
        className='min-h-screen flex items-center justify-center bg-black relative overflow-hidden pt-24 md:pt-32 lg:pt-20'
      >
        {/* Sophisticated Background */}
        <div className='absolute inset-0 bg-black' />
        <motion.div
          variants={animations.parallaxBackground}
          animate={isInView ? 'animate' : 'initial'}
          className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,255,0.08),transparent_60%)]'
        />
        <motion.div
          variants={animations.parallaxBackground}
          animate={isInView ? 'animate' : 'initial'}
          className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.02),transparent_50%)]'
          style={{ animationDelay: '10s' }}
        />

        <div className='relative z-10 content-container text-center py-8'>
          <motion.div
            variants={animations.premiumStaggerContainer}
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            className='component-spacing-lg max-w-4xl mx-auto'
          >
            {/* Construction Icon with Animation */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className='mb-6 sm:mb-8 flex justify-center'
            >
              <motion.div
                className='p-4 sm:p-6 rounded-full bg-fieldporter-blue/20 border border-fieldporter-blue/30 shadow-2xl'
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Construction className='h-8 w-8 sm:h-12 sm:w-12 text-fieldporter-blue' />
              </motion.div>
            </motion.div>

            {/* Main Heading with mobile-optimized typography */}
            <motion.h1
              variants={animations.dramaticTextReveal}
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-fieldporter-white leading-tight tracking-[-0.02em] mb-6'
            >
              Our{' '}
              <span className='bg-gradient-to-r from-[#0066FF] to-[#0052CC] bg-clip-text text-transparent'>
                Portfolio
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={animations.premiumFadeInUp}
              className='text-base sm:text-lg md:text-xl text-fieldporter-gray leading-relaxed mb-8 max-w-3xl mx-auto'
            >
              We&apos;re crafting a comprehensive showcase of our strategic consulting work and
              business building projects. Our portfolio will demonstrate real-world AI
              implementations and measurable business outcomes.
            </motion.p>

            {/* Progress Indicator */}
            <motion.div variants={animations.premiumFadeInUp} className='mb-8 sm:mb-12'>
              <div className='w-full bg-white/10 rounded-full h-2 overflow-hidden mb-2'>
                <motion.div
                  className='bg-fieldporter-blue h-2 rounded-full'
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </div>
              <p className='text-xs sm:text-sm text-fieldporter-gray'>75% Complete</p>
            </motion.div>

            {/* Enhanced Action Buttons with mobile optimization */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className='flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16'
            >
              <Button
                variant='fieldporter-blue'
                size='enterprise'
                enableAnimations={true}
                className='group min-h-[48px] w-full sm:w-auto'
                onClick={() => (window.location.href = '/contact')}
              >
                <Calendar className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                Discuss Your Project
                <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform' />
              </Button>

              <Button
                variant='fieldporter-glass'
                size='enterprise'
                enableAnimations={true}
                className='group min-h-[48px] w-full sm:w-auto'
                onClick={() => (window.location.href = '/services')}
              >
                Explore Services
                <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform' />
              </Button>
            </motion.div>

            {/* Coming Soon Features with mobile optimization */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className='pt-6 sm:pt-8 border-t border-white/10'
            >
              <h3 className='text-xl sm:text-2xl font-semibold text-fieldporter-white mb-6'>
                Coming Soon
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left'>
                {[
                  {
                    title: 'Case Studies',
                    description:
                      'Detailed analysis of strategic consulting engagements and outcomes',
                  },
                  {
                    title: 'Business Projects',
                    description: 'Active portfolio companies and their growth trajectories',
                  },
                  {
                    title: 'AI Implementations',
                    description: 'Real-world AI solutions and their measurable business impact',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={animations.premiumFadeInUp}
                    className='glass-premium rounded-xl p-4 sm:p-6 hover:glass-hover transition-all duration-300'
                  >
                    <h4 className='text-base sm:text-lg text-fieldporter-white font-semibold mb-2'>
                      {item.title}
                    </h4>
                    <p className='text-xs sm:text-sm text-fieldporter-gray leading-relaxed'>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
