"use client";

import { useStableMobile } from "@/hooks";
import { motion } from "framer-motion";
import { useState } from "react";

interface PremiumThinkingSphereProps {
  message?: string;
  className?: string;
}

export function PremiumThinkingSphere({
  message = "Thinking...",
  className = "",
}: PremiumThinkingSphereProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useStableMobile();

  // Slightly larger size for desktop
  const size = isMobile ? 50 : 54;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* GIF Animation Only */}
      <div
        className={`relative flex items-center justify-center`}
        style={{ width: size, height: size }}
      >
        <motion.img
          src="/videos/loading-brain.gif"
          alt="AI thinking"
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-br from-fieldporter-blue to-blue-600 shadow-lg mx-auto my-auto"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        )}
      </div>

      {/* Thinking Text Outside */}
      <span className="text-sm text-fieldporter-gray italic">{message}</span>
    </div>
  );
}
