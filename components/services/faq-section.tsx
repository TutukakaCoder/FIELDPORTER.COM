'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
  category?: 'strategy' | 'implementation' | 'timeline' | 'investment';
}

interface FAQSectionProps {
  title: string;
  subtitle: string;
  faqs: FAQ[];
}

export function FAQSection({ title, subtitle, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categoryColors = {
    strategy: 'from-fieldporter-blue/20 to-fieldporter-blue/10',
    implementation: 'from-fieldporter-purple/20 to-fieldporter-purple/10',
    timeline: 'from-green-500/20 to-green-500/10',
    investment: 'from-yellow-500/20 to-yellow-500/10',
  };

  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-tertiary' />

      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
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
          <p className='text-body-lg text-fieldporter-gray max-w-2xl mx-auto leading-relaxed'>
            {subtitle}
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className='space-y-4 mb-12'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className='overflow-hidden'>
                <button
                  onClick={() => toggleFAQ(index)}
                  className='w-full p-6 text-left hover:bg-white/5 transition-colors duration-200'
                >
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        {faq.category && (
                          <div
                            className={`px-2 py-1 rounded-full bg-gradient-to-r ${categoryColors[faq.category]} text-xs font-medium text-fieldporter-white`}
                          >
                            {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                          </div>
                        )}
                      </div>
                      <h3 className='text-heading-sm font-semibold text-fieldporter-white pr-4'>
                        {faq.question}
                      </h3>
                    </div>

                    <div className='flex-shrink-0'>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className='w-8 h-8 rounded-lg bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple flex items-center justify-center'
                      >
                        {openIndex === index ? (
                          <Minus className='w-4 h-4 text-fieldporter-white' />
                        ) : (
                          <Plus className='w-4 h-4 text-fieldporter-white' />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-hidden'
                    >
                      <div className='px-6 pb-6'>
                        <div className='pt-4 border-t border-white/10'>
                          <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center'
        >
          <GlassCard className='p-8'>
            <div className='space-y-6'>
              <div className='w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-fieldporter-blue to-fieldporter-purple p-4'>
                <MessageCircle className='w-full h-full text-fieldporter-white' />
              </div>

              <div className='space-y-2'>
                <h3 className='text-heading-lg font-semibold text-fieldporter-white'>
                  Still Have Questions?
                </h3>
                <p className='text-body-md text-fieldporter-gray max-w-md mx-auto'>
                  Our team is ready to discuss your specific requirements and provide detailed
                  answers.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button
                  variant='primary'
                  size='enterprise'
                  className='group'
                  onClick={() => {
                    // TODO: Implement consultation booking
                    window.location.href = '/contact';
                  }}
                >
                  Schedule a Consultation
                  <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                </Button>

                <Button
                  variant='fieldporter-ghost'
                  size='enterprise'
                  onClick={() => {
                    // TODO: Implement contact form
                    window.location.href = '/contact';
                  }}
                >
                  Contact Our Team
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
