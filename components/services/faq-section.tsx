'use client';

import { GlassCard } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQSectionProps {
  title: string;
  subtitle: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSection({ title, subtitle, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='py-20 lg:py-28 relative'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b from-bg-fieldporter-tertiary to-bg-fieldporter-primary' />

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

        {/* FAQ Items */}
        <div className='space-y-4'>
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
                  className='w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200'
                  aria-expanded={openIndex === index}
                >
                  <h3 className='text-heading-sm font-semibold text-fieldporter-white pr-4'>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-fieldporter-gray transition-transform duration-200 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='overflow-hidden'
                >
                  <div className='px-6 pb-6'>
                    <p className='text-body-md text-fieldporter-gray leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
