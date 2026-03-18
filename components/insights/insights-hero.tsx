"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";

const trustSignals = [
  "Curated, practical writing for growing companies",
  "Source-backed insights from top research firms",
  "Clear actions, not generic AI hype",
];

const quickTopics = [
  "AI strategy",
  "automation ROI",
  "portfolio operations",
  "implementation playbooks",
];

export function InsightsHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pb-20 lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-primary via-bg-fieldporter-primary to-bg-fieldporter-secondary" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.15),transparent_35%)]" />

      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 items-start"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-fieldporter-blue/30 bg-fieldporter-blue/10 px-3 py-1.5 text-xs font-medium text-fieldporter-blue">
              <Sparkles className="h-3.5 w-3.5" />
              Strategic Insights
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-fieldporter-white">
                Better AI decisions,
                <span className="text-fieldporter-blue">
                  {" "}
                  backed by evidence
                </span>
              </h1>
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-fieldporter-gray">
                Insight pieces for growing companies and ambitious teams who
                need signal over noise. We combine FIELDPORTER experience with
                trusted external research and clear execution frameworks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                className="sm:min-w-[210px]"
                onClick={() => {
                  document
                    .getElementById("latest-insights")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="sm:min-w-[210px]"
                asChild
              >
                <Link href="/contact">Book strategy call</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-md">
            <div className="mb-5 flex items-center gap-2 text-fieldporter-white">
              <BookOpen className="h-4 w-4 text-fieldporter-blue" />
              <h2 className="text-base font-semibold">
                What this page is built for
              </h2>
            </div>

            <ul className="space-y-3">
              {trustSignals.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-fieldporter-gray"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="mb-3 text-xs uppercase tracking-wide text-fieldporter-gray">
                Core topics
              </p>
              <div className="flex flex-wrap gap-2.5">
                {quickTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-fieldporter-blue/35 bg-fieldporter-blue/10 px-3 py-1 text-xs font-medium text-fieldporter-blue"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="#recommended-reading"
              className="mt-6 inline-flex items-center text-sm font-medium text-fieldporter-blue hover:text-blue-300 transition-colors"
            >
              See external recommended reading
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
