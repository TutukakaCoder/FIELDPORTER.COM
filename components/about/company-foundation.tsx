"use client";

import { motion } from "framer-motion";
import { Building2, Check, Globe, UserCheck, Wallet } from "lucide-react";

const trackRecord = [
  {
    icon: Globe,
    title: "Delivered across three markets",
    detail:
      "Production platforms for advisory firms, venture capital firms, and property lenders in New Zealand, Hong Kong, and Australia.",
  },
  {
    icon: Wallet,
    title: "Lower seat license spend",
    detail:
      "Clients have replaced off-the-shelf platforms like HubSpot with custom software, saving tens of thousands per month.",
  },
  {
    icon: UserCheck,
    title: "Founder-run delivery",
    detail: "Freddy runs discovery, design, and handover directly.",
  },
] as const;

const model = [
  "Strategy and architecture led in house.",
  "Execution scaled through our developer and AI agent network.",
  "Handover and training included in every engagement.",
  "Larger projects can draw on 100+ developers, specialist security testing partners, and domain advisors.",
] as const;

const leadership = [
  { name: "Freddy Hopkins", initials: "FH", role: "Co-founder" },
  { name: "Sam Allais", initials: "SA", role: "Co-founder" },
] as const;

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
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              FIELDPORTER is led by{" "}
              <span className="text-gray-900 dark:text-white font-medium">
                Freddy Hopkins
              </span>{" "}
              and{" "}
              <span className="text-gray-900 dark:text-white font-medium">
                Sam Allais
              </span>
              . We lead strategy and architecture, then scale execution with
              developers and AI agents where needed. You get delivery speed
              without losing a single point of contact.
            </p>

            <ul className="space-y-4">
              {trackRecord.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                    <item.icon
                      className="h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                {model.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-blue-400"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/[0.02] dark:from-white/[0.02] to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16"
        >
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">
            Leadership
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {leadership.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 md:p-6 rounded-2xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02]"
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-sm font-medium text-blue-400"
                  aria-hidden="true"
                >
                  {person.initials}
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {person.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {person.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
