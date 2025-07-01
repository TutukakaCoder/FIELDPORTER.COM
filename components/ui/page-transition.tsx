/**
 * Page Transition Component - Optimized for Quick Loading
 */

"use client";

import { motion } from "framer-motion";
import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1], // Custom easing for quick, smooth feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
