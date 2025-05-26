'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

export function InsightsHero() {
  const categories = [
    {
      icon: <Lightbulb className='w-6 h-6 text-fieldporter-blue' />,
      name: 'AI Strategy',
      count: '12 Articles',
      description: 'Strategic frameworks for AI transformation',
    },
    {
      icon: <TrendingUp className='w-6 h-6 text-fieldporter-purple' />,
      name: 'Business Automation',
      count: '8 Articles',
      description: 'Process optimization and intelligent automation',
    },
    {
      icon: <BookOpen className='w-6 h-6 text-green-500' />,
      name: 'Implementation',
      count: '15 Articles',
      description: 'Real-world AI deployment experiences',
    },
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
              <BookOpen className='w-full h-full text-fieldporter-white' />
            </div>

            {/* Title */}
            <div className='space-y-4'>
              <h1 className='text-display-sm md:text-display-md font-bold text-fieldporter-white leading-tight'>
                AI Strategy
                <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
                  {' '}
                  Insights
                </span>
              </h1>
              <p className='text-heading-lg text-fieldporter-blue font-semibold'>
                Thought Leadership from AI Operators
              </p>
            </div>

            {/* Description */}
            <p className='text-body-lg text-fieldporter-gray leading-relaxed max-w-xl'>
              Learn from operators who build AI companies while consulting on strategic
              implementations. Our insights come from real-world experience, not theoretical
              frameworks.
            </p>

            {/* Value Proposition */}
            <div className='p-6 rounded-xl glass-dark border border-white/10'>
              <h3 className='text-heading-md font-semibold text-fieldporter-white mb-3'>
                Why Our Insights Matter
              </h3>
              <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                We share lessons learned from building AI-powered businesses and implementing
                strategies across diverse industries. Every insight is backed by operational
                experience.
              </p>
            </div>

            {/* CTA */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                variant='primary'
                size='enterprise'
                className='group'
                onClick={() => {
                  // Scroll to blog grid
                  document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Articles
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Button>

              <Button
                variant='fieldporter-secondary'
                size='enterprise'
                className='group'
                onClick={() => {
                  // Scroll to newsletter signup
                  document
                    .getElementById('newsletter-signup')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Subscribe for Updates
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Button>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className='space-y-6'
          >
            <h3 className='text-heading-lg font-semibold text-fieldporter-white'>
              Content Categories
            </h3>

            <div className='space-y-4'>
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className='p-6 rounded-xl glass-dark border border-white/10 hover:border-fieldporter-blue/30 transition-all duration-300 cursor-pointer group'
                  onClick={() => {
                    // Filter by category when blog grid is implemented
                    document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className='flex items-start space-x-4'>
                    <div className='w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                      {category.icon}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center justify-between mb-2'>
                        <h4 className='text-heading-sm font-semibold text-fieldporter-white'>
                          {category.name}
                        </h4>
                        <span className='text-body-xs text-fieldporter-blue font-medium'>
                          {category.count}
                        </span>
                      </div>
                      <p className='text-body-sm text-fieldporter-gray'>{category.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Featured Topics */}
            <div className='p-6 rounded-xl glass-dark border border-white/10'>
              <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-4'>
                Featured Topics
              </h4>
              <div className='flex flex-wrap gap-2'>
                {[
                  'AI Implementation',
                  'Process Automation',
                  'Strategic Planning',
                  'ROI Optimization',
                  'Change Management',
                  'Technology Integration',
                ].map(topic => (
                  <span
                    key={topic}
                    className='px-3 py-1 text-xs font-medium bg-fieldporter-blue/20 text-fieldporter-blue rounded-full border border-fieldporter-blue/30 hover:bg-fieldporter-blue/30 transition-colors duration-200 cursor-pointer'
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
