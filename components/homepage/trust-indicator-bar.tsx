"use client";

import { Clock, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const indicators = [
  {
    id: "time-saved",
    value: "85%",
    label: "Onboarding time saved (client platform)",
    icon: Clock,
  },
  {
    id: "hours-reclaimed",
    value: "15+ hrs",
    label: "Weekly reclaimed (workflow automation)",
    icon: Zap,
  },
  {
    id: "to-production",
    value: "1–3 weeks",
    label: "To first useful system",
    icon: CheckCircle,
  },
];

export function TrustIndicatorBar() {
  return (
    <section
      className="relative section-rhythm-tight border-y border-gray-900/5 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.01] backdrop-blur-sm"
      aria-label="Proof points"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="flex justify-center mb-2">
                  <Icon
                    className="w-5 h-5 text-blue-500 dark:text-blue-400 opacity-80"
                    aria-hidden
                  />
                </div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-1 group-hover:scale-105 transition-transform duration-300">
                  {indicator.value}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {indicator.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
