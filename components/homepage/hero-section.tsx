"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useMemo, useRef } from "react";
import {
  HERO_HEADLINE,
  HERO_PROOF_LINE,
  HERO_SUPPORTING_LINE,
  HERO_VALUE_PROP,
} from "@/config/constants";
import {
  useDeviceCapability,
  useReducedMotion,
  useStableMobile,
} from "../../hooks";

// Lazy load the 3D backgrounds
const Hero3DBackground = dynamic(
  () =>
    import("./hero-3d-background").then((mod) => ({
      default: mod.Hero3DBackground,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
    ),
  },
);

const Hero3DBackgroundSimplified = dynamic(
  () =>
    import("./hero-3d-background-simplified").then((mod) => ({
      default: mod.Hero3DBackgroundSimplified,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
    ),
  },
);

// Memoized background pattern
const BackgroundPattern = memo(() => {
  const isMobile = useStableMobile();

  const patternSettings = useMemo(
    () => ({
      width: isMobile ? "60" : "40",
      height: isMobile ? "60" : "40",
      path: isMobile ? "M 60 0 L 0 0 0 60" : "M 40 0 L 0 0 0 40",
    }),
    [isMobile],
  );

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-30 pointer-events-none">
      <svg className="absolute w-full h-full">
        <defs>
          <pattern
            id="grid"
            width={patternSettings.width}
            height={patternSettings.height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={patternSettings.path}
              fill="none"
              stroke="rgba(0,0,0,0.03)"
              strokeWidth="1"
              className="dark:hidden"
            />
            <path
              d={patternSettings.path}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
              className="hidden dark:block"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
});

BackgroundPattern.displayName = "BackgroundPattern";

// Optimized premium aurora background
const PremiumAuroraBackground = memo(() => {
  const isMobile = useStableMobile();
  const prefersReducedMotion = useReducedMotion();

  const auroraSettings = useMemo(
    () => ({
      grain: isMobile ? "opacity-[0.003]" : "opacity-[0.008]",
      showAnimated: !prefersReducedMotion,
      blurAmount: 80,
    }),
    [isMobile, prefersReducedMotion],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-transparent" />

      <div
        className={`absolute inset-0 ${auroraSettings.grain}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {auroraSettings.showAnimated ? (
        <>
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full opacity-15"
            style={{
              background:
                "linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.15))",
              willChange: "transform",
              filter: `blur(${auroraSettings.blurAmount}px)`,
              left: "calc(50% - 150px)",
              top: "calc(50% - 150px)",
            }}
            animate={{
              scale: [1, 1.1, 0.95, 1],
              opacity: [0.15, 0.2, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      ) : null}
    </div>
  );
});

PremiumAuroraBackground.displayName = "PremiumAuroraBackground";

// Lighter hero background for mobile/tablet (no 3D, simple gradient)
const LightHeroBackground = memo(() => (
  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black" />
));

LightHeroBackground.displayName = "LightHeroBackground";

// Tiered Background System - mobile/tablet get lighter background
const TieredBackground = memo(() => {
  const { experience, isMobile, isTablet } = useDeviceCapability();

  if (isMobile || isTablet) {
    return <LightHeroBackground />;
  }

  switch (experience) {
    case "full":
      return <Hero3DBackground />;
    case "simplified":
      return <Hero3DBackgroundSimplified />;
    case "css-only":
    default:
      return <PremiumAuroraBackground />;
  }
});

TieredBackground.displayName = "TieredBackground";

// Animated CTA Button - uses shared button system
const AnimatedCTA = memo(() => {
  const isMobile = useStableMobile();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`flex ${isMobile ? "flex-col w-full px-4" : "flex-row"} items-center justify-center gap-4 sm:gap-6`}
    >
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -2 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        className={isMobile ? "w-full relative group" : "relative group"}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
        <Button
          variant="invert"
          size="lg"
          className={`relative text-base sm:text-lg px-8 sm:px-10 h-14 shadow-2xl ${isMobile ? "w-full" : ""}`}
          asChild
        >
          <Link href="/contact" className="inline-flex items-center gap-2">
            <span>Book a Call</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>

      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -2 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        className={isMobile ? "w-full" : ""}
      >
        <Button
          variant="outline"
          size="lg"
          className={`text-base sm:text-lg px-8 sm:px-10 h-14 bg-white/[0.02] hover:bg-white/[0.08] border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 ${isMobile ? "w-full" : ""}`}
          asChild
        >
          <Link href="/portfolio">View Portfolio</Link>
        </Button>
      </motion.div>
    </div>
  );
});

AnimatedCTA.displayName = "AnimatedCTA";

// Main Hero Section
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const { textReveal, containerVariants } = useMemo(() => {
    const duration = prefersReducedMotion ? 0 : 0.8;
    const stagger = prefersReducedMotion ? 0 : 0.1;
    return {
      textReveal: {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      } as Variants,
      containerVariants: {
        visible: { transition: { staggerChildren: stagger } },
      },
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-24 overflow-hidden bg-transparent"
    >
      <div className="fixed inset-0 z-0">
        <TieredBackground />
        <BackgroundPattern />
      </div>

      {/* Bottom gradient fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 dark:to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-8 md:space-y-12"
        >
          <div className="space-y-6 relative">
            {/* Background glow to ensure text readability against stars */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-black/40 dark:bg-black/40 blur-[100px] rounded-full pointer-events-none -z-10" />

            <motion.div variants={textReveal} className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-300">
                  {HERO_SUPPORTING_LINE}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={textReveal}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 leading-[1.1] pb-2 break-words max-w-4xl mx-auto"
            >
              {HERO_HEADLINE}
            </motion.h1>

            <motion.p
              variants={textReveal}
              className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
            >
              {HERO_VALUE_PROP}
            </motion.p>
          </div>

          <motion.div variants={textReveal} className="pt-6">
            <AnimatedCTA />
            <p className="mt-8 text-sm sm:text-base font-medium text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {HERO_PROOF_LINE}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
