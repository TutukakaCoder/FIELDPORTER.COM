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

      <ol className="max-w-2xl mx-auto list-none p-0 m-0">
        {phases.map((phase, index) => {
          const isLast = index === phases.length - 1;
          return (
            <motion.li
              key={phase.phase}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className={`flex gap-4 md:gap-6 ${isLast ? "pb-0" : "pb-8"}`}
            >
              <div className="flex flex-col items-center w-8 shrink-0">
                <span className="text-sm font-medium tabular-nums text-blue-600 dark:text-blue-400 leading-none pt-1">
                  {phase.phase}
                </span>
                {!isLast && (
                  <div
                    className="w-px flex-1 mt-3 bg-gray-900/10 dark:bg-white/10"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-2">
                  {phase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
