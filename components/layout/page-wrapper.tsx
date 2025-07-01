"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  withPadding?: boolean;
  withAnimation?: boolean;
}

export function PageWrapper({
  children,
  className,
  withPadding = false,
  withAnimation = true,
}: PageWrapperProps) {
  const content = (
    <main className={cn("min-h-screen bg-black", className)}>{children}</main>
  );

  if (!withAnimation) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {content}
    </motion.div>
  );
}
