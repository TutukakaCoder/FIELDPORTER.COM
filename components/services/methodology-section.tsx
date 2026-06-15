"use client";

import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useRef } from "react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollByCard = useCallback((direction: "prev" | "next") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.querySelector(".methodology-card")?.clientWidth ?? 360;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }, []);

  if (phases.length === 0) return null;

  return (
    <section ref={ref} className="py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-white/70 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="md:hidden space-y-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="methodology-card rounded-2xl border border-gray-900/10 dark:border-white/10 bg-white dark:bg-black p-6"
            >
              <div className="text-sm font-medium text-blue-500 mb-2">
                Step {phase.phase}
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                {phase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:block relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
            style={{ scrollbarWidth: "thin" }}
          >
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="methodology-card flex-shrink-0 w-[300px] lg:w-[340px] snap-start rounded-2xl border border-gray-900/10 dark:border-white/10 bg-white dark:bg-black p-8"
              >
                <div className="text-sm font-medium text-blue-500 mb-2">
                  Step {phase.phase}
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  {phase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              className="p-3 rounded-full bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 hover:bg-gray-900/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Previous step"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              className="p-3 rounded-full bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 hover:bg-gray-900/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Next step"
            >
              <ArrowRight className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
