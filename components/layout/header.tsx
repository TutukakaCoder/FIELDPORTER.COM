"use client";

import { BRAND, MAIN_NAVIGATION } from "@/config/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { OptimizedLink } from "@/components/ui/optimized-link";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActivePage = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Floating Navigation Container - Cursor Style */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed z-50 transition-all duration-500 ease-out",
          isScrolled ? "top-3 left-4 right-4" : "top-6 left-6 right-6",
          className,
        )}
      >
        {/* Main Floating Navigation Bar */}
        <nav
          className={cn(
            "relative mx-auto max-w-7xl rounded-2xl backdrop-blur-xl transition-all duration-500 ease-out shadow-2xl",
            isScrolled
              ? "bg-black/95 border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : "bg-black/90 border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
          )}
        >
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] pointer-events-none" />

          {/* Navigation Content */}
          <div className="relative flex items-center justify-between px-2 py-3">
            {/* FIELDPORTER Logo - Larger and more to the left */}
            <Link
              href="/"
              className="flex items-center text-2xl font-bold text-white tracking-wide hover:text-blue-400 transition-all duration-300 hover:scale-105 pl-4"
            >
              {BRAND.name}
            </Link>

            {/* Desktop Navigation - Better spacing and lowered position */}
            <nav className="hidden lg:flex items-center space-x-10 px-4">
              {MAIN_NAVIGATION.map((item) => (
                <div key={item.label} className="relative flex items-center">
                  <OptimizedLink
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium tracking-wide transition-all duration-300 py-4 relative leading-none",
                      isActivePage(item.href)
                        ? "text-white"
                        : "text-gray-300 hover:text-white hover:scale-105",
                    )}
                  >
                    {item.label}
                  </OptimizedLink>

                  {/* Fixed Gradient Active Indicator - Stops on active tab */}
                  {isActivePage(item.href) && (
                    <motion.div
                      className="absolute bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #0969DA, #1E40AF, #7C3AED)",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      layoutId="activeSlider"
                      layout
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* Premium CTA Button - More to the right */}
            <div className="hidden lg:flex items-center pr-4">
              <OptimizedLink
                href="/contact"
                className="group flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#0969DA]/30 to-[#1E40AF]/30 hover:from-[#0969DA]/50 hover:to-[#1E40AF]/50 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 border border-blue-500/20"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </OptimizedLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white transition-colors duration-200 mr-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Premium Floating Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden mt-3 mx-auto max-w-7xl rounded-2xl backdrop-blur-xl bg-black/95 border border-white/[0.12] shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-5 space-y-2">
                {MAIN_NAVIGATION.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <OptimizedLink
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 relative",
                        isActivePage(item.href)
                          ? "text-white bg-gradient-to-r from-[#0969DA]/20 to-[#1E40AF]/20 shadow-lg shadow-blue-500/10"
                          : "text-gray-300 hover:text-white hover:bg-white/5",
                      )}
                    >
                      {item.label}
                      {isActivePage(item.href) && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-gradient-to-b from-[#0969DA] to-[#1E40AF]"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </OptimizedLink>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                  className="pt-4 border-t border-white/[0.08]"
                >
                  <OptimizedLink
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#0969DA]/30 to-[#1E40AF]/30 hover:from-[#0969DA]/50 hover:to-[#1E40AF]/50 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 border border-blue-500/20"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </OptimizedLink>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
