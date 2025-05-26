'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Clock, Shield, Star } from 'lucide-react';

export function ContactHero() {
  const scrollToForm = () => {
    const formElement = document.getElementById('consultation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-fieldporter-primary via-bg-fieldporter-secondary to-bg-fieldporter-tertiary'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(9,105,218,0.1),transparent_50%)] pointer-events-none' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.1),transparent_50%)] pointer-events-none' />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* Main Headline */}
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-fieldporter-white mb-6 font-inter leading-tight'>
            Ready to Transform Your Business with{' '}
            <span className='bg-gradient-to-r from-fieldporter-blue to-fieldporter-purple bg-clip-text text-transparent'>
              AI?
            </span>
          </h1>

          {/* Value Proposition */}
          <p className='text-lg sm:text-xl md:text-2xl text-fieldporter-gray mb-8 max-w-3xl mx-auto font-inter leading-relaxed'>
            Schedule a strategic consultation with our Fortune 500 AI experts. Get immediate access
            to our{' '}
            <span className='text-fieldporter-blue font-semibold'>$50,000 strategic framework</span>{' '}
            and actionable transformation roadmap.
          </p>

          {/* Trust Signals */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto'>
            <Card className='bg-white/5 border-white/10 backdrop-blur-sm'>
              <CardContent className='p-6 text-center'>
                <Clock className='h-8 w-8 text-fieldporter-blue mx-auto mb-3' />
                <h3 className='text-fieldporter-white font-semibold mb-2'>24-Hour Response</h3>
                <p className='text-fieldporter-gray text-sm'>
                  Guaranteed response within 24 hours for consultation requests
                </p>
              </CardContent>
            </Card>

            <Card className='bg-white/5 border-white/10 backdrop-blur-sm'>
              <CardContent className='p-6 text-center'>
                <Shield className='h-8 w-8 text-fieldporter-blue mx-auto mb-3' />
                <h3 className='text-fieldporter-white font-semibold mb-2'>Enterprise Security</h3>
                <p className='text-fieldporter-gray text-sm'>
                  SOC 2 compliant with enterprise-grade data protection
                </p>
              </CardContent>
            </Card>

            <Card className='bg-white/5 border-white/10 backdrop-blur-sm'>
              <CardContent className='p-6 text-center'>
                <Star className='h-8 w-8 text-fieldporter-blue mx-auto mb-3' />
                <h3 className='text-fieldporter-white font-semibold mb-2'>Proven Results</h3>
                <p className='text-fieldporter-gray text-sm'>
                  Average 340% ROI within 18 months of implementation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToForm}
            size='lg'
            className='bg-fieldporter-blue hover:bg-fieldporter-blue/90 text-fieldporter-white px-8 py-4 text-lg font-semibold group transition-all duration-300 hover:scale-105'
          >
            Schedule Strategic Consultation
            <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
          </Button>

          {/* Consultation Value */}
          <p className='text-fieldporter-gray mt-4 text-sm'>
            Includes comprehensive AI readiness assessment and strategic framework ($50,000 value)
          </p>
        </div>
      </div>
    </section>
  );
}
