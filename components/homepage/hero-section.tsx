'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';

export function HeroSection() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-bg-fieldporter-primary via-bg-fieldporter-secondary to-bg-fieldporter-tertiary'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(9,105,218,0.1),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.1),transparent_50%)]' />
      </div>

      {/* Geometric Pattern Overlay */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-20 left-20 w-32 h-32 border border-fieldporter-blue/30 rotate-45' />
        <div className='absolute top-40 right-32 w-24 h-24 border border-fieldporter-purple/30 rotate-12' />
        <div className='absolute bottom-32 left-1/4 w-40 h-40 border border-fieldporter-blue/20 rotate-45' />
        <div className='absolute bottom-20 right-20 w-28 h-28 border border-fieldporter-purple/20 rotate-12' />
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <div className='space-y-8 animate-fade-in'>
          {/* Main Headline */}
          <h1 className='text-display-sm md:text-display-md lg:text-display-lg xl:text-display-xl font-bold text-fieldporter-white'>
            We Build What
            <br />
            <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
              We Recommend
            </span>
          </h1>

          {/* Subheading */}
          <p className='text-body-lg md:text-body-xl text-fieldporter-gray max-w-3xl mx-auto leading-relaxed'>
            Operators Building AI Solutions, Not Just Consultants Talking About Them. We build AI
            systems for our own businesses, then help you build yours with ROI-focused AI
            implementation proven in our own operations.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-8'>
            <Button
              variant='primary'
              size='enterprise-lg'
              className='group min-w-[280px]'
              onClick={() => {
                window.location.href = '/contact';
              }}
            >
              AI Strategy Consultation
              <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
            </Button>

            <Button
              variant='fieldporter-ghost'
              size='enterprise-lg'
              className='group min-w-[280px]'
              onClick={() => {
                window.location.href = '/about';
              }}
            >
              <Download className='mr-2 h-5 w-5 group-hover:scale-110 transition-transform' />
              See Our Portfolio
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className='pt-16 space-y-4'>
            <p className='text-body-sm text-fieldporter-gray/80 uppercase tracking-wider'>
              Trusted by VCs and Portfolio Companies
            </p>
            <div className='flex flex-wrap justify-center items-center gap-8 text-fieldporter-gray/60'>
              <div className='text-body-sm'>Turn AI from Expense into Competitive Advantage</div>
              <div className='text-body-sm'>•</div>
              <div className='text-body-sm'>We&apos;ve Automated Our Own Processes First</div>
              <div className='text-body-sm'>•</div>
              <div className='text-body-sm'>40% Efficiency Gains, 6-Month Payback</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 border-2 border-fieldporter-gray/40 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-fieldporter-gray/60 rounded-full mt-2 animate-pulse' />
        </div>
      </div>
    </section>
  );
}
