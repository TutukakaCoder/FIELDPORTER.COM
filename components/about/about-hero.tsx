"use client";

import { Button } from "@/components/ui/button";
import { BRAND } from "@/config/constants";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// Premium aurora background matching homepage
function PremiumAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black" />

      {/* Enhanced grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle aurora effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

// Floating geometric elements
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 bg-blue-400/30 rounded-full"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-1 h-1 bg-white/40 rounded-full"
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}

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
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      <PremiumAuroraBackground />
      <FloatingElements />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 md:space-y-8"
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

            {/* Above-fold conversion CTA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 pt-2"
            >
              <Button
                variant="invert"
                size="lg"
                className="w-full md:w-auto max-w-xs min-h-[44px] text-sm md:text-base px-6 md:px-10"
                asChild
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  <span>Book a Call</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </Button>
              <Link
                href="/portfolio"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white underline-offset-4 hover:underline transition-colors min-h-[44px] inline-flex items-center py-2"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Premium divider */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center pt-4 md:pt-8"
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
