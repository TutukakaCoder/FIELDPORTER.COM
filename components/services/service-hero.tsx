"use client";

import { HeroAuroraBackground } from "@/components/layout/hero-aurora-background";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
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
    <section ref={containerRef} className="hero-shell">
      <HeroAuroraBackground />

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
              <motion.div
                className="p-4 rounded-2xl backdrop-blur-md border border-gray-900/10 bg-gray-900/[0.02] dark:border-white/10 dark:bg-white/[0.02] transition-all duration-300 hover:border-blue-400/40 hover:bg-gray-900/[0.04] dark:hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Briefcase className="w-12 h-12 text-blue-500 dark:text-blue-400 transition-transform duration-300 group-hover:rotate-3" />
              </motion.div>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white leading-tight">
                Services
              </h1>
              <div className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                {subtitle}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
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
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[240px] group"
                  asChild
                >
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center justify-center gap-3"
                  >
                    <span className="text-base lg:text-lg">{ctaText}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
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
