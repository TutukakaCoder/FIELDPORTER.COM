"use client";

import { HeroAuroraBackground, PageWrapper } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ClipboardCheck,
  Phone,
  Search,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AIOS_APP_URL } from "@/config/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const iconPulse = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const steps = [
  {
    icon: ShieldCheck,
    title: "1. Secure Collection",
    description:
      "We gather detailed data about your operations to get a complete picture of your current setup.",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Search,
    title: "2. Deep Analysis",
    description:
      "We spend two days analyzing your data, researching your market, and validating findings against your stated goals.",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Phone,
    title: "3. Delivery & Certainty",
    description:
      "You receive a written Assessment Report and two consultation calls with AI expert Freddy Hopkins to discuss the roadmap.",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export default function AIOSPage() {
  const staffingRecruitmentLink =
    AIOS_APP_URL ?? "https://fieldporter-aios.web.app/";

  return (
    <PageWrapper className="pt-0 pb-12 md:pb-20">
      {/* Hero — matches About / Services / Portfolio / Insights pattern */}
      <section className="hero-shell">
        <HeroAuroraBackground />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl backdrop-blur-md border border-gray-900/10 bg-gray-900/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
                <ClipboardCheck className="w-12 h-12 text-blue-500 dark:text-blue-400" />
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-light text-gray-900 dark:text-white leading-tight">
                AI Readiness
              </h1>
              <div className="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light">
                Find the right AI for your business
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Stop guessing where to invest. Get a scored roadmap for your
                automation strategy and move forward with certainty.
              </p>
            </div>

            <div className="pt-2 md:pt-4">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[240px] group"
                  asChild
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3"
                  >
                    <span className="text-base lg:text-lg">
                      Book Your Assessment
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                Staffing &amp; Recruitment only:{" "}
                <Link
                  href={staffingRecruitmentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-4"
                >
                  Use the AI Readiness quick assessment
                </Link>
                .
              </p>
            </div>

            <div className="flex justify-center pt-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
        {/* How It Works */}
        <div className="mb-16 md:mb-24">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 md:mb-16"
          >
            How It Works
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative h-full p-5 md:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/50 dark:hover:border-blue-700/50 transition-all duration-500 group focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-gray-900"
                >
                  <motion.div
                    variants={iconPulse}
                    className={`w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center ${step.iconColor} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg`}
                  >
                    <StepIcon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Example output / What you get */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16 md:mb-24"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            What You Get
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            The Assessment Report is a written document (PDF). Typically 1–2
            weeks from data submission to first call. Example structure:
          </p>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 font-mono text-sm text-gray-700 dark:text-gray-300">
            <div className="space-y-2">
              <p>
                <strong>1. Executive summary</strong> — Your readiness level and
                top 3 recommendations.
              </p>
              <p>
                <strong>2. Readiness score</strong> — Where you stand today
                (data, process, team).
              </p>
              <p>
                <strong>3. Top opportunities</strong> — Prioritised areas for
                automation or AI, with impact vs effort.
              </p>
              <p>
                <strong>4. Roadmap</strong> — Suggested next steps and timeline.
              </p>
              <p>
                <strong>5. Appendix</strong> — Detail on methods and sources.
              </p>
            </div>
            <p className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              Plus two consultation calls to discuss the report and your
              questions.
            </p>
          </div>
        </motion.div>

        {/* Final CTA with independence note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto p-5 md:p-12 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/30 text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-5">
            An Independent Assessment
          </h3>
          <div className="space-y-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <p>
              You don&apos;t need more tools. You need clarity on which AI
              investments will pay off for your operations.
            </p>
            <p>
              We give you an honest evaluation and a strategic roadmap, with no
              obligation to proceed.
            </p>
          </div>

          <div className="mt-10 pt-10 border-t border-blue-100 dark:border-blue-800/30">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Ready to get clarity?
            </h2>
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 active:scale-[0.97] active:shadow-md"
              >
                Book Your Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
