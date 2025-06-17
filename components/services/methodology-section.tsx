'use client';

import { GlassCard } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface MethodologySectionProps {
  title: string;
  subtitle: string;
  phases: Array<{
    phase: string;
    title: string;
    description: string;
    deliverables: string[];
    timeline: string;
    timelineStyle?: string;
  }>;
}

export function MethodologySection({ title, subtitle, phases }: MethodologySectionProps) {
  const getTimelineBadgeStyle = (timelineStyle?: string, timeline?: string) => {
    if (timelineStyle === 'research' || timeline?.includes('week')) {
      return 'bg-fieldporter-blue/20 border-fieldporter-blue/30 text-fieldporter-blue';
    }
    if (timelineStyle === 'prototype' || timeline?.includes('week')) {
      return 'bg-fieldporter-purple/20 border-fieldporter-purple/30 text-fieldporter-purple';
    }
    if (timelineStyle === 'advisory' || timeline?.toLowerCase().includes('ongoing')) {
      return 'bg-green-500/20 border-green-500/30 text-green-400';
    }
    return 'bg-fieldporter-gray/20 border-fieldporter-gray/30 text-fieldporter-gray';
  };

  return (
    <section className='py-16 lg:py-24 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary to-bg-fieldporter-secondary' />

      <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center space-y-4 mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-fieldporter-white'>{title}</h2>
          <p className='text-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'>
            {subtitle}
          </p>
        </motion.div>

        {/* Phases Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='lg:col-span-1'
            >
              <GlassCard className='p-6 lg:p-8 h-full hover:scale-[1.02] transition-all duration-300'>
                <div className='space-y-6'>
                  {/* Header with Phase Number and Timeline */}
                  <div className='flex items-center justify-between'>
                    <div className='w-12 h-12 rounded-xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 flex items-center justify-center'>
                      <span className='text-lg font-bold text-fieldporter-white'>
                        {phase.phase}
                      </span>
                    </div>

                    {/* Enhanced Timeline Badge */}
                    <div
                      className={`px-3 py-1.5 rounded-lg border backdrop-blur-md font-medium text-sm ${getTimelineBadgeStyle(phase.timelineStyle, phase.timeline)}`}
                    >
                      {phase.timeline}
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className='text-xl md:text-2xl font-semibold text-fieldporter-white leading-tight'>
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className='text-fieldporter-gray leading-relaxed'>{phase.description}</p>

                  {/* Deliverables */}
                  <div className='space-y-3'>
                    <h4 className='text-fieldporter-white font-semibold'>Key Deliverables:</h4>
                    <ul className='space-y-2'>
                      {phase.deliverables.map((deliverable, deliverableIndex) => (
                        <li
                          key={deliverableIndex}
                          className='flex items-center space-x-3 text-sm text-fieldporter-gray'
                        >
                          <CheckCircle className='w-4 h-4 text-fieldporter-blue flex-shrink-0' />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
