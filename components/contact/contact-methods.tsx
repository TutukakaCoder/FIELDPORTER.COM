"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export function ContactMethods() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Ensure immediate animation trigger
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const processSteps = [
    {
      icon: Mail,
      title: "Send Message",
      description: "Use the form above or email directly",
      detail: "freddy@fieldporter.com",
      color: "text-blue-400",
    },
    {
      icon: Clock,
      title: "Get Response",
      description: "Personal response within 24 hours",
      detail: "Project fit assessment included",
      color: "text-emerald-400",
    },
    {
      icon: Calendar,
      title: "Schedule Call",
      description: "If aligned, 30-minute discussion",
      detail: "Fixed-price proposal follows",
      color: "text-purple-400",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:to-gray-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight tracking-[-0.02em]"
          >
            What Happens{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Next
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Simple process - no lengthy sales cycles or unclear expectations
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16 md:mb-20">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-gray-900/10 dark:border-white/10 rounded-3xl p-8 md:p-10 hover:bg-gray-900/[0.04] dark:hover:bg-white/[0.04] transition-all duration-300 group text-center"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-white dark:bg-gray-900 border border-gray-900/20 dark:border-white/20 rounded-full flex items-center justify-center text-gray-900 dark:text-white text-sm font-semibold">
                  {index + 1}
                </div>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300 mx-auto">
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
                  {step.title}
                </h3>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>

                <p className={`text-base font-medium ${step.color}`}>
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Direct Contact CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-center"
        >
          <div className="relative bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-gray-900/10 dark:border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
              Prefer Direct Contact?
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Skip the form and email directly for faster response
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <a
                href="mailto:freddy@fieldporter.com"
                className="group flex items-center gap-3 px-8 py-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 rounded-2xl text-blue-400 hover:text-blue-300 transition-all duration-300 font-medium"
              >
                <Mail className="w-5 h-5" />
                freddy@fieldporter.com
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
