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
      className="relative py-24 md:py-32 overflow-hidden bg-gray-50 dark:bg-black/20"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Background Gradient Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-500/10 dark:via-transparent dark:to-purple-500/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 p-8 md:p-12 lg:p-16 items-center relative z-10">
            {/* Text Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>New Framework</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                  AI Opportunity Audit
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-lg">
                  Stop guessing where to invest. Get a scored strategic roadmap
                  and implementation plan tailored to your business data.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-95"
                  >
                    Start Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    href="/aios"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl transition-all duration-300 hover:border-gray-300 dark:hover:border-white/20 active:scale-95 backdrop-blur-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Visual/Graphic Side - Improved Card */}
            <div className="relative hidden md:block perspective-1000">
              <motion.div
                initial={{ opacity: 0, rotateY: 10, scale: 0.9 }}
                animate={isInView ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 group hover:shadow-blue-500/10 transition-all duration-500"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      Readiness Score
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Based on 26-point analysis
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-3xl font-bold text-emerald-500 tracking-tight">
                      32/40
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Excellent
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    <span>0</span>
                    <span>Target: 30+</span>
                    <span>40</span>
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: "80%" } : {}}
                      transition={{
                        duration: 1.5,
                        delay: 0.5,
                        ease: "easeOut",
                      }}
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-colors duration-300">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                      Projected Impact
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      High Value
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-colors duration-300">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                      Risk Level
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      Low
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Floating Tag */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
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
