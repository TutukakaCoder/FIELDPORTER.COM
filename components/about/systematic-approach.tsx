"use client";

import { motion } from "framer-motion";

const systematicApproach = [
  {
    number: "01",
    title: "Strategic Research",
    description:
      "We use AI tools like Claude and Perplexity to analyze markets, competitors, and opportunities. Deep research in days, not weeks.",
    color: "border-blue-500/30 text-blue-400",
  },
  {
    number: "02",
    title: "Rapid Prototyping",
    description:
      "Build working solutions or provide strategic guidance to test assumptions. Whether it's creating functional prototypes with tools like Cursor AI and n8n, or providing consulting and training to validate concepts quickly.",
    color: "border-purple-500/30 text-purple-400",
  },
  {
    number: "03",
    title: "Implementation & Optimization",
    description:
      "Deploy solutions and monitor performance. We provide ongoing optimization based on real usage data and user feedback.",
    color: "border-green-500/30 text-green-400",
  },
];

export function SystematicApproach() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/[0.02] dark:bg-white/[0.02]" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 md:mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Research-driven implementation with real-world validation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {systematicApproach.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div
                className={`relative p-6 md:p-8 rounded-2xl backdrop-blur-xl border ${step.color.split(" ")[0]} bg-gray-900/[0.02] dark:bg-white/[0.02] transition-all duration-500`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/[0.02] dark:from-white/[0.02] to-transparent pointer-events-none" />

                <div className="relative z-10 space-y-4 md:space-y-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-4xl md:text-5xl font-light ${step.color.split(" ")[1]} opacity-50`}
                    >
                      {step.number}
                    </span>
                    <div className="w-2 h-12 md:h-16 bg-gradient-to-b from-current to-transparent opacity-20" />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 md:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting line for desktop */}
                {index < systematicApproach.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 w-8 lg:w-12 h-px bg-gradient-to-r from-gray-900/20 dark:from-white/20 to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
