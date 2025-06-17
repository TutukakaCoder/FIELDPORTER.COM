'use client';

import { Button } from '@/components/ui/button';
import { animations } from '@/lib/animations';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, BarChart3, BookOpen, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

interface InsightCard {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const insights: InsightCard[] = [
  {
    icon: <TrendingUp className='w-6 h-6 text-fieldporter-blue' />,
    title: 'AI Transformation Success Rate',
    value: '73%',
    description: 'Of enterprises see measurable ROI within 12 months',
  },
  {
    icon: <Target className='w-6 h-6 text-fieldporter-blue' />,
    title: 'Strategic Implementation Wins',
    value: '8.4x',
    description: 'Average revenue multiplier for strategic AI adoption',
  },
  {
    icon: <BarChart3 className='w-6 h-6 text-fieldporter-blue' />,
    title: 'Decision Speed Improvement',
    value: '440%',
    description: 'Faster strategic decisions with AI-powered research',
  },
];

export function InsightsHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const categories = [
    {
      icon: <Lightbulb className='w-5 h-5 sm:w-6 sm:h-6 text-fieldporter-blue' />,
      name: 'AI Strategy',
      count: '12 Articles',
      description: 'Strategic frameworks for AI transformation',
    },
    {
      icon: <TrendingUp className='w-5 h-5 sm:w-6 sm:h-6 text-fieldporter-blue' />,
      name: 'Business Automation',
      count: '8 Articles',
      description: 'Process optimization and intelligent automation',
    },
    {
      icon: <BookOpen className='w-5 h-5 sm:w-6 sm:h-6 text-green-500' />,
      name: 'Implementation',
      count: '15 Articles',
      description: 'Real-world AI deployment experiences',
    },
  ];

  return (
    <section
      ref={ref}
      className='relative section-spacing bg-black overflow-hidden pt-24 md:pt-32 lg:pt-20'
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

      <div className='content-container relative z-10'>
        {/* Section Header with mobile-optimized typography */}
        <motion.div
          variants={animations.premiumStaggerContainer}
          initial='initial'
          animate={isInView ? 'animate' : 'initial'}
          className='text-center mb-12 lg:mb-16'
        >
          <motion.div
            variants={animations.premiumFadeInUp}
            className='w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 p-3 sm:p-5 mx-auto mb-6 sm:mb-8'
          >
            <BarChart3 className='w-full h-full text-fieldporter-blue' />
          </motion.div>

          <motion.h1
            variants={animations.dramaticTextReveal}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-fieldporter-white leading-tight tracking-[-0.02em] mb-4 sm:mb-6'
          >
            Strategic{' '}
            <span className='bg-gradient-to-r from-[#0066FF] to-[#0052CC] bg-clip-text text-transparent'>
              Insights
            </span>
          </motion.h1>

          <motion.p
            variants={animations.premiumFadeInUp}
            className='text-lg sm:text-xl md:text-2xl text-fieldporter-blue font-semibold'
          >
            Thought Leadership from AI Operators
          </motion.p>
        </motion.div>

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
              className='w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 p-3 sm:p-5'
            >
              <BookOpen className='w-full h-full text-fieldporter-blue' />
            </motion.div>

            {/* Title with mobile-optimized typography */}
            <motion.div variants={animations.premiumFadeInUp} className='text-spacing'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-fieldporter-white leading-tight'>
                AI Strategy
                <span className='text-fieldporter-blue'> Insights</span>
              </h2>
              <p className='text-base sm:text-lg md:text-xl text-fieldporter-gray leading-relaxed max-w-xl mt-4'>
                Learn from operators who build AI companies while consulting on strategic
                implementations. Our insights come from real-world experience, not theoretical
                frameworks.
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className='glass-premium rounded-xl p-4 sm:p-6'
            >
              <h3 className='text-lg sm:text-xl font-semibold text-fieldporter-white mb-3'>
                Why Our Insights Matter
              </h3>
              <p className='text-sm sm:text-base text-fieldporter-gray leading-relaxed'>
                We share lessons learned from building AI-powered businesses and implementing
                strategies across diverse industries. Every insight is backed by operational
                experience.
              </p>
            </motion.div>

            {/* Enhanced CTAs with mobile optimization */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className='flex flex-col sm:flex-row gap-4'
            >
              <Button
                variant='fieldporter-blue'
                size='enterprise'
                enableAnimations={true}
                className='group min-h-[48px] w-full sm:w-auto'
                onClick={() => {
                  document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Articles
                <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform' />
              </Button>

              <Button
                variant='fieldporter-glass'
                size='enterprise'
                enableAnimations={true}
                className='group min-h-[48px] w-full sm:w-auto'
                onClick={() => {
                  document
                    .getElementById('newsletter-signup')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Subscribe for Updates
                <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform' />
              </Button>
            </motion.div>
          </motion.div>

          {/* Categories with mobile optimization */}
          <motion.div
            variants={animations.premiumStaggerContainer}
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            className='component-spacing'
          >
            <motion.h3
              variants={animations.premiumFadeInUp}
              className='text-xl sm:text-2xl font-semibold text-fieldporter-white mb-6'
            >
              Content Categories
            </motion.h3>

            <div className='space-y-4'>
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={animations.premiumFadeInUp}
                  className='glass-premium rounded-xl p-4 sm:p-6 hover:glass-hover transition-all duration-300 cursor-pointer group min-h-[60px] flex items-center'
                  onClick={() => {
                    document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className='flex items-start space-x-3 sm:space-x-4 w-full'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                      {category.icon}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center justify-between mb-1 sm:mb-2'>
                        <h4 className='text-base sm:text-lg font-semibold text-fieldporter-white truncate'>
                          {category.name}
                        </h4>
                        <span className='text-xs sm:text-sm text-fieldporter-blue font-medium whitespace-nowrap ml-2'>
                          {category.count}
                        </span>
                      </div>
                      <p className='text-xs sm:text-sm text-fieldporter-gray line-clamp-2'>
                        {category.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Featured Topics with mobile optimization */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className='glass-premium rounded-xl p-4 sm:p-6'
            >
              <h4 className='text-base sm:text-lg font-semibold text-fieldporter-white mb-4'>
                Featured Topics
              </h4>
              <div className='flex flex-wrap gap-2'>
                {[
                  'AI Implementation',
                  'Strategic Planning',
                  'Business Automation',
                  'Market Research',
                  'Growth Strategy',
                  'Technology Integration',
                ].map(topic => (
                  <span
                    key={topic}
                    className='px-2 sm:px-3 py-1 rounded-full bg-fieldporter-blue/20 text-fieldporter-blue text-xs sm:text-sm font-medium hover:bg-fieldporter-blue/30 transition-colors duration-200 cursor-pointer min-h-[32px] flex items-center'
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
