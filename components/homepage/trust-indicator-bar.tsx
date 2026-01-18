"use client";

import { motion } from "framer-motion";

export function TrustIndicatorBar() {
  const indicators = [
    {
      id: "strategy",
      value: "Days",
      label: "Not Months",
    },
    {
      id: "training",
      value: "No",
      label: "Vendor Lock-in",
    },
    {
      id: "turnaround",
      value: "100%",
      label: "Founder Led",
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 border-y border-gray-900/5 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.01] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {indicators.map((indicator, index) => (
            <motion.div
              key={indicator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-1 group-hover:scale-105 transition-transform duration-300">
                {indicator.value}
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {indicator.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
