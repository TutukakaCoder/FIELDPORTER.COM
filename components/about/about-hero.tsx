"use client";

import { HeroAuroraBackground } from "@/components/layout/hero-aurora-background";
import { BRAND } from "@/config/constants";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { Layers } from "lucide-react";
import { useRef } from "react";

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0.3]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section ref={containerRef} className="hero-shell">
      <HeroAuroraBackground />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Icon */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="p-4 rounded-2xl backdrop-blur-md border border-gray-900/10 bg-gray-900/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
                <Layers className="w-12 h-12 text-blue-500 dark:text-blue-400" />
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white leading-tight">
                FIELDPORTER
              </h1>
              <div className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                {BRAND.tagline}
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We build practical AI systems, automations, and internal tools
                that remove manual work and speed up decisions. Every
                recommendation comes from hands-on experience deploying AI for
                growing companies.
              </p>
            </motion.div>

            {/* Premium divider */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center pt-8"
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
