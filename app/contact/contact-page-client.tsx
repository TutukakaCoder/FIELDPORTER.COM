"use client";

import { ContactMethods } from "@/components/contact";
import { HeroAuroraBackground, PageWrapper } from "@/components/layout";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, Mail, MessageSquare } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// Premium loading component
const LoadingSpinner = () => (
  <div className="min-h-[40vh] bg-white dark:bg-black flex items-center justify-center">
    <div className="text-center animate-fade-in">
      <div className="relative w-14 h-14 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"
          style={{ animationDuration: "0.8s" }}
        ></div>
        <div
          className="absolute inset-1 rounded-full border-2 border-transparent border-b-blue-400/50 animate-spin"
          style={{ animationDuration: "1.2s", animationDirection: "reverse" }}
        ></div>
        <div className="absolute inset-3 rounded-full bg-blue-500/10 animate-pulse"></div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
        Loading...
      </p>
    </div>
  </div>
);

// Dynamic imports for heavy components
const SimpleContactForm = dynamic(
  () =>
    import("@/components/contact/simple-contact-form").then((mod) => ({
      default: mod.SimpleContactForm,
    })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
);

const BookingWidget = dynamic(
  () =>
    import("@/components/booking").then((mod) => ({
      default: mod.BookingWidget,
    })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
);

type ContactMode = "message" | "book";

export function ContactPageClient() {
  const [mode, setMode] = useState<ContactMode>("book");

  return (
    <PageWrapper>
      {/* Hero — matches About / Services / Portfolio / Insights pattern, with
          the Book/Message control kept above the fold as the hero action */}
      <section className="hero-shell" aria-label="Contact options">
        <HeroAuroraBackground />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-6 md:space-y-8"
          >
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl backdrop-blur-md border border-gray-900/10 bg-gray-900/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
                <Mail className="w-12 h-12 text-blue-500 dark:text-blue-400" />
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-light text-gray-900 dark:text-white leading-tight">
                Contact
              </h1>
              <div className="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light">
                Book a call or send a message
              </div>
            </div>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Tell us what you&apos;re working on. We reply within 24 hours and
              will say clearly if we&apos;re a fit.
            </p>

            <div className="flex justify-center">
              <div className="flex max-w-[220px] w-full sm:w-fit sm:max-w-none flex-row bg-gray-900/[0.04] dark:bg-white/[0.06] border border-gray-900/10 dark:border-white/10 rounded-full p-0.5 gap-0.5">
                <button
                  type="button"
                  onClick={() => setMode("book")}
                  className={`
                    relative flex-1 sm:flex-none px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                    flex items-center justify-center gap-1.5 min-h-[40px] sm:min-h-[44px] touch-manipulation
                    ${
                      mode === "book"
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                    }
                  `}
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Book
                </button>
                <button
                  type="button"
                  onClick={() => setMode("message")}
                  className={`
                    relative flex-1 sm:flex-none px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                    flex items-center justify-center gap-1.5 min-h-[40px] sm:min-h-[44px] touch-manipulation
                    ${
                      mode === "message"
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                    }
                  `}
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Message
                </button>
              </div>
            </div>

            {/* Collapsed pre-copy — accordion on all sizes */}
            <details className="text-left max-w-2xl mx-auto group">
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none touch-manipulation min-h-[44px] px-2 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <span>What to expect &amp; fit</span>
                <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-2 pb-2 pt-1 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <ul className="space-y-2">
                  <li>
                    <strong className="text-gray-900 dark:text-white">
                      Who:
                    </strong>{" "}
                    Leaders and operators improving workflows with AI or
                    automation, or scoping a concrete project.
                  </li>
                  <li>
                    <strong className="text-gray-900 dark:text-white">
                      Call:
                    </strong>{" "}
                    Goals, current setup, and whether a project or ongoing
                    support makes sense. No pitch-heavy sales.
                  </li>
                  <li>
                    <strong className="text-gray-900 dark:text-white">
                      Next:
                    </strong>{" "}
                    We confirm, then send a brief follow-up or proposal if
                    it&apos;s a fit.
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li>
                    <strong className="text-gray-900 dark:text-white">
                      Fit:
                    </strong>{" "}
                    Defined problem and budget for a focused engagement.
                  </li>
                  <li>
                    <strong className="text-gray-900 dark:text-white">
                      Not a fit:
                    </strong>{" "}
                    Quick one-off fixes or large RFP responses — we&apos;ll say
                    so clearly.
                  </li>
                </ul>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Inquiries are confidential. NDA and data-handling can be
                  discussed on the call if needed.
                </p>
              </div>
            </details>

            <div className="flex justify-center pt-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section with Animation */}
      <AnimatePresence mode="wait">
        {mode === "message" ? (
          <motion.div
            key="message"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <SimpleContactForm />
          </motion.div>
        ) : (
          <motion.div
            key="book"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <BookingWidget />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Methods - Always Visible */}
      <ContactMethods />
    </PageWrapper>
  );
}
