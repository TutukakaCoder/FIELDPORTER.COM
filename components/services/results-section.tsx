"use client";

import { GlassCard } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Target, TrendingUp, Zap } from "lucide-react";

interface ResultsSectionProps {
  title: string;
  subtitle: string;
  results: Array<{
    metric: string;
    description: string;
    industry: string;
  }>;
}

export function ResultsSection({
  title,
  subtitle,
  results,
}: ResultsSectionProps) {
  // Extract key metrics and create more visual data
  const getProjectData = (
    result: ResultsSectionProps["results"][0],
    index: number,
  ) => {
    const icons = [Brain, Zap, Target, TrendingUp];
    const Icon = icons[index] || Brain;

    // Extract key numbers/metrics from description
    let primaryMetric = "";
    let secondaryMetric = "";
    let timeframe = "";

    if (result.description.includes("6+ months")) {
      primaryMetric = "6+ months";
      secondaryMetric = "Revenue";
      timeframe = "Ongoing";
    } else if (result.description.includes("One week")) {
      primaryMetric = "1 week";
      secondaryMetric = "Research";
      timeframe = "Delivery";
    } else if (result.description.includes("70%")) {
      primaryMetric = "70%";
      secondaryMetric = "Efficiency";
      timeframe = "Improvement";
    } else if (result.description.includes("283%")) {
      primaryMetric = "283%";
      secondaryMetric = "Accuracy";
      timeframe = "Boost";
    } else {
      primaryMetric = "100%";
      secondaryMetric = "Success";
      timeframe = "Delivered";
    }

    // Create shorter, punchier descriptions
    let shortDescription = "";
    if (result.metric.includes("Self Development")) {
      shortDescription =
        "Complex React/Firebase platform generating consistent revenue";
    } else if (result.metric.includes("Market Entry")) {
      shortDescription = "US expansion strategy with POS integration analysis";
    } else if (result.metric.includes("Email Classification")) {
      shortDescription = "AI-powered email automation with workflow platforms";
    } else if (result.metric.includes("News Digest")) {
      shortDescription =
        "DeepSeek API integration for automated market insights";
    } else {
      shortDescription = result.description.substring(0, 60) + "...";
    }

    return {
      ...result,
      Icon,
      primaryMetric,
      secondaryMetric,
      timeframe,
      shortDescription,
    };
  };

  return (
    <section className="py-16 lg:py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-fieldporter-secondary to-bg-fieldporter-tertiary" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-fieldporter-white">
            {title}
          </h2>
          <p className="text-lg text-fieldporter-gray max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {results.map((result, index) => {
            const projectData = getProjectData(result, index);
            const { Icon } = projectData;

            return (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 lg:p-8 h-full hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:border-fieldporter-blue/40 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    {/* Icon and Metrics */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                        <Icon className="w-8 h-8 text-fieldporter-blue" />
                      </div>

                      {/* Primary Metric */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-fieldporter-blue">
                          {projectData.primaryMetric}
                        </div>
                        <div className="text-xs text-fieldporter-gray font-medium">
                          {projectData.secondaryMetric}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Project Title */}
                      <h3 className="text-xl font-semibold text-fieldporter-white mb-2 leading-tight group-hover:text-fieldporter-blue transition-colors duration-300">
                        {result.metric}
                      </h3>

                      {/* Short Description */}
                      <p className="text-fieldporter-gray text-sm leading-relaxed mb-4">
                        {projectData.shortDescription}
                      </p>

                      {/* Industry Tag and Timeframe */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-fieldporter-blue/20 border border-fieldporter-blue/30">
                          <span className="text-xs font-medium text-fieldporter-blue">
                            {result.industry}
                          </span>
                        </div>

                        <div className="text-xs text-fieldporter-gray font-medium">
                          {projectData.timeframe}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <motion.div
            className="text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <div className="text-3xl font-bold text-fieldporter-blue mb-2">
              4
            </div>
            <div className="text-sm text-fieldporter-gray">
              Projects Delivered
            </div>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <div className="text-3xl font-bold text-fieldporter-blue mb-2">
              90%
            </div>
            <div className="text-sm text-fieldporter-gray">Faster Research</div>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <div className="text-3xl font-bold text-fieldporter-blue mb-2">
              1-4 weeks
            </div>
            <div className="text-sm text-fieldporter-gray">
              Typical Timeline
            </div>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <div className="text-3xl font-bold text-fieldporter-blue mb-2">
              100%
            </div>
            <div className="text-sm text-fieldporter-gray">
              Client Satisfaction
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
