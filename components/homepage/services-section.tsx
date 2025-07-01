"use client";

import { trackServiceInterest } from "@/lib/firebase-analytics";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Code,
  TrendingUp,
} from "lucide-react";
import { useRef, useState } from "react";

const services = [
  {
    id: "strategic-research",
    phase: "01",
    icon: TrendingUp,
    title: "Strategic Research",
    tagline: "AI agents that read 1000 sources in minutes",
    impact: "Cut research time by 80%",
    benefits: [
      "Multi-source research across thousands of data points",
      "Strategic insights for market entry and competitive positioning",
      "Regulatory landscape analysis and compliance mapping",
    ],
    examples: [
      "Market sizing",
      "Due diligence",
      "Competitor intel",
      "Tech scouting",
    ],
    timeline: "3-5 days",
    gradientFrom: "from-emerald-500/20",
    gradientTo: "to-emerald-500/0",
    borderColor: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-400/40",
    iconColor: "text-emerald-400",
    accentColor: "text-emerald-400",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    id: "rapid-development",
    phase: "02",
    icon: Code,
    title: "Rapid Development & Integration",
    tagline: "Integrate waysorking AI features",
    impact: "From idea to live demo",
    benefits: [
      "Functional prototypes and production-ready applications",
      "API integrations connecting your existing workflows",
      "Complete technical documentation and team handoff",
    ],
    examples: [
      "AI chat systems",
      "Custom dashboards",
      "API integration",
      "Web apps",
    ],
    timeline: "1-2 weeks",
    gradientFrom: "from-blue-500/20",
    gradientTo: "to-blue-500/0",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-400/40",
    iconColor: "text-blue-400",
    accentColor: "text-blue-400",
    shadowColor: "shadow-blue-500/20",
  },
  {
    id: "workflow-optimization",
    phase: "03",
    icon: Building2,
    title: "Workflow Automation",
    tagline: "Save 10+ hours per week",
    impact: "Reclaim 40 hours monthly",
    benefits: [
      "Business process analysis and bottleneck identification",
      "Automated workflows for lead generation and reporting",
      "Marketing automation including email sequences",
    ],
    examples: [
      "Sales workflows",
      "Report automation",
      "Data sync",
      "Email sequences",
    ],
    timeline: "2-4 weeks",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-purple-500/0",
    borderColor: "border-purple-500/20",
    hoverBorder: "hover:border-purple-400/40",
    iconColor: "text-purple-400",
    accentColor: "text-purple-400",
    shadowColor: "shadow-purple-500/20",
  },
  {
    id: "ai-training",
    phase: "04",
    icon: BookOpen,
    title: "AI Training",
    tagline: "Master your output with modern tools",
    impact: "Build your AI advantage",
    benefits: [
      "Industry-specific AI strategy and implementation",
      "Custom knowledge systems using your business data",
      "Team workshops and ongoing capability building",
    ],
    examples: [
      "Team workshops",
      "AI adoption",
      "Prompt engineering",
      "Process design",
    ],
    timeline: "Custom sessions",
    gradientFrom: "from-orange-500/20",
    gradientTo: "to-orange-500/0",
    borderColor: "border-orange-500/20",
    hoverBorder: "hover:border-orange-400/40",
    iconColor: "text-orange-400",
    accentColor: "text-orange-400",
    shadowColor: "shadow-orange-500/20",
  },
];

// Optimized background - no performance-heavy effects
function OptimizedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Simple gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Premium service card component
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleServiceClick = () => {
    trackServiceInterest(service.id, "learn_more", {
      service_name: service.title,
      location: "services_section",
    });

    const sectionMap: { [key: string]: string } = {
      "strategic-research": "research-section",
      "rapid-development": "development-section",
      "workflow-optimization": "automation-section",
      "ai-training": "training-section",
    };

    sessionStorage.setItem("targetSection", sectionMap[service.id] || "");
    window.location.href = "/services";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleServiceClick}
    >
      {/* Phase number background */}
      <div className="absolute -top-2 -left-2 text-6xl font-thin text-white/[0.02] pointer-events-none select-none">
        {service.phase}
      </div>

      {/* Gradient glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Main card */}
      <div
        className={`
          relative bg-white/[0.015] border ${service.borderColor} ${service.hoverBorder}
          rounded-2xl p-8 lg:p-10 transition-all duration-300 ease-out
          hover:bg-white/[0.025] hover:shadow-2xl hover:${service.shadowColor}
          hover:-translate-y-2 transform will-change-transform
          min-h-[420px] lg:min-h-[450px] flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div
            className={`
              p-4 rounded-xl bg-white/5 border border-white/10
              group-hover:scale-110 group-hover:bg-white/10
              transition-all duration-300 will-change-transform
            `}
          >
            <service.icon className={`w-7 h-7 ${service.iconColor}`} />
          </div>

          <div className="text-right">
            <div className="text-xs text-white/40 mb-1">Timeline</div>
            <div className={`text-sm font-medium ${service.accentColor}`}>
              {service.timeline}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {/* Title and tagline */}
          <div className="space-y-3">
            <h3 className="text-xl lg:text-2xl font-semibold text-white leading-tight">
              {service.title}
            </h3>
            <p className="text-lg text-white/80 font-light">
              {service.tagline}
            </p>
            <div
              className={`inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm ${service.accentColor} font-medium`}
            >
              {service.impact}
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            {service.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${service.iconColor} flex-shrink-0 mt-2`}
                />
                <span className="text-sm text-white/70 leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/5">
          {/* Quick examples */}
          <div className="flex flex-wrap gap-2 mb-4">
            {service.examples.map((example, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xs text-white/50 hover:text-white/70 hover:bg-white/[0.05] transition-colors duration-200"
              >
                {example}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-medium ${service.accentColor} group-hover:text-white transition-colors duration-300`}
            >
              Learn More
            </span>
            <ArrowRight
              className={`w-5 h-5 ${service.accentColor} group-hover:text-white group-hover:translate-x-1 transition-all duration-300`}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative pt-32 md:pt-36 lg:pt-44 pb-32 md:pb-36 lg:pb-44 overflow-hidden"
    >
      <OptimizedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-20 md:mb-24 lg:mb-32"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 lg:mb-12 leading-tight tracking-[-0.02em]"
          >
            Four Things We{" "}
            <span className="relative">
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Do
              </span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Four practical ways we help businesses integrate AI into their
            operations.
          </motion.p>
        </motion.div>

        {/* Services Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 lg:mt-24"
        >
          <p className="text-white/60 text-lg mb-6">
            Ready to see how AI can transform your business?
          </p>
          <button
            onClick={() => (window.location.href = "/services")}
            className="
              inline-flex items-center gap-3 px-8 py-4 
              bg-white/5 hover:bg-white/10 
              border border-white/20 hover:border-white/30
              rounded-xl text-white font-medium
              transition-all duration-300 hover:scale-105
              group will-change-transform
            "
          >
            Explore All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
