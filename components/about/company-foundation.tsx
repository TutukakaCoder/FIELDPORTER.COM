"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function CompanyFoundation() {
  return (
    <section
      id="company-foundation"
      className="relative section-rhythm-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gray-50 dark:bg-white/[0.02]" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white leading-tight">
              The Engine{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Behind The Results
              </span>
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              <p>
                FIELDPORTER is led by{" "}
                <span className="text-gray-900 dark:text-white font-medium">
                  Freddy Hopkins
                </span>
                . We operate as a hybrid: we lead strategy and architecture;
                execution is scaled with developers and AI agents where needed.
                We build, deploy, and train your team to take over. You get
                delivery speed without losing a single point of contact.
              </p>
              <p>
                Freddy has delivered production platforms for advisory firms and
                coaches—clients report outcomes like 85% onboarding time saved
                and 15+ hours weekly reclaimed. He runs discovery, design, and
                handover directly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative group"
          >
            <div className="relative p-6 md:p-8 rounded-2xl backdrop-blur-md border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02] transition-all duration-300 group-hover:border-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/5">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white">
                  The FIELDPORTER Model
                </h3>
              </div>
              <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                <p>
                  Strategy and architecture are led in-house; execution is
                  scaled via our developer and AI agent network. Every
                  engagement includes handover and training so your team can run
                  and extend what we build.
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/[0.02] dark:from-white/[0.02] to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
