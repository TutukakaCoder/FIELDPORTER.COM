"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  Cloud,
  Code,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Mail,
  Palette,
  Settings,
  Shield,
  Smartphone,
  Video,
  Zap,
} from "lucide-react";

const comprehensiveTechStack = [
  {
    category: "AI & Analysis",
    tools: [
      {
        name: "Claude 4 Opus",
        icon: Brain,
        description:
          "Advanced reasoning, complex analysis, and code generation",
      },
      {
        name: "GPT-4 Turbo",
        icon: Cpu,
        description: "Large context reasoning and specialized task automation",
      },
      {
        name: "Gemini 2.5 Pro",
        icon: Globe,
        description:
          "Multimodal processing and comprehensive document analysis",
      },
      {
        name: "DeepSeek V3",
        icon: Brain,
        description: "Cost-effective reasoning for production implementations",
      },
      {
        name: "Perplexity Pro",
        icon: Globe,
        description: "Real-time research and information synthesis",
      },
      {
        name: "Cursor AI",
        icon: Code,
        description: "AI-powered development environment and code generation",
      },
    ],
  },
  {
    category: "Development & Infrastructure",
    tools: [
      {
        name: "Next.js 15",
        icon: Code,
        description: "React framework with App Router and server components",
      },
      {
        name: "TypeScript",
        icon: Code,
        description: "Type-safe JavaScript for scalable applications",
      },
      {
        name: "Tailwind CSS",
        icon: Palette,
        description: "Utility-first CSS framework for rapid UI development",
      },
      {
        name: "Firebase",
        icon: Cloud,
        description: "Real-time database, authentication, and hosting",
      },
      {
        name: "Supabase",
        icon: Database,
        description: "Open-source backend with PostgreSQL foundation",
      },
      {
        name: "MongoDB Atlas",
        icon: Database,
        description: "Cloud database for complex data structures",
      },
      {
        name: "Vercel",
        icon: Cloud,
        description: "Edge deployment and performance optimization",
      },
      {
        name: "Cloudflare",
        icon: Shield,
        description: "CDN, security, and edge computing services",
      },
    ],
  },
  {
    category: "Automation & Integration",
    tools: [
      {
        name: "n8n",
        icon: Settings,
        description: "Self-hosted workflow automation and integration",
      },
      {
        name: "GitHub Actions",
        icon: GitBranch,
        description: "CI/CD pipelines and deployment automation",
      },
      {
        name: "Puppeteer",
        icon: Settings,
        description: "Browser automation and web scraping",
      },
      {
        name: "Custom APIs",
        icon: Zap,
        description: "Bespoke integration solutions and microservices",
      },
      {
        name: "Webhook Systems",
        icon: Settings,
        description: "Real-time event-driven architecture",
      },
    ],
  },
  {
    category: "Analytics & Monitoring",
    tools: [
      {
        name: "Google Analytics 4",
        icon: BarChart3,
        description: "Web analytics and user behavior insights",
      },
      {
        name: "Sentry",
        icon: Shield,
        description: "Error tracking and performance monitoring",
      },
      {
        name: "Plausible Analytics",
        icon: BarChart3,
        description: "Privacy-focused web analytics",
      },
      {
        name: "Custom Dashboards",
        icon: BarChart3,
        description: "Tailored analytics and reporting solutions",
      },
    ],
  },
  {
    category: "Design & Content",
    tools: [
      {
        name: "Figma",
        icon: Palette,
        description: "UI/UX design and collaborative prototyping",
      },
      {
        name: "Midjourney V6",
        icon: Palette,
        description: "AI-powered image generation and creative assets",
      },
      {
        name: "DALL-E 3",
        icon: Palette,
        description: "Precise AI image creation and editing",
      },
      {
        name: "ElevenLabs",
        icon: Video,
        description: "AI voice synthesis and audio generation",
      },
      {
        name: "RunwayML",
        icon: Video,
        description: "AI video generation and editing tools",
      },
    ],
  },
  {
    category: "Communication & Infrastructure",
    tools: [
      {
        name: "Resend",
        icon: Mail,
        description: "Developer-focused email API and delivery",
      },
      {
        name: "Twilio",
        icon: Smartphone,
        description: "SMS, voice, and communication APIs",
      },
      {
        name: "Linear",
        icon: Settings,
        description: "Project management and issue tracking",
      },
      {
        name: "Notion",
        icon: Settings,
        description: "Documentation and knowledge management",
      },
    ],
  },
];

export function TechStack() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
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
            Tools and frameworks we have extensive experience implementing in
            production environments
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
                    <div className="relative p-6 rounded-xl backdrop-blur-xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02] transition-all duration-300 group-hover:bg-gray-900/[0.04] dark:group-hover:bg-white/[0.04] group-hover:border-gray-900/20 dark:group-hover:border-white/20">
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
