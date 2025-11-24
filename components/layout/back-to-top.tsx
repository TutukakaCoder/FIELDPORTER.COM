"use client";

import { useStableMobile } from "@/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

interface BackToTopProps {
  className?: string;
  showAfter?: number; // Show button after scrolling this many pixels
}

export function BackToTop({ className, showAfter = 400 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useStableMobile();

  useEffect(() => {
    // SCROLL FIX: Optimize back-to-top scroll listener
    let ticking = false;
    let lastCheck = 0;
    const throttleDelay = 100; // Throttle state updates

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const now = Date.now();
          // Only check if throttle delay passed
          if (now - lastCheck >= throttleDelay) {
            const newIsVisible = window.scrollY > showAfter;
            // Only update state if value changed
            if (newIsVisible !== isVisible) {
              setIsVisible(newIsVisible);
            }
            lastCheck = now;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter, isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "fixed z-[60] transition-all duration-300",
            isMobile
              ? "bottom-4 left-4 w-14 h-14"
              : "bottom-6 left-6 w-16 h-16",

            // Matching glassmorphism design
            "bg-black/20 backdrop-blur-xl border border-white/10",
            "hover:bg-black/30 hover:border-white/20",

            // Subtle glow effect
            "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
            "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",

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
