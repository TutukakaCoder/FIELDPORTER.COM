"use client";

import { motion } from "framer-motion";
import { Brain, Users, Workflow } from "lucide-react";

const aiCapabilities = [
  {
    icon: Brain,
    title: "AI Implementation Training",
    description:
      "Teams learn to integrate AI into daily workflows so you cut manual work and keep quality. Training is hands-on and tied to your actual processes.",
    color: "border-blue-500/20 text-blue-400",
    focus: "Outcome: Faster delivery, fewer repetitive tasks",
  },
  {
    icon: Workflow,
    title: "Workflow Optimization",
    description:
      "Bottlenecks are identified and automated so processes run with less manual effort and clearer decision points. Results are measurable.",
    color: "border-purple-500/20 text-purple-400",
    focus: "Outcome: Time saved, fewer errors",
  },
  {
    icon: Users,
    title: "Strategic AI Consulting",
    description:
      "Tool choice, rollout, and handover are designed so adoption sticks and your team owns the outcome.",
    color: "border-green-500/20 text-green-400",
    focus: "Outcome: Ownership and continuity",
  },
];

export function TechnicalCapability() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/[0.02] dark:bg-white/[0.02]" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            AI Training &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Implementation
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Training is tied to the systems we deliver so your team gets
            practical, outcome-focused capability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {aiCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div
                className={`relative p-8 rounded-2xl backdrop-blur-xl border ${capability.color.split(" ")[0]} bg-gray-900/[0.02] dark:bg-white/[0.02] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/[0.02] dark:from-white/[0.02] to-transparent pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-4 rounded-xl bg-current/10 border border-current/20 ${capability.color.split(" ")[1]} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg`}
                    >
                      <capability.icon className="w-8 h-8 group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {capability.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {capability.description}
                    </p>
                    <div
                      className={`text-sm ${capability.color.split(" ")[1]} font-medium`}
                    >
                      {capability.focus}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
