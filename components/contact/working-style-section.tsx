"use client";

import { motion } from "framer-motion";
import { CheckCircle, Lightbulb, Target, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function WorkingStyleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ensure immediate animation trigger
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const principles = [
    {
      icon: Target,
      title: "Strategic Research Intelligence",
      description:
        "Multi-model AI research with systematic validation across Claude, OpenAI, and Gemini for comprehensive business insights.",
      points: [
        "Deep research completed in 3-5 days",
        "Cross-model validation for accuracy",
        "Strategic documentation with clear next steps",
        "Implementation roadmap included",
      ],
      color: "text-blue-400",
      borderColor: "border-blue-500/15",
      hoverBorderColor: "hover:border-blue-500/30",
    },
    {
      icon: Zap,
      title: "Rapid Development & Automation",
      description:
        "Working prototypes and automated workflows built with the same tools we use daily - from concept to deployment.",
      points: [
        "Functional prototypes in 1-2 weeks",
        "n8n workflow automation setup",
        "API integrations ready for production",
        "Complete handoff documentation",
      ],
      color: "text-emerald-400",
      borderColor: "border-emerald-500/15",
      hoverBorderColor: "hover:border-emerald-500/30",
    },
    {
      icon: Lightbulb,
      title: "AI Training & Implementation",
      description:
        "Custom AI models and training programs designed for your specific business processes and team capabilities.",
      points: [
        "Custom DeepSeek model fine-tuning",
        "Team training workshops included",
        "Ongoing optimization and support",
        "Measurable performance improvements",
      ],
      color: "text-purple-400",
      borderColor: "border-purple-500/15",
      hoverBorderColor: "hover:border-purple-500/30",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 md:mb-8 leading-tight tracking-[-0.02em]"
          >
            What We{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Actually Do
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Strategic research, rapid development, and AI implementation using
            the tools we work with every day
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              variants={itemVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
              className={`
                relative bg-white/[0.02] backdrop-blur-xl border ${principle.borderColor} 
                rounded-3xl p-8 md:p-10 hover:bg-white/[0.04] ${principle.hoverBorderColor}
                transition-all duration-300 group
              `}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-white/5 border ${principle.borderColor} flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300`}
              >
                <principle.icon className={`w-8 h-8 ${principle.color}`} />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight group-hover:text-blue-300 transition-colors duration-300">
                  {principle.title}
                </h3>

                <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {principle.description}
                </p>

                {/* Key Points */}
                <div className="space-y-3">
                  {principle.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3">
                      <CheckCircle
                        className={`w-5 h-5 ${principle.color} flex-shrink-0 mt-0.5`}
                      />
                      <span className="text-base text-gray-100 leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-center mt-16 md:mt-20"
        >
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
              Ready to Move Fast?
            </h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              If you&apos;re tired of lengthy consulting processes and want
              practical results quickly, let&apos;s discuss your specific
              challenge.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { label: "Response Time", value: "< 24 hours" },
                { label: "Research Delivery", value: "3-5 days" },
                { label: "Prototype Delivery", value: "1-2 weeks" },
              ].map((stat, index) => (
                <div key={stat.label} className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-blue-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
