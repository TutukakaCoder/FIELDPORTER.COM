'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';

interface ResultMetric {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  timeline: string;
}

interface ResultsSectionProps {
  title: string;
  subtitle: string;
  metrics: ResultMetric[];
  caseStudy: CaseStudy;
  expectations: {
    title: string;
    items: {
      phase: string;
      outcome: string;
      timeline: string;
    }[];
  };
}

export function ResultsSection({
  title,
  subtitle,
  metrics,
  caseStudy,
  expectations,
}: ResultsSectionProps) {
  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-black to-bg-fieldporter-secondary' />

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
            {title}
          </h2>
          <p className='text-body-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'>
            {subtitle}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20'
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className='p-6 text-center h-full hover:scale-105 transition-all duration-300'>
                <div className='w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple p-3'>
                  {metric.icon}
                </div>
                <div className='text-display-xs font-bold text-fieldporter-blue mb-2'>
                  {metric.value}
                </div>
                <div className='text-heading-sm font-semibold text-fieldporter-white mb-2'>
                  {metric.label}
                </div>
                <div className='text-body-sm text-fieldporter-gray'>{metric.description}</div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='mb-20'
        >
          <GlassCard className='p-8 lg:p-12'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              {/* Case Study Content */}
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <div className='text-body-sm text-fieldporter-blue font-semibold uppercase tracking-wide'>
                    Client Success Story
                  </div>
                  <h3 className='text-heading-lg font-bold text-fieldporter-white'>
                    {caseStudy.company}
                  </h3>
                  <div className='text-body-md text-fieldporter-gray'>
                    {caseStudy.industry} • {caseStudy.timeline}
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-2'>
                      Challenge
                    </h4>
                    <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                      {caseStudy.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-2'>
                      Our Solution
                    </h4>
                    <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                      {caseStudy.solution}
                    </p>
                  </div>
                </div>

                <Button
                  variant='fieldporter-ghost'
                  className='group'
                  onClick={() => {
                    // TODO: Implement case study download
                    window.open('/case-studies', '_blank');
                  }}
                >
                  Download Full Case Study
                  <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </Button>
              </div>

              {/* Results */}
              <div className='space-y-6'>
                <h4 className='text-heading-sm font-semibold text-fieldporter-white'>
                  Quantified Results
                </h4>

                <div className='space-y-4'>
                  {caseStudy.results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className='flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-fieldporter-blue/10 to-fieldporter-purple/10 border border-fieldporter-blue/20'
                    >
                      <TrendingUp className='w-5 h-5 text-fieldporter-blue mt-0.5 flex-shrink-0' />
                      <span className='text-body-md text-fieldporter-white font-medium'>
                        {result}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Expectations Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-12'>
            <h3 className='text-heading-lg font-bold text-fieldporter-white mb-4'>
              {expectations.title}
            </h3>
            <p className='text-body-md text-fieldporter-gray max-w-2xl mx-auto'>
              Realistic timelines and outcomes you can expect from our engagement
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {expectations.items.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className='p-6 h-full text-center'>
                  <div className='w-8 h-8 mx-auto mb-4 rounded-lg bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple flex items-center justify-center text-fieldporter-white font-bold text-sm'>
                    {index + 1}
                  </div>
                  <h4 className='text-heading-sm font-semibold text-fieldporter-white mb-2'>
                    {item.phase}
                  </h4>
                  <p className='text-body-sm text-fieldporter-gray mb-3'>{item.outcome}</p>
                  <div className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-fieldporter-blue/20 text-fieldporter-blue text-xs font-medium'>
                    <Clock className='w-3 h-3' />
                    {item.timeline}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
