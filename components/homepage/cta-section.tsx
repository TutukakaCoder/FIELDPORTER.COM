"use client";

import { trackCTA } from "@/lib/firebase-analytics";
import {
  easeInOut,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  CTAMagneticField3D,
  MobileMagneticEffect,
} from "./cta-magnetic-field-3d";
import { CTAPremiumBackground } from "./cta-premium-background";

// Base gradient background for fallback
function BaseGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black" />
    </div>
  );
}

// Interactive spotlight effect
function InteractiveSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Light mode spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-5 dark:hidden"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.03), transparent 50%)`,
        }}
      />
      {/* Dark mode spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-5 hidden dark:block"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.06), transparent 50%)`,
        }}
      />
    </>
  );
}

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  // Button refs for magnetic field
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const secondaryButtonRef = useRef<HTMLButtonElement>(null);

  // Hover states for magnetic field
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          ),
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add vertical fade animations like hero section
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [300, 700, 1100], [1, 0.9, 0.7]);
  const springContentY = useSpring(contentY, { damping: 30, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });

  const handleContactCTA = () => {
    trackCTA("contact", "Get Started", {
      location: "cta_section",
      button_position: "primary_cta",
    });
    window.location.href = "/contact";
  };

  const handlePortfolioCTA = () => {
    trackCTA("service_interest", "View Work", {
      location: "cta_section",
      button_position: "secondary_cta",
    });
    window.location.href = "/portfolio";
  };

  return (
    <section
      ref={ref}
      className="relative pt-32 md:pt-36 lg:pt-44 pb-40 md:pb-48 lg:pb-56 overflow-hidden"
    >
      <BaseGradientBackground />
      <CTAPremiumBackground />
      <InteractiveSpotlight />

      {/* Magnetic Field 3D Effects */}
      {!isMobile ? (
        <CTAMagneticField3D
          primaryButtonRef={primaryButtonRef}
          secondaryButtonRef={secondaryButtonRef}
          isPrimaryHovered={isPrimaryHovered}
          isSecondaryHovered={isSecondaryHovered}
        />
      ) : (
        <MobileMagneticEffect />
      )}

      <motion.div
        style={{ y: springContentY, opacity: springOpacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Enhanced Premium CTA Container with perfect spacing */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: easeInOut }}
          className="relative p-12 md:p-16 lg:p-20 rounded-3xl backdrop-blur-xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02] hover:bg-gray-900/[0.025] dark:hover:bg-white/[0.025] transition-all duration-500"
        >
          {/* Enhanced glassmorphism layers */}
          <div className="absolute inset-0 bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl rounded-3xl" />
          <div className="absolute inset-0 rounded-3xl border border-gray-900/5 dark:border-white/5" />

          <div className="relative z-10 space-y-12 md:space-y-16 lg:space-y-20">
            {/* Enhanced Headline with perfect spacing */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white leading-tight tracking-[-0.02em]"
            >
              Let&apos;s{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Explore Your Options
              </span>
            </motion.h2>

            {/* Enhanced Description with optimal spacing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Discuss your specific challenge and create a practical plan with
              clear timelines and realistic outcomes.
            </motion.p>

            {/* Enhanced Premium CTA Buttons with perfect hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-8 sm:gap-10 justify-center items-center"
            >
              {/* Enhanced Primary CTA with gradient background */}
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <button
                  ref={primaryButtonRef}
                  onClick={handleContactCTA}
                  onMouseEnter={() => setIsPrimaryHovered(true)}
                  onMouseLeave={() => setIsPrimaryHovered(false)}
                  className="
                    group relative px-10 py-5 rounded-2xl backdrop-blur-xl border border-blue-500/20 transition-all duration-300
                    bg-gradient-to-r from-blue-600/20 to-blue-500/20 hover:from-blue-500/30 hover:to-blue-400/30 
                    hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]
                    will-change-transform font-medium text-gray-900 dark:text-white
                    min-w-[240px] text-center
                  "
                >
                  {/* Enhanced glassmorphism layers */}
                  <div className="absolute inset-0 bg-blue-500/[0.05] backdrop-blur-xl rounded-2xl" />
                  <div className="absolute inset-0 rounded-2xl border border-blue-500/10" />

                  {/* Premium glow effect */}
                  <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-lg lg:text-xl">Contact Us</span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </button>
              </motion.div>

              {/* Enhanced Secondary CTA with refined styling */}
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <button
                  ref={secondaryButtonRef}
                  onClick={handlePortfolioCTA}
                  onMouseEnter={() => setIsSecondaryHovered(true)}
                  onMouseLeave={() => setIsSecondaryHovered(false)}
                  className="
                    group relative px-10 py-5 rounded-2xl backdrop-blur-xl border border-gray-900/20 dark:border-white/20 transition-all duration-300
                    bg-gray-900/5 dark:bg-white/5 hover:bg-gray-900/10 dark:hover:bg-white/10 hover:border-purple-400/40
                    hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
                    will-change-transform font-medium text-gray-900 dark:text-white
                    min-w-[240px] text-center
                  "
                >
                  {/* Enhanced glassmorphism layers */}
                  <div className="absolute inset-0 bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl rounded-2xl" />
                  <div className="absolute inset-0 rounded-2xl border border-gray-900/5 dark:border-white/5" />

                  {/* Premium glow effect */}
                  <div className="absolute -inset-1 rounded-2xl bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <span className="text-lg lg:text-xl">View Our Work</span>
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

            {/* Enhanced Trust Note with optimal positioning */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed"
            >
              No sales pitches. Just an honest conversation about whether we can
              help solve your specific challenge.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
