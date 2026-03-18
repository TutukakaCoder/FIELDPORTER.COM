"use client";

import { useScrollState, useStableMobile, useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface BackToTopProps {
  className?: string;
  showAfter?: number;
}

export function BackToTop({ className, showAfter = 400 }: BackToTopProps) {
  const { scrollY } = useScrollState();
  const isVisible = scrollY > showAfter;
  const isMobile = useStableMobile();
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const duration = prefersReducedMotion ? 0 : 0.2;
  const noMotion = prefersReducedMotion ? {} : { scale: 1.05, y: -2 };
  const noTap = prefersReducedMotion ? {} : { scale: 0.95 };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.8,
            y: prefersReducedMotion ? 0 : 20,
          }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.8,
            y: prefersReducedMotion ? 0 : 20,
          }}
          transition={{ duration, ease: "easeOut" }}
          whileHover={noMotion}
          whileTap={noTap}
          className={cn(
            "fixed z-[60] transition-all duration-300",
            isMobile
              ? "left-4 w-14 h-14 bottom-with-safe"
              : "bottom-6 left-6 w-16 h-16",

            // Matching glassmorphism design
            "bg-black/20 backdrop-blur-xl border border-white/10",
            "hover:bg-black/30 hover:border-white/20",

            // Subtle glow effect
            "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
            "hover:shadow-[0_0_22px_rgba(59,130,246,0.2)]",

            // Perfect rounded button
            "rounded-2xl",

            // Center the icon
            "flex items-center justify-center",

            // Touch-friendly
            "touch-manipulation select-none",

            className,
          )}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ChevronUp
            className={cn(isMobile ? "w-6 h-6" : "w-7 h-7", "text-white/90")}
            strokeWidth={1.5}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
