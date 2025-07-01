"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  ctaText: string;
  ctaHref: string;
}

// Premium aurora background matching about page with performance optimization
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

      {/* Subtle aurora effects with hardware acceleration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
          style={{
            background:
              "linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.2))",
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -100, 80, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        />

        <motion.div
          className="absolute -top-1/3 -right-1/3 w-[500px] h-[500px] rounded-full opacity-15 blur-[80px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(249, 115, 22, 0.2))",
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
          animate={{
            x: [0, -120, 100, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
            type: "tween",
          }}
        />
      </div>
    </div>
  );
}

// Floating geometric elements with performance optimization
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 bg-blue-400/30 rounded-full"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          type: "tween",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-1 h-1 bg-white/40 rounded-full"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
          type: "tween",
        }}
      />
    </div>
  );
}

export function ServiceHero({
  title,
  subtitle,
  description,
  stats,
  ctaText,
  ctaHref,
}: ServiceHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ensure immediate centering on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
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
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Icon */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="p-4 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.015]">
                <Layers className="w-12 h-12 text-blue-400" />
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
                Strategic Research &{" "}
                <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  AI Implementation
                </span>
              </h1>

              {/* SMB AI Focus Subtitle */}
              <div className="text-xl md:text-2xl text-gray-300 font-light">
                {subtitle}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-8">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <button
                  onClick={() => (window.location.href = ctaHref)}
                  className="
                    group relative px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/20 transition-all duration-300
                    bg-white/[0.015] hover:bg-white/[0.04] hover:border-blue-400/40
                    hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]
                    will-change-transform font-medium text-white
                    min-w-[240px] text-center
                  "
                >
                  {/* Enhanced glassmorphism layers */}
                  <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-xl rounded-2xl" />
                  <div className="absolute inset-0 rounded-2xl border border-white/5" />

                  {/* Premium glow effect */}
                  <div className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <span className="text-base lg:text-lg">{ctaText}</span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </button>
              </motion.div>
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
