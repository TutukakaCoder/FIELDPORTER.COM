"use client";

import { BRAND } from "@/config/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FooterProps {
  className?: string;
}

// Enhanced service structure with icons and better descriptions
const services = [
  {
    label: "Strategic Research Intelligence",
    href: "/services#strategic-research",
    description: "Deep strategic intelligence and market analysis",
    icon: "🔍",
  },
  {
    label: "Rapid Development & Integration",
    href: "/services#rapid-development",
    description: "Custom solutions built and deployed fast",
    icon: "⚡",
  },
  {
    label: "Process Efficiency & Workflow Optimization",
    href: "/services#workflow-optimization",
    description: "Streamline operations with intelligent automation",
    icon: "🔧",
  },
  {
    label: "AI Training & Implementation Education",
    href: "/services#ai-training",
    description: "Team capability building and knowledge transfer",
    icon: "🎓",
  },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Handle scroll events for footer visibility
  useEffect(() => {
    const handleScroll = () => {
      // Footer visibility animation
      const footerElement = document.getElementById("main-footer");
      if (footerElement) {
        const footerTop = footerElement.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;

        if (scrollTop + windowHeight > footerTop) {
          setIsFooterVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <footer
        id="main-footer"
        className={cn(
          "bg-white dark:bg-black relative overflow-hidden transition-all duration-1000",
          isFooterVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8",
          className,
        )}
        role="contentinfo"
      >
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 dark:from-gray-900/50 to-transparent pointer-events-none" />

        {/* Main Footer Content - Premium Layout */}
        <div className="border-t border-gray-200 dark:border-gray-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* LEFT SECTION - Brand Anchor */}
              <div className="lg:col-span-4 space-y-6">
                <div className="space-y-4">
                  <Link
                    href="/"
                    className="inline-block text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-400 transition-all duration-300 hover:scale-105"
                  >
                    {BRAND.name}
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-light">
                    Building AI-Powered Futures
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Auckland, New Zealand • Remote Worldwide
                  </p>
                </div>

                {/* Social Links - LinkedIn Only */}
                <div className="flex space-x-3">
                  <a
                    href="https://linkedin.com/company/fieldporter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                    aria-label="Follow FIELDPORTER on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                </div>
              </div>

              {/* CENTER SECTION - Services & Company */}
              <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Services - Mobile Accordion */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Services
                    </h3>
                    {/* Mobile accordion toggle */}
                    <button
                      onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                      className="md:hidden p-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                      aria-expanded={isServicesExpanded}
                      aria-label="Toggle services menu"
                    >
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isServicesExpanded ? "rotate-180" : "",
                        )}
                      />
                    </button>
                  </div>

                  {/* Services List - Simplified without descriptions */}
                  <ul
                    className={cn(
                      "space-y-3 transition-all duration-300 overflow-hidden",
                      "md:block", // Always show on desktop
                      isServicesExpanded
                        ? "block max-h-96"
                        : "hidden max-h-0 md:block md:max-h-none",
                    )}
                  >
                    {services.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          className="group flex items-center space-x-2 hover:bg-gray-100/30 dark:hover:bg-gray-900/30 p-2 rounded-lg transition-all duration-200"
                        >
                          <span className="text-base">{service.icon}</span>
                          <div className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm sm:text-base font-medium">
                            {service.label}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Company
                  </h3>
                  <ul className="space-y-3">
                    {company.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 text-base block py-1 hover:translate-x-1"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT SECTION - Premium CTA */}
              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-gray-900 dark:text-white font-semibold text-lg leading-tight">
                    Ready to Build?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Let's discuss your AI project and explore how we can
                    accelerate your outcomes.
                  </p>
                </div>

                {/* Enhanced Premium CTA Button */}
                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center w-full px-6 py-4 rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-600/10 to-blue-500/10 backdrop-blur-sm text-gray-900 dark:text-white font-semibold text-sm transition-all duration-300 hover:from-blue-600/20 hover:to-blue-500/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10">Start Your Project</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* Direct Contact */}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="group inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                    aria-label={`Email FIELDPORTER at ${BRAND.email}`}
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>{BRAND.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Copyright Bar - Same Background */}
          <div className="border-t border-gray-200 dark:border-gray-800 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                <div className="text-gray-500 text-sm">
                  © {currentYear} {BRAND.name}
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <Link
                    href="/privacy-policy"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms-of-service"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
