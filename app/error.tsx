"use client";

import { Button } from "@/components/ui/button";
import { animations } from "@/lib/animations";
import { motion } from "framer-motion";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-fieldporter-black p-4">
      <motion.div
        variants={animations.premiumFadeInUp}
        initial="initial"
        animate="animate"
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-glass max-w-md w-full transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2),0_0_60px_rgba(239,68,68,0.1)]"
      >
        <div className="text-center">
          <motion.div variants={animations.premiumFadeInUp} className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/20 flex items-center justify-center animate-icon-pulse">
              <svg
                className="w-8 h-8 text-error"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-heading-xl font-semibold text-white mb-3">
              Something went wrong
            </h1>
            <p className="text-body-md text-white/70 mb-8">
              We apologize for the inconvenience. Please try again.
            </p>
          </motion.div>

          <motion.div
            variants={animations.premiumStaggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-3"
          >
            <motion.div variants={animations.premiumFadeInUp}>
              <Button
                variant="fieldporter-blue"
                size="default"
                onClick={reset}
                enableAnimations={true}
                className="w-full"
              >
                Try again
              </Button>
            </motion.div>
            <motion.div variants={animations.premiumFadeInUp}>
              <Button
                variant="fieldporter-secondary"
                size="default"
                onClick={() => (window.location.href = "/")}
                enableAnimations={true}
                className="w-full"
              >
                Return home
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
