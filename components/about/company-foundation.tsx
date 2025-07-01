"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function CompanyFoundation() {
  return (
    <section
      id="company-foundation"
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/[0.02]" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
              AI Implementers Who{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Actually Use The Tools
              </span>
            </h2>
            <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
              <p>
                FIELDPORTER provides strategic research and AI implementation
                services while developing our own AI-powered products. We help
                SMBs integrate AI effectively, working with VCs, growth-stage
                companies, and ambitious founders who need to make informed
                decisions quickly.
              </p>
              <p>
                Our approach is straightforward: we understand AI tools deeply
                so we can recommend the best fit for each situation. We test
                automation workflows in real projects, and share what works.
                Whether it&apos;s Claude for complex analysis, n8n for workflow
                automation, or DeepSeek for cost-effective processing, we know
                these tools because we use them daily.
              </p>
              <p className="text-white font-medium">
                Currently focused on consulting and strategic research, with
                plans to expand our product portfolio as we identify and
                validate new opportunities.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative p-6 md:p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-white">
                  Real Experience, Real Results
                </h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                We stay current with the latest AI developments by implementing
                them in real projects with measurable outcomes. Our consulting
                work funds innovation, and our product development informs
                better client solutions.
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
