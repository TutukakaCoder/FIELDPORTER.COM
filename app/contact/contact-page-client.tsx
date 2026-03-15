"use client";

import { ContactMethods } from "@/components/contact";
import { PageWrapper } from "@/components/layout";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MessageSquare } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// Premium loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
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
      {/* Toggle Section */}
      <section
        className="relative pt-40 pb-16 md:pt-48 md:pb-24 overflow-hidden"
        aria-label="Contact options"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              Book a call or send a message
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
              Tell us what you're working on. We reply within 24 hours and will
              say clearly if we're a fit.
            </p>

            {/* Toggle Buttons */}
            <div className="inline-flex flex-col sm:flex-row bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-gray-900/10 dark:border-white/10 rounded-2xl p-2 gap-2 sm:gap-0">
              <button
                onClick={() => setMode("book")}
                className={`
                  relative px-6 py-4 sm:py-3 rounded-xl font-medium transition-all duration-300
                  flex items-center justify-center gap-2 w-full sm:w-auto
                  ${
                    mode === "book"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }
                `}
              >
                <Calendar className="w-5 h-5" />
                Book a Call
              </button>
              <button
                onClick={() => setMode("message")}
                className={`
                  relative px-6 py-4 sm:py-3 rounded-xl font-medium transition-all duration-300
                  flex items-center justify-center gap-2 w-full sm:w-auto
                  ${
                    mode === "message"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }
                `}
              >
                <MessageSquare className="w-5 h-5" />
                Send a Message
              </button>
            </div>

            {/* Expectation-setting: who, what they get, what happens next */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-10 text-left max-w-2xl mx-auto px-2"
            >
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                What to expect
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    Who this is for:
                  </strong>{" "}
                  Leaders and operators looking to improve workflows with AI or
                  automation, or to scope a concrete project.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    What we’ll cover:
                  </strong>{" "}
                  Your goals, current setup, and whether a discrete project or
                  ongoing support makes sense. No pitch-heavy sales process.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    What happens next:
                  </strong>{" "}
                  We confirm the call, then send a brief follow-up with next
                  steps or a proposal if it&apos;s a fit.
                </li>
              </ul>
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-6 mb-3">
                Best fit / not a fit
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    Fit:
                  </strong>{" "}
                  Best when you have a defined problem (e.g. automation, AI
                  integration, research or build) and budget for a focused
                  engagement.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    Scope:
                  </strong>{" "}
                  We work on discrete projects and retained support, not one-off
                  ad-hoc tasks.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    Timeline:
                  </strong>{" "}
                  Typical engagements start within 2–4 weeks of alignment; we’ll
                  confirm feasibility on the call.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">
                    Right for you?
                  </strong>{" "}
                  If you need a quick fix or a large RFP response, we may point
                  you elsewhere; we’ll say so clearly.
                </li>
              </ul>
              <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                We treat all inquiries as confidential. We don’t share your
                details or use them for marketing beyond responding to you. NDA
                and data-handling can be discussed on the call if needed.
              </p>
            </motion.div>
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
