"use client";

import { BRAND, FOOTER_LINKS, SOCIAL_LINKS } from "@/config/constants";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { Linkedin, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FooterProps {
  className?: string;
}

const services = FOOTER_LINKS.services;
const company = FOOTER_LINKS.company;

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // SCROLL FIX: Optimize footer scroll listener - reduce layout reads
  useEffect(() => {
    let ticking = false;
    let lastCheck = 0;
    const throttleDelay = 100; // Throttle layout reads; lower = sooner reveal

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const now = Date.now();
          // Only check visibility if throttle delay passed and not already visible
          if (now - lastCheck >= throttleDelay && !isFooterVisible) {
            const footerElement = document.getElementById("main-footer");
            if (footerElement) {
              // Use getBoundingClientRect once per throttle period
              const rect = footerElement.getBoundingClientRect();
              const isVisible = rect.top < window.innerHeight;

              if (isVisible) {
                setIsFooterVisible(true);
              }
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
  }, [isFooterVisible]);

  return (
    <footer
      id="main-footer"
      className={cn(
        "relative z-20 pointer-events-auto bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-all duration-300",
        isFooterVisible
          ? "opacity-100 translate-y-0"
          : prefersReducedMotion
            ? "opacity-0"
            : "opacity-0 translate-y-4",
        className,
      )}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* LEFT SECTION - Brand Identity */}
          <div className="lg:col-span-3 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center text-xl font-bold text-gray-900 dark:text-white hover:text-blue-500 transition-colors"
            >
              {BRAND.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light max-w-xs">
              {BRAND.tagline}.
              <br />
              Auckland • Worldwide
            </p>

            {/* Social Links - Minimal */}
            <div className="flex pt-2">
              <a
                href={SOCIAL_LINKS.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="Connect with Freddy Hopkins on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* CENTER SECTION - Navigation Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {/* Primary Product - AIOS */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Product
              </h3>
              <Link
                href="/aios"
                className="group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg transition-all duration-200 hover:translate-x-1"
              >
                <Sparkles className="w-5 h-5 group-hover:text-yellow-400 transition-colors duration-200" />
                AI Readiness
              </Link>
            </div>

            {/* Services - Static list (simpler on mobile, consistent with Company) */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Services
              </h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors block py-2 min-h-[44px] flex items-center touch-manipulation"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Company
              </h3>
              <ul className="space-y-2">
                {company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors block py-2 min-h-[44px] flex items-center touch-manipulation"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SECTION - CTA */}
          <div className="lg:col-span-3 flex flex-col gap-4 lg:items-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full lg:w-auto min-h-[44px] px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-gray-200/50 dark:shadow-none touch-manipulation"
            >
              Start Project
            </Link>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation"
            >
              <Mail className="w-4 h-4" />
              {BRAND.email}
            </a>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-400">
            © {currentYear} {BRAND.name}
          </div>
          <div className="flex items-center gap-6 text-xs">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center min-h-[44px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors touch-manipulation"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="inline-flex items-center min-h-[44px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors touch-manipulation"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
