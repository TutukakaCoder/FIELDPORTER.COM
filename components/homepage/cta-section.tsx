'use client';

import { trackCTA } from '@/lib/firebase-analytics';
import { easeInOut, motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Premium aurora background component
function PremiumAuroraBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* Continuous gradient from credibility section */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black' />

      {/* Final aurora blobs for smooth conclusion */}
      <motion.div
        className='absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full opacity-12 blur-[140px]'
        style={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.2))',
        }}
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -200, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className='absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full opacity-8 blur-[120px]'
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(249, 115, 22, 0.3))',
        }}
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 150, -100, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
          delay: 15,
        }}
      />
    </div>
  );
}

// Interactive spotlight effect
function InteractiveSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className='fixed inset-0 pointer-events-none z-5'
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.06), transparent 50%)`,
      }}
    />
  );
}

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Add vertical fade animations like hero section
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [300, 700, 1100], [1, 0.9, 0.7]);
  const springContentY = useSpring(contentY, { damping: 30, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });

  const handleContactCTA = () => {
    trackCTA('contact', 'Get Started', {
      location: 'cta_section',
      button_position: 'primary_cta',
    });
    window.location.href = '/contact';
  };

  const handlePortfolioCTA = () => {
    trackCTA('service_interest', 'View Work', {
      location: 'cta_section',
      button_position: 'secondary_cta',
    });
    window.location.href = '/portfolio';
  };

  return (
    <section ref={ref} className='relative py-24 lg:py-32 overflow-hidden'>
      <motion.div
        style={{ y: springContentY, opacity: springOpacity }}
        className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'
      >
        {/* Enhanced Section Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: easeInOut }}
          className='space-y-10 lg:space-y-12'
        >
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight tracking-[-0.02em]'
          >
            Let&apos;s{' '}
            <span className='font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
              Explore Your Options
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light'
          >
            Discuss your specific challenge and create a practical plan with clear timelines and
            realistic outcomes.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center'
          >
            {/* Primary CTA - Premium Glass Button */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <button
                onClick={handleContactCTA}
                className='
                  group relative px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/20 transition-all duration-300
                  bg-white/10 hover:bg-white/15 hover:border-blue-400/40
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]
                  will-change-transform font-medium text-white
                  min-w-[220px] text-center
                '
              >
                {/* Enhanced glassmorphism layers */}
                <div className='absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl' />
                <div className='absolute inset-0 rounded-2xl border border-white/5' />

                {/* Premium glow effect */}
                <div className='absolute -inset-1 rounded-2xl bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400' />

                <div className='relative z-10 flex items-center justify-center space-x-3'>
                  <MessageSquare className='w-5 h-5' />
                  <span className='text-base lg:text-lg'>Start Your Journey</span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <ArrowRight className='w-5 h-5' />
                  </motion.div>
                </div>
              </button>
            </motion.div>

            {/* Secondary CTA - Premium Glass Button */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <button
                onClick={handlePortfolioCTA}
                className='
                  group relative px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/20 transition-all duration-300
                  bg-white/5 hover:bg-white/10 hover:border-purple-400/40
                  hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
                  will-change-transform font-medium text-white
                  min-w-[220px] text-center
                '
              >
                {/* Enhanced glassmorphism layers */}
                <div className='absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl' />
                <div className='absolute inset-0 rounded-2xl border border-white/5' />

                {/* Premium glow effect */}
                <div className='absolute -inset-1 rounded-2xl bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400' />

                <div className='relative z-10 flex items-center justify-center space-x-3'>
                  <span className='text-base lg:text-lg'>View Our Work</span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <ArrowRight className='w-5 h-5' />
                  </motion.div>
                </div>
              </button>
            </motion.div>
          </motion.div>

          {/* Bottom Note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='text-sm text-gray-400 max-w-lg mx-auto leading-relaxed'
          >
            No sales pitches. Just an honest conversation about whether we can help solve your
            specific challenge.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
