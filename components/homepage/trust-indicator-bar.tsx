"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TrustParticles3D } from "./trust-particles-3d";

export function TrustIndicatorBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const indicators = [
    {
      id: "projects",
      value: "15+",
      label: "Successful AI Projects",
    },
    {
      id: "strategy",
      value: "Actionable Roadmaps",
      label: "For Your AI Integration",
    },
    {
      id: "training",
      value: "Unlock Potential",
      label: "Through Effective AI Training",
    },
    {
      id: "turnaround",
      value: "3-5 Day",
      label: "Strategic Research Turnaround",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* 3D confidence particles - R3F events disabled to prevent scroll capture */}
      <TrustParticles3D hoveredMetricIndex={hoveredIndex ?? -1} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Subtle separator line with gentle animation */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-900/10 dark:via-white/10 to-transparent mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />

        {/* Clean metrics layout */}
        <div className="relative">
          {/* Container for metrics content */}

          {/* Clean metrics grid */}
          <div
            className={`grid gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-4"}`}
          >
            {indicators.map((indicator, index) => (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                onHoverStart={() => !isMobile && setHoveredIndex(index)}
                onHoverEnd={() => !isMobile && setHoveredIndex(null)}
                whileHover={!isMobile ? { y: -2 } : {}}
                className="relative text-center group cursor-default"
              >
                {/* Subtle hover glow with enhanced animation */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/8 rounded-lg opacity-0 group-hover:opacity-100 -m-2"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Value with subtle hover scaling */}
                  <motion.div
                    className={`font-semibold text-gray-900 dark:text-white mb-2 ${isMobile ? "text-xl" : "text-lg lg:text-xl"}`}
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {indicator.value}
                  </motion.div>

                  {/* Label with gentle fade-in on hover */}
                  <motion.div
                    className={`text-gray-600 dark:text-gray-300 font-light leading-relaxed transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 ${isMobile ? "text-sm" : "text-xs lg:text-sm"}`}
                    initial={{ opacity: 0.8 }}
                    whileHover={!isMobile ? { opacity: 1 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    {indicator.label}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom separator line with gentle animation */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-900/5 dark:via-white/5 to-transparent mt-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
        />
      </motion.div>
    </section>
  );
}
