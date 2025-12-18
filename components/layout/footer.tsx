"use client";

import { BRAND } from "@/config/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, Linkedin, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FooterProps {
  className?: string;
}

// Simplified service structure
const services = [
  { label: "Strategic Intelligence", href: "/services#strategic-research" },
  { label: "Rapid Development", href: "/services#rapid-development" },
  { label: "Workflow Optimization", href: "/services#workflow-optimization" },
  { label: "AI Training", href: "/services#ai-training" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // SCROLL FIX: Optimize footer scroll listener - reduce layout reads
  useEffect(() => {
    let ticking = false;
    let lastCheck = 0;
    const throttleDelay = 200; // Throttle layout reads

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
        "bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-all duration-1000",
        isFooterVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8",
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
              Building AI-Powered Futures.
              <br />
              Auckland • Worldwide
            </p>

            {/* Social Links - Minimal */}
            <div className="flex pt-2">
              <a
                href="https://www.linkedin.com/in/freddyjhopkins/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
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
                <Sparkles className="w-5 h-5 group-hover:text-yellow-400 group-hover:scale-110 transition-all duration-200" />
                The AIOS
              </Link>
            </div>

            {/* Services - Accordion on Mobile / List on Desktop */}
            <div className="space-y-3">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between w-full md:w-auto group cursor-pointer md:cursor-default"
              >
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 md:group-hover:text-gray-400 md:dark:group-hover:text-gray-500 transition-colors">
                  Services
                </h3>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-gray-400 md:hidden transition-transform duration-200",
                    isServicesOpen ? "rotate-180" : "",
                  )}
                />
              </button>

              <ul
                className={cn(
                  "space-y-2 overflow-hidden transition-all duration-300",
                  isServicesOpen
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0 md:max-h-none md:opacity-100",
                )}
              >
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors block py-0.5"
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
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors block py-0.5"
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
              className="inline-flex items-center justify-center w-full lg:w-auto px-6 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-gray-200/50 dark:shadow-none"
            >
              Start Project
            </Link>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
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
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
