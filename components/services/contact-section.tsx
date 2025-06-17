'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export function ContactSection({ title, description, ctaText, ctaHref }: ContactSectionProps) {
  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary to-bg-fieldporter-secondary' />

      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center'
        >
          <GlassCard className='p-8 md:p-12'>
            <div className='space-y-8'>
              {/* Icon */}
              <div className='w-20 h-20 mx-auto rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 p-5'>
                <MessageCircle className='w-full h-full text-fieldporter-blue' />
              </div>

              {/* Content */}
              <div className='space-y-4'>
                <h2 className='text-display-sm font-bold text-fieldporter-white'>{title}</h2>
                <p className='text-body-lg text-fieldporter-gray max-w-2xl mx-auto leading-relaxed'>
                  {description}
                </p>
              </div>

              {/* CTA */}
              <Button
                variant='primary'
                size='enterprise'
                className='group'
                onClick={() => {
                  window.location.href = ctaHref;
                }}
              >
                {ctaText}
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
