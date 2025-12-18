"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface FAQSectionProps {
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
    <section className="py-32 md:py-36 lg:py-44 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:to-gray-950" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-6">
            {title}
          </h2>
          <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={`
                bg-gray-900/[0.01] dark:bg-white/[0.01] backdrop-blur-sm border border-gray-900/10 dark:border-white/10 rounded-2xl
                hover:bg-gray-900/[0.02] dark:hover:bg-white/[0.02] hover:border-gray-900/20 dark:hover:border-white/20 transition-all duration-300
                overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50
                ${openIndex === index ? "shadow-[0_0_30px_rgba(59,130,246,0.15)] border-blue-400/30" : ""}
              `}
                whileHover={{ y: -2, scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-gray-900/[0.01] dark:hover:bg-white/[0.01] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-inset rounded-2xl"
                  aria-expanded={openIndex === index}
                >
                  <h3
                    className={`text-lg font-medium pr-4 leading-relaxed transition-colors duration-300 ${
                      openIndex === index
                        ? "text-blue-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-all duration-300 flex-shrink-0 ${
                      openIndex === index
                        ? "rotate-180 text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    height: { duration: 0.4 },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="pt-4 border-t border-gray-900/10 dark:border-white/10">
                      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
