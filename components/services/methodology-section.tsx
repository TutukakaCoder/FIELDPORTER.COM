'use client';

import { GlassCard } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface MethodologyStep {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
}

interface MethodologySectionProps {
  title: string;
  subtitle: string;
  steps: MethodologyStep[];
}

export function MethodologySection({ title, subtitle, steps }: MethodologySectionProps) {
  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-tertiary' />

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

        {/* Methodology Steps */}
        <div className='space-y-8'>
          {steps.map((step, index) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className='p-8 hover:scale-[1.01] transition-all duration-300'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
                  {/* Phase Info */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple flex items-center justify-center text-fieldporter-white font-bold text-lg'>
                        {index + 1}
                      </div>
                      <div>
                        <div className='text-body-sm text-fieldporter-blue font-semibold uppercase tracking-wide'>
                          {step.phase}
                        </div>
                        <div className='text-body-sm text-fieldporter-gray'>{step.timeline}</div>
                      </div>
                    </div>

                    <h3 className='text-heading-lg font-semibold text-fieldporter-white'>
                      {step.title}
                    </h3>

                    <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className='lg:col-span-2 space-y-4'>
                    <h4 className='text-heading-sm font-semibold text-fieldporter-white'>
                      Key Deliverables
                    </h4>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      {step.deliverables.map((deliverable, deliverableIndex) => (
                        <motion.div
                          key={deliverableIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + deliverableIndex * 0.05,
                          }}
                          viewport={{ once: true }}
                          className='flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10'
                        >
                          <CheckCircle className='w-5 h-5 text-fieldporter-blue mt-0.5 flex-shrink-0' />
                          <span className='text-body-sm text-fieldporter-gray'>{deliverable}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Process Flow Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          <div className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-fieldporter-blue/20 to-fieldporter-purple/20 border border-fieldporter-blue/30'>
            <div className='w-2 h-2 rounded-full bg-fieldporter-blue animate-pulse' />
            <span className='text-body-sm text-fieldporter-white font-medium'>
              Continuous optimization and refinement throughout all phases
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
