"use client";

import { HeroAuroraBackground } from "@/components/layout/hero-aurora-background";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export function InsightsHero() {
  return (
    <section className="hero-shell">
      <HeroAuroraBackground />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl backdrop-blur-md border border-gray-900/10 bg-gray-900/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <BookOpen className="w-12 h-12 text-blue-500 dark:text-blue-400" />
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-light text-gray-900 dark:text-white leading-tight">
              Insights
            </h1>
            <div className="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light">
              Better AI decisions, backed by evidence
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Practical writing on AI in production software, automation, and
              operations.
            </p>
          </div>

          <div className="flex justify-center pt-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
