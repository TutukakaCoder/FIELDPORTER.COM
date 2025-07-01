"use client";

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

// Premium aurora background matching homepage
function PremiumAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />

      {/* Enhanced grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle aurora effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <PremiumAuroraBackground />
      <FloatingElements />

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
              <div className="p-4 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.02]">
                <Layers className="w-12 h-12 text-blue-400" />
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light text-white leading-tight">
                FIELDPORTER
              </h1>
              <div className="text-xl md:text-2xl text-gray-300 font-light">
                Strategic Research & AI Implementation
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                We help businesses integrate AI effectively while building our
                own portfolio of AI-powered tools. Every recommendation comes
                from hands-on experience with the latest technologies.
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
