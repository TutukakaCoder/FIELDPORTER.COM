"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function AIAuditSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 shadow-xl backdrop-blur-xl">
          {/* Background Gradient Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:via-transparent dark:to-purple-500/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 p-8 md:p-12 items-center relative z-10">
            {/* Text Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
                  AI Opportunity Assessment
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  Not sure what AI is right for you? Get a scored roadmap for
                  your automation strategy and move forward with certainty.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-95"
                  >
                    Book Audit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/aios"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 active:scale-95 backdrop-blur-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Visual/Graphic Side - Readiness card (visible on all screens) */}
            <div className="relative block perspective-1000">
              <motion.div
                initial={{ opacity: 0, rotateY: 10, scale: 0.9 }}
                animate={isInView ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 sm:p-6 group hover:shadow-emerald-500/10 transition-all duration-500"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                      AI Readiness Score
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Example output (based on workflow data)
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-blue-500 tracking-tight">
                      Medium
                    </span>
                  </div>
                </div>

                {/* Bars - sample output */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1">
                      <span>Process Clarity</span>
                      <span>High</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1">
                      <span>Data Structure</span>
                      <span>Low</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[40%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-1">
                      <span>Tech Stack</span>
                      <span>Modern</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[90%] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Insight Box - example recommendation */}
                <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-500/20">
                  <div className="flex gap-3">
                    <div className="mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100">
                        Example: Recommended Next Step
                      </h4>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
                        Your process is ready for automation, but your data
                        needs structuring first. Start with our Data Hygiene
                        module.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Glow Behind Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-500/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
