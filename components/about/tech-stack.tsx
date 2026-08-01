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
    <section className="relative section-rhythm overflow-hidden">
      <div className="absolute inset-0 bg-gray-900/[0.02] dark:bg-white/[0.02]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Technology{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Production-tested tools and frameworks delivering real results for
            clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {comprehensiveTechStack.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-5 backdrop-blur-md border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02]"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                {category.category}
              </h3>

              <ul className="divide-y divide-gray-900/[0.06] dark:divide-white/[0.06]">
                {category.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="group flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="mt-0.5 shrink-0 p-1.5 rounded-md bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10">
                      <tool.icon className="w-4 h-4 text-gray-700 dark:text-white/80" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-gray-900 dark:text-white">
                        {tool.name}
                      </span>
                      <span className="block text-xs text-gray-600 dark:text-gray-400 leading-snug">
                        {tool.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
