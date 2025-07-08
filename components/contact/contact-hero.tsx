"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

// Premium aurora background matching services page with performance optimization
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

export const ContactHero = React.memo(() => {
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

  const y = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0.7]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 15 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
      },
    }),
    [],
  );

  const scrollToForm = useCallback(() => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[60vh] flex items-center justify-center overflow-hidden"
    >
      <PremiumAuroraBackground />
      <FloatingElements />

      <motion.div
        style={{ y, opacity, willChange: "transform" }}
        className="relative z-10 w-full"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Clean headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-[-0.025em]"
            >
              Contact{" "}
              <span className="font-light bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Us
              </span>
            </motion.h1>

            {/* Simple subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed"
            >
              Use the form below or chat with our AI assistant
            </motion.p>

            {/* Direct scroll-to-form CTA */}
            <motion.div variants={itemVariants} className="pt-8">
              <motion.button
                onClick={scrollToForm}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 mx-auto px-8 py-4 bg-white/[0.015] hover:bg-white/[0.04] border border-white/20 hover:border-blue-400/40 rounded-2xl text-white hover:text-blue-300 transition-all duration-300 font-medium backdrop-blur-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                <span className="text-lg">Start here</span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Premium divider */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center pt-12"
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

ContactHero.displayName = "ContactHero";
