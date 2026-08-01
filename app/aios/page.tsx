"use client";

import { PageWrapper } from "@/components/layout";
import {
  ArrowRight,
  CalendarClock,
  FileText,
  Handshake,
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

const heroFacts = [
  {
    icon: FileText,
    label: "Deliverable",
    value: "Written Assessment Report plus two consultation calls.",
    cardBg: "bg-blue-50/70 dark:bg-blue-900/15",
    cardBorder: "border-blue-100 dark:border-blue-800/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    labelColor: "text-blue-700 dark:text-blue-300",
  },
  {
    icon: CalendarClock,
    label: "Timeline",
    value: "Typically 1–2 weeks from data submission to first call.",
    cardBg: "bg-purple-50/70 dark:bg-purple-900/15",
    cardBorder: "border-purple-100 dark:border-purple-800/30",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    labelColor: "text-purple-700 dark:text-purple-300",
  },
  {
    icon: Handshake,
    label: "Commitment",
    value:
      "Paid assessment; booking confirms your slot. No obligation to proceed with implementation after the report.",
    cardBg: "bg-emerald-50/70 dark:bg-emerald-900/15",
    cardBorder: "border-emerald-100 dark:border-emerald-800/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    labelColor: "text-emerald-700 dark:text-emerald-300",
  },
];

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
    <PageWrapper className="pt-28 md:pt-44 pb-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16 md:mb-24 p-5 md:p-12 rounded-3xl backdrop-blur-md border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02]"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Find the Right AI for <br className="hidden md:block" /> Your
            Business
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Stop guessing where to invest. Get a scored roadmap for your
            automation strategy and move forward with certainty.
          </p>
          <p className="mt-4 mb-10 text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            The report includes a readiness score, priority areas, and a short
            roadmap, so you see the shape of the output before you book.
          </p>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
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

          <dl className="mt-10 pt-8 border-t border-gray-900/10 dark:border-white/10 grid gap-4 sm:grid-cols-3 text-left">
            {heroFacts.map((fact) => {
              const FactIcon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className={`rounded-2xl border p-5 ${fact.cardBg} ${fact.cardBorder}`}
                >
                  <dt className="flex items-center gap-2.5 mb-3">
                    <span
                      className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${fact.iconBg} ${fact.iconColor}`}
                    >
                      <FactIcon className="w-4 h-4" />
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${fact.labelColor}`}
                    >
                      {fact.label}
                    </span>
                  </dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {fact.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </motion.div>

        {/* The Framework / Process Section */}
        <div className="mb-16 md:mb-24">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
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
                  className="relative p-5 md:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/50 dark:hover:border-blue-700/50 transition-all duration-500 group focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-gray-900"
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

        {/* The Problem Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01, y: -4 }}
          className="mb-16 md:mb-24 bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-5 md:p-12 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Unsure where to start?
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Most business leaders know AI matters, but few know exactly which
              investments will pay off.
            </p>
            <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              How do you separate genuine high-ROI opportunities from the hype?
            </p>
            <p className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-lg md:text-xl font-medium text-gray-900 dark:text-white leading-relaxed">
              You don&apos;t need more tools. You need clarity on what is right
              for your specific operations.
            </p>
          </div>
        </motion.div>

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
            The Assessment Report is a written document (PDF). Example
            structure:
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
              Our goal is to give you an honest evaluation of what AI can do for
              you.
            </p>
            <p>
              We only work with select clients on implementation. Whether we
              work together further or not, you walk away with a valuable
              strategic roadmap and no obligation.
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
