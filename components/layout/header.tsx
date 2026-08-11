"use client";

import { Button } from "@/components/ui/button";
import { OptimizedLink } from "@/components/ui/optimized-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BRAND, MAIN_NAVIGATION } from "@/config/constants";
import { useIsScrolled, useIsScrolling } from "@/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  // SCROLL FREEZE FIX: Use centralized scroll state (reduces listener count)
  const isScrolled = useIsScrolled();
  const isScrolling = useIsScrolling();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const isActivePage = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // T09: persistent mobile CTA lives in the header bar (not a bottom sticky bar).
  // Hide on /contact (page already converts) and while the menu dialog is open.
  const showMobileHeaderCta =
    !pathname?.startsWith("/contact") && !isMobileMenuOpen;

  return (
    <>
      {/* Floating Navigation Container - Cursor Style */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          // pointer-events-none on shell so content under the floating strip stays clickable
          "fixed z-50 ease-out pointer-events-none",
          // SCROLL FREEZE FIX: Disable transitions during scroll to prevent jank
          isScrolling ? "transition-none" : "transition-all duration-300",
          isScrolled
            ? "top-3 left-3 right-3 md:left-4 md:right-4"
            : "top-3 left-3 right-3 md:top-6 md:left-6 md:right-6",
          className,
        )}
        style={{
          // GPU acceleration hints
          willChange: isScrolling ? "auto" : "transform",
          contain: "layout style",
        }}
      >
        {/* Main Floating Navigation Bar */}
        <nav
          aria-label="Primary"
          className={cn(
            "relative mx-auto max-w-7xl rounded-2xl backdrop-blur-md shadow-2xl pointer-events-auto",
            // SCROLL FREEZE FIX: Disable transitions during scroll
            isScrolling
              ? "transition-none"
              : "transition-all duration-300 ease-out",
            isScrolled
              ? "bg-white/95 dark:bg-black/95 border border-gray-900/[0.12] dark:border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : "bg-white/90 dark:bg-black/90 border border-gray-900/[0.08] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
          )}
        >
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-900/[0.02] via-gray-900/[0.05] to-gray-900/[0.02] dark:from-white/[0.02] dark:via-white/[0.05] dark:to-white/[0.02] pointer-events-none" />

          {/* Navigation Content — logo left, links centered, actions right */}
          <div className="relative flex items-center gap-2 px-2 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
            {/* Logo: can shrink; never paint over the CTA cluster */}
            <Link
              href="/"
              className="min-w-0 flex-1 overflow-hidden pl-3 text-lg font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-400 transition-colors duration-300 sm:pl-4 sm:text-xl lg:text-2xl lg:tracking-wide lg:flex-none lg:overflow-visible lg:justify-self-start"
            >
              <span className="block truncate">{BRAND.name}</span>
            </Link>

            {/* Desktop Navigation — centered in the bar */}
            <nav
              aria-label="Desktop"
              className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 px-2"
            >
              {MAIN_NAVIGATION.map((item) => (
                <div key={item.label} className="relative flex items-center">
                  <OptimizedLink
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium tracking-wide transition-all duration-300 py-4 relative leading-none",
                      isActivePage(item.href)
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:scale-105",
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

            {/* Theme Toggle and CTA — pinned to the right */}
            <div className="hidden lg:flex items-center justify-end gap-4 pr-4 lg:justify-self-end">
              <ThemeToggle />
              <Button
                variant="primary"
                size="sm"
                className="group rounded-xl"
                asChild
              >
                <OptimizedLink
                  href="/contact"
                  className="inline-flex items-center gap-2"
                >
                  Book a Call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </OptimizedLink>
              </Button>
            </div>

            {/* Mobile: compact Book CTA + menu — short label so logo never collides */}
            <div className="lg:hidden flex items-center gap-1.5 pr-1 shrink-0">
              {showMobileHeaderCta && (
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-xl h-11 min-h-[44px] px-3.5 touch-manipulation"
                  asChild
                >
                  <OptimizedLink
                    href="/contact"
                    className="inline-flex items-center justify-center"
                    aria-label="Book a Call"
                  >
                    <span className="text-sm font-medium">Book</span>
                  </OptimizedLink>
                </Button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 touch-manipulation"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
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
          </div>
        </nav>

        {/* Premium Floating Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Menu"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden mt-3 mx-auto max-w-7xl rounded-2xl backdrop-blur-md bg-white/95 dark:bg-black/95 border border-gray-900/[0.12] dark:border-white/[0.12] shadow-2xl overflow-hidden pointer-events-auto"
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
                        "flex items-center min-h-[44px] px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 relative touch-manipulation",
                        isActivePage(item.href)
                          ? "text-gray-900 dark:text-white bg-gradient-to-r from-[#0969DA]/20 to-[#1E40AF]/20 shadow-lg shadow-blue-500/10"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/5",
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
                  className="pt-4 border-t border-gray-900/[0.08] dark:border-white/[0.08] space-y-3"
                >
                  {/* Theme Toggle for Mobile */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>

                  <OptimizedLink
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-900 dark:text-white bg-gradient-to-r from-[#0969DA]/30 to-[#1E40AF]/30 hover:from-[#0969DA]/50 hover:to-[#1E40AF]/50 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 border border-blue-500/20"
                  >
                    Book a Call
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
