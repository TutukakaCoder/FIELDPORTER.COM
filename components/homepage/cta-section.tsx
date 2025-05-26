'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react';

export function CTASection() {
  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary to-bg-fieldporter-secondary' />

      <div className='relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <GlassCard className='p-8 md:p-12 text-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h2 className='text-display-sm md:text-display-md font-bold text-fieldporter-white'>
                Stop Talking About AI.
                <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
                  {' '}
                  Start Building It.
                </span>
              </h2>

              <p className='text-body-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'>
                Get a strategic AI consultation from operators who&apos;ve built profitable AI
                businesses. We&apos;ll assess your opportunities, identify quick wins, and create an
                actionable roadmap for measurable ROI within 6 months.
              </p>
            </div>

            {/* Value Props */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-6'>
              <div className='flex items-center justify-center gap-3 text-fieldporter-gray'>
                <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0' />
                <span className='text-body-sm'>No sales pitch, just strategy</span>
              </div>
              <div className='flex items-center justify-center gap-3 text-fieldporter-gray'>
                <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0' />
                <span className='text-body-sm'>Direct access to principals</span>
              </div>
              <div className='flex items-center justify-center gap-3 text-fieldporter-gray'>
                <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0' />
                <span className='text-body-sm'>Proven implementation methods</span>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                variant='primary'
                size='enterprise-lg'
                className='group min-w-[320px]'
                onClick={() => {
                  window.location.href = '/contact';
                }}
              >
                <Calendar className='mr-2 h-5 w-5' />
                Schedule Your AI Strategy Session
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Button>

              <Button
                variant='fieldporter-secondary'
                size='enterprise-lg'
                className='group min-w-[320px]'
                onClick={() => {
                  window.location.href = '/services';
                }}
              >
                See Our Portfolio & Results
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Button>
            </div>

            <div className='pt-6 border-t border-fieldporter-gray/20 space-y-3'>
              <p className='text-body-md text-fieldporter-white font-medium'>
                What You&apos;ll Get in Your Consultation:
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-body-sm text-fieldporter-gray'>
                <div className='flex items-start gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue mt-2 flex-shrink-0' />
                  <span>AI readiness assessment for your specific industry</span>
                </div>
                <div className='flex items-start gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue mt-2 flex-shrink-0' />
                  <span>Identification of 3-5 high-impact automation opportunities</span>
                </div>
                <div className='flex items-start gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue mt-2 flex-shrink-0' />
                  <span>ROI projections based on our operational experience</span>
                </div>
                <div className='flex items-start gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue mt-2 flex-shrink-0' />
                  <span>Actionable next steps with timeline and resource requirements</span>
                </div>
              </div>
              <p className='text-body-sm text-fieldporter-gray/80 pt-2'>
                Complimentary 45-minute session • No commitment required • Immediate value delivered
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
