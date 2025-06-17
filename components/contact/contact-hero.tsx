'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { animations } from '@/lib/animations';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Clock, User, Zap } from 'lucide-react';
import { useRef } from 'react';

export function ContactHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className='relative min-h-screen flex items-center justify-center bg-black pt-24 md:pt-32 lg:pt-20'
    >
      {/* Sophisticated Background with Parallax */}
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

      <div className='content-container relative z-10 text-center py-8'>
        <motion.div
          variants={animations.premiumStaggerContainer}
          initial='initial'
          animate={isInView ? 'animate' : 'initial'}
          className='component-spacing-lg max-w-5xl mx-auto'
        >
          {/* Main Headline with mobile-optimized typography */}
          <motion.h1
            variants={animations.dramaticTextReveal}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-[-0.02em] mb-6'
          >
            Strategic Research{' '}
            <motion.span
              className='font-semibold bg-gradient-to-r from-[#0066FF] to-[#0052CC] bg-clip-text text-transparent'
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
            >
              & Development
            </motion.span>
          </motion.h1>

          {/* Value Proposition */}
          <motion.p
            variants={animations.premiumFadeInUp}
            className='text-base sm:text-lg md:text-xl text-fieldporter-gray max-w-4xl mx-auto leading-relaxed font-light mb-12'
          >
            We build working applications, teach AI workflows, and provide systematic research for
            businesses ready to implement solutions. Tell us about your specific challenge and
            we&apos;ll assess honestly whether we can help solve it.
          </motion.p>

          {/* Trust Signals with mobile-optimized layout */}
          <motion.div
            variants={animations.premiumStaggerContainer}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12'
          >
            {[
              {
                icon: <User className='h-6 w-6 sm:h-8 sm:w-8 text-fieldporter-blue' />,
                title: 'Direct Access',
                description: 'Work directly with us, not account managers',
              },
              {
                icon: <Zap className='h-6 w-6 sm:h-8 sm:w-8 text-fieldporter-blue' />,
                title: 'Systematic Methodology',
                description: 'Proven approach delivers results faster than traditional methods',
              },
              {
                icon: <Clock className='h-6 w-6 sm:h-8 sm:w-8 text-fieldporter-blue' />,
                title: '24-Hour Response',
                description: 'We respond to all qualified inquiries within 24 hours',
              },
            ].map((feature, index) => (
              <motion.div key={feature.title} variants={animations.premiumFadeInUp}>
                <Card className='glass-premium hover:glass-hover transition-all duration-300 group h-full'>
                  <CardContent className='p-4 sm:p-6 text-center'>
                    <div className='mx-auto mb-3 group-hover:scale-110 transition-transform duration-300'>
                      {feature.icon}
                    </div>
                    <h3 className='text-fieldporter-white font-semibold mb-2 text-sm sm:text-base'>
                      {feature.title}
                    </h3>
                    <p className='text-fieldporter-gray text-xs sm:text-sm leading-relaxed'>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Button with mobile optimization */}
          <motion.div variants={animations.premiumFadeInUp} className='mb-12'>
            <Button
              onClick={scrollToForm}
              variant='fieldporter-blue'
              size='enterprise-lg'
              enableAnimations={true}
              className='group relative overflow-hidden w-full sm:w-auto min-h-[48px] px-6 sm:px-8'
            >
              {/* Button Glow Effect */}
              <div className='absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#0052CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

              <div className='relative flex items-center justify-center space-x-2 sm:space-x-3'>
                <span className='text-sm sm:text-base'>Start the Conversation</span>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5' />
                </motion.div>
              </div>
            </Button>
          </motion.div>

          {/* Honest Positioning */}
          <motion.p
            variants={animations.premiumFadeInUp}
            className='text-fieldporter-gray text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed'
          >
            We&apos;ll tell you honestly if we&apos;re the right fit for your project, or who might
            be better suited to help.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
