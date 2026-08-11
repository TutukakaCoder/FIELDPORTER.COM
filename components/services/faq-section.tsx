"use client";

import { useReducedMotion } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface FAQSectionProps {
  title: string;
  subtitle: string;
  faqs: ReadonlyArray<{
    question: string;
    answer: string;
  }>;
}

export function FAQSection({ title, subtitle, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const enterY = prefersReducedMotion ? 0 : 20;
  const hoverLift = prefersReducedMotion ? 0 : -2;
  const hoverScale = prefersReducedMotion ? 1 : 1.005;
  const motionDuration = prefersReducedMotion ? 0 : 0.3;

  return (
    <section
      className="py-32 md:py-36 lg:py-44 relative"
      aria-labelledby="services-faq-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:to-gray-950" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: enterY }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2
            id="services-faq-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-6"
          >
            {title}
          </h2>
          <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const headingId = `faq-heading-${index}`;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: prefersReducedMotion ? 1 : 0, y: enterY }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`
                bg-gray-900/[0.01] dark:bg-white/[0.01] backdrop-blur-sm border border-gray-900/10 dark:border-white/10 rounded-2xl
                hover:bg-gray-900/[0.02] dark:hover:bg-white/[0.02] hover:border-gray-900/20 dark:hover:border-white/20 transition-all duration-300
                overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50
                ${isOpen ? "shadow-[0_0_30px_rgba(59,130,246,0.15)] border-blue-400/30" : ""}
              `}
                  whileHover={{ y: hoverLift, scale: hoverScale }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                >
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    aria-controls={answerId}
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-gray-900/[0.01] dark:hover:bg-white/[0.01] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-inset rounded-2xl"
                    aria-expanded={isOpen}
                  >
                    <h3
                      id={headingId}
                      className={`text-lg font-medium pr-4 leading-relaxed transition-colors duration-300 ${
                        isOpen
                          ? "text-blue-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-5 h-5 transition-all duration-300 flex-shrink-0 ${
                        isOpen
                          ? "rotate-180 text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={answerId}
                        key="answer"
                        role="region"
                        aria-labelledby={headingId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: motionDuration,
                          ease: "easeOut",
                          height: { duration: prefersReducedMotion ? 0 : 0.4 },
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
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
