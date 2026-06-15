"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

interface ChatV2ComingSoonOverlayProps {
  className?: string;
}

export function ChatV2ComingSoonOverlay({
  className,
}: ChatV2ComingSoonOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center p-6",
        "bg-black/60 backdrop-blur-md",
        className,
      )}
      aria-hidden="false"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-xs text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl">
          <Bot className="h-7 w-7 text-fieldporter-blue" strokeWidth={1.5} />
        </div>

        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-fieldporter-blue/30 bg-fieldporter-blue/10 px-3 py-1 text-xs font-medium text-fieldporter-blue">
          <Sparkles className="h-3 w-3" />
          V2 Coming Soon
        </span>

        <h3 className="mb-2 text-lg font-semibold text-fieldporter-white">
          FIELDPORTER Agent V2
        </h3>

        <p className="mb-3 text-sm leading-relaxed text-fieldporter-gray">
          Our new agentic assistant is on the way — built to research, plan, and
          take action on your behalf.
        </p>

        <p className="text-xs text-fieldporter-gray/70">
          V1 has been retired while we prepare the upgrade.
        </p>
      </div>
    </motion.div>
  );
}
