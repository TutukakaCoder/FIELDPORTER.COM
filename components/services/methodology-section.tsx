"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BuildPhase {
  phase: string;
  title: string;
  description: string;
}

interface MethodologySectionProps {
  title: string;
  subtitle: string;
  phases?: BuildPhase[];
}

export function MethodologySection({
  title,
  subtitle,
  phases = [],
}: MethodologySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (phases.length === 0) return null;

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 list-none p-0 m-0 items-stretch">
        {phases.map((phase, index) => (
          <motion.li
            key={phase.phase}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="h-full"
          >
            <div className="h-full flex flex-col rounded-2xl p-5 md:p-6 backdrop-blur-xl bg-gray-900/[0.03] dark:bg-white/[0.03] border border-gray-900/10 dark:border-white/10 transition-colors duration-200 hover:bg-gray-900/[0.05] dark:hover:bg-white/[0.05] hover:border-blue-500/25">
              <span className="inline-flex items-center justify-center w-9 h-9 mb-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                {phase.phase}
              </span>
              <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-2 leading-snug">
                {phase.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {phase.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
