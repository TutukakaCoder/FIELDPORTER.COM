"use client";

import { trackCTA } from "@/lib/firebase-analytics";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";

export function CTASection() {
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const secondaryButtonRef = useRef<HTMLButtonElement>(null);

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
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Simple gradient background - no animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black" />

        {/* Subtle static gradient accents */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.08] blur-[100px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.3))",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.06] blur-[80px]"
          style={{
            background:
              "linear-gradient(225deg, rgba(168, 85, 247, 0.4), rgba(249, 115, 22, 0.3))",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* CTA Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative p-8 md:p-12 rounded-3xl backdrop-blur-xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02]"
        >
          {/* Glassmorphism layer */}
          <div className="absolute inset-0 bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl rounded-3xl" />
          <div className="absolute inset-0 rounded-3xl border border-gray-900/5 dark:border-white/5" />

          <div className="relative z-10 space-y-8 md:space-y-10">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-white leading-tight tracking-[-0.02em]">
              Let&apos;s{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Explore Your Options
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Discuss your specific challenge and create a practical plan
              focused on measurable outcomes and realistic timelines.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Primary CTA */}
              <motion.button
                ref={primaryButtonRef}
                onClick={handleContactCTA}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="
                  group relative px-8 py-4 rounded-xl backdrop-blur-xl border border-blue-500/20 transition-all duration-300
                  bg-gradient-to-r from-blue-600/20 to-blue-500/20 hover:from-blue-500/30 hover:to-blue-400/30 
                  hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]
                  font-medium text-gray-900 dark:text-white
                  min-w-[200px] text-center
                "
              >
                {/* Glassmorphism layers */}
                <div className="absolute inset-0 bg-blue-500/[0.05] backdrop-blur-xl rounded-xl" />
                <div className="absolute inset-0 rounded-xl border border-blue-500/10" />

                {/* Glow effect */}
                <div className="absolute -inset-1 rounded-xl bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="relative z-10 flex items-center justify-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-base md:text-lg">Contact Us</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                ref={secondaryButtonRef}
                onClick={handlePortfolioCTA}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="
                  group relative px-8 py-4 rounded-xl backdrop-blur-xl border border-gray-900/20 dark:border-white/20 transition-all duration-300
                  bg-gray-900/5 dark:bg-white/5 hover:bg-gray-900/10 dark:hover:bg-white/10 hover:border-purple-400/40
                  hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
                  font-medium text-gray-900 dark:text-white
                  min-w-[200px] text-center
                "
              >
                {/* Glassmorphism layers */}
                <div className="absolute inset-0 bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl rounded-xl" />
                <div className="absolute inset-0 rounded-xl border border-gray-900/5 dark:border-white/5" />

                {/* Glow effect */}
                <div className="absolute -inset-1 rounded-xl bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="relative z-10 flex items-center justify-center space-x-2">
                  <span className="text-base md:text-lg">View Our Work</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </motion.button>
            </div>

            {/* Trust Note */}
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
              No sales pitches. Just an honest conversation about whether we can
              help solve your specific challenge.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
