"use client";

import { PageWrapper } from "@/components/layout";
import { ArrowRight, Phone, Search, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const steps = [
  {
    icon: ShieldCheck,
    title: "1. Secure Collection",
    description:
      "We gather detailed data through our secure portal to get a complete picture of your current operations.",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Search,
    title: "2. Deep Analysis",
    description:
      "We spend two days analyzing your data, researching your market, and consulting our advisor network to validate findings.",
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
  return (
    <PageWrapper className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Find the Right AI for <br className="hidden md:block" /> Your
            Business
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Stop guessing where to invest. Get a scored roadmap for your
            automation strategy and move forward with certainty.
          </p>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 active:scale-[0.98]"
              >
                Start Your Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* The Problem Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01, y: -4 }}
          className="mb-24 bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Unsure where to start?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Most business leaders know AI matters, but few know exactly which
              investments will pay off. How do you separate genuine high-ROI
              opportunities from the hype?
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              You don't need more tools. You need clarity on what is right for
              your specific operations.
            </p>
          </div>
        </motion.div>

        {/* The Framework / Process Section */}
        <div className="mb-24">
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/50 dark:hover:border-blue-700/50 transition-all duration-500 group focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-2"
                >
                  <div
                    className={`w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center ${step.iconColor} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg`}
                  >
                    <StepIcon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
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

        {/* Non-Sales Pitch Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="max-w-4xl mx-auto mb-24 p-8 md:p-12 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/30 text-center hover:border-blue-300 dark:hover:border-blue-600/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            An Independent Assessment
          </h3>
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
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
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to get clarity?
          </h2>
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 active:scale-[0.98]"
            >
              Start Your Assessment
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
