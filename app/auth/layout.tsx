"use client";

import { BRAND } from "@/config/constants";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

// Premium aurora background with floating orbs
function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Main aurora gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-600/15 to-blue-600/15 blur-2xl"
        animate={{
          x: [0, 60, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/[0.01] via-transparent to-white/[0.01]" />
    </div>
  );
}

// Premium glassmorphism container
function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative w-full max-w-[420px] mx-auto"
    >
      {/* Premium glassmorphism card */}
      <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/40 hover:border-white/20 transition-all duration-500">
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative">{children}</div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      </div>

      {/* Additional shadow layer for depth */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 blur-xl -z-10 transform scale-105" />
    </motion.div>
  );
}

// Premium logo component
function AuthLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="text-center mb-8"
    >
      <Link href="/" className="inline-block group">
        <h1 className="text-3xl font-bold text-white tracking-wide hover:text-blue-400 transition-all duration-300 group-hover:scale-105">
          {BRAND.name}
        </h1>
        <div className="mt-2 text-sm text-gray-400 font-medium tracking-wider">
          {BRAND.tagline}
        </div>
      </Link>
    </motion.div>
  );
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-6">
      {/* Premium aurora background */}
      <AuroraBackground />

      {/* Main content area */}
      <div className="relative z-10 w-full">
        <AuthContainer>
          {/* FIELDPORTER Logo */}
          <AuthLogo />

          {/* Authentication content */}
          <div className="space-y-6">{children}</div>
        </AuthContainer>
      </div>

      {/* Background pattern overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
      </div>
    </div>
  );
}
