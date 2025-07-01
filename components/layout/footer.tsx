"use client";

import { BRAND } from "@/config/constants";
import { cn } from "@/lib/utils";
import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

// Correct service structure with proper anchor links - MATCHING EXACT SERVICE TITLES
const services = [
  {
    label: "Strategic Research Intelligence",
    href: "/services#strategic-research",
    description: "Deep strategic intelligence and market analysis",
  },
  {
    label: "Rapid Development & Integration",
    href: "/services#rapid-development",
    description: "Custom solutions built and deployed fast",
  },
  {
    label: "Process Efficiency & Workflow Optimization",
    href: "/services#workflow-optimization",
    description: "Streamline operations with intelligent automation",
  },
  {
    label: "AI Training & Implementation Education",
    href: "/services#ai-training",
    description: "Team capability building and knowledge transfer",
  },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-black", className)}>
      {/* Main Footer Content - Premium Layout */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT SECTION - Brand Anchor */}
            <div className="md:col-span-4 space-y-6">
              <div className="space-y-4">
                <Link
                  href="/"
                  className="inline-block text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
                >
                  {BRAND.name}
                </Link>
                <p className="text-gray-300 text-lg font-light">
                  Building AI-Powered Futures
                </p>
                <p className="text-gray-400 text-sm">
                  Auckland, New Zealand • Remote Worldwide
                </p>
              </div>

              {/* Social Links - LinkedIn Only */}
              <div className="flex space-x-3">
                <a
                  href="https://linkedin.com/company/fieldporter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CENTER SECTION - Services & Company */}
            <div className="md:col-span-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Services */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Services
                </h3>
                <ul className="space-y-4">
                  {services.map((service) => (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        className="group block space-y-1"
                      >
                        <div className="text-gray-200 hover:text-white transition-colors duration-200 text-base font-medium">
                          {service.label}
                        </div>
                        <div className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-200">
                          {service.description}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Company
                </h3>
                <ul className="space-y-3">
                  {company.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-base block py-1"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT SECTION - Premium CTA */}
            <div className="md:col-span-3 space-y-6">
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-lg leading-tight">
                  Ready to Build?
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Let's discuss your AI project and explore how we can
                  accelerate your outcomes.
                </p>
              </div>

              {/* Refined Premium CTA Button */}
              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg border border-white/15 bg-white/[0.02] backdrop-blur-sm text-white font-medium text-sm transition-all duration-300 hover:bg-white/[0.05] hover:border-white/25 hover:shadow-lg hover:shadow-white/10"
                >
                  Start Your Project
                </Link>

                {/* Direct Contact */}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>{BRAND.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Copyright Bar - Same Background */}
        <div className="border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <div className="text-gray-500 text-sm">
                © {currentYear} {BRAND.name}
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy-policy"
                  className="text-gray-500 hover:text-white transition-colors duration-200"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-gray-500 hover:text-white transition-colors duration-200"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
