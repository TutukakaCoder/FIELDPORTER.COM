"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  Code,
  Globe,
  Mail,
  Palette,
  Settings,
} from "lucide-react";

/** Curated shortlist grouped by outcome: what we use to deliver results. */
const comprehensiveTechStack = [
  {
    category: "Ship production systems",
    tools: [
      {
        name: "Next.js",
        icon: Code,
        description: "Web apps that load fast and scale",
      },
      {
        name: "TypeScript",
        icon: Code,
        description: "Fewer bugs, clearer handover",
      },
      {
        name: "Firebase",
        icon: Cloud,
        description: "Auth, data, and hosting in one place",
      },
      {
        name: "Vercel",
        icon: Cloud,
        description: "Deploy and host with minimal setup",
      },
    ],
  },
  {
    category: "AI and automation",
    tools: [
      {
        name: "Claude",
        icon: Brain,
        description: "Reasoning, analysis, and code",
      },
      {
        name: "DeepSeek",
        icon: Brain,
        description: "Cost-effective production AI",
      },
      {
        name: "n8n",
        icon: Settings,
        description: "Workflow automation you can own",
      },
      { name: "Cursor", icon: Code, description: "Faster build and iteration" },
    ],
  },
  {
    category: "Research and delivery",
    tools: [
      {
        name: "Perplexity",
        icon: Globe,
        description: "Fast research and synthesis",
      },
      {
        name: "Figma",
        icon: Palette,
        description: "Design and prototype with you",
      },
      {
        name: "Resend",
        icon: Mail,
        description: "Reliable email and notifications",
      },
    ],
  },
];

export function TechStack() {
  return (
    <section className="relative section-rhythm-lg overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/[0.02] dark:bg-white/[0.02]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Technology{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Production-tested tools and frameworks delivering real results for
            clients
          </p>
        </motion.div>

        <div className="space-y-16">
          {comprehensiveTechStack.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white text-center">
                {category.category}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: toolIndex * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="relative p-6 rounded-xl backdrop-blur-md border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02] transition-all duration-300 group-hover:bg-gray-900/[0.04] dark:group-hover:bg-white/[0.04] group-hover:border-gray-900/20 dark:group-hover:border-white/20">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-900/[0.02] dark:from-white/[0.02] to-transparent pointer-events-none" />

                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-lg bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 group-hover:bg-gray-900/10 dark:group-hover:bg-white/10 transition-colors duration-300">
                            <tool.icon className="w-5 h-5 text-gray-700 dark:text-white/80" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {tool.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
