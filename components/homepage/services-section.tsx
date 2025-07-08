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
import { memo, useCallback, useRef } from "react";

const services = [
  {
    id: "strategic-research",
    phase: "01",
    icon: TrendingUp,
    title: "Strategic Research",
    tagline: "Internal framework to conduct research on your behalf",
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
    gradientTo: "to-emerald-500/5",
    borderColor: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-400/40",
    iconColor: "text-emerald-400",
    accentColor: "text-emerald-400",
    shadowColor: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  },
  {
    id: "rapid-development",
    phase: "02",
    icon: Code,
    title: "Rapid Development & Integration",
    tagline: "Integrate AI features",
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
    gradientTo: "to-blue-500/5",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-400/40",
    iconColor: "text-blue-400",
    accentColor: "text-blue-400",
    shadowColor: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
  },
  {
    id: "workflow-optimisation",
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
    gradientTo: "to-purple-500/5",
    borderColor: "border-purple-500/20",
    hoverBorder: "hover:border-purple-400/40",
    iconColor: "text-purple-400",
    accentColor: "text-purple-400",
    shadowColor: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
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
    gradientTo: "to-orange-500/5",
    borderColor: "border-orange-500/20",
    hoverBorder: "hover:border-orange-400/40",
    iconColor: "text-orange-400",
    accentColor: "text-orange-400",
    shadowColor: "shadow-[0_0_30px_rgba(249,115,22,0.15)]",
  },
];

// Mobile-optimized background with reduced complexity
const PremiumBackground = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Simple gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950" />

      {/* Mobile-optimized floating orbs - much smaller and simpler */}
      <div className="absolute inset-0 opacity-20">
        {/* Reduced size for mobile compatibility */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 md:w-48 md:h-48 lg:w-64 bg-blue-500/6 rounded-full blur-xl md:blur-2xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-emerald-500/6 rounded-full blur-xl md:blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 left-1/6 w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-purple-500/4 rounded-full blur-lg md:blur-xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Simplified grain texture - disabled on mobile for performance */}
      <div
        className="absolute inset-0 opacity-[0.01] md:opacity-[0.015] pointer-events-none hidden sm:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Subtle radial overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />
    </div>
  );
});

PremiumBackground.displayName = "PremiumBackground";

// Mobile-optimized service card component
const ServiceCard = memo(
  ({ service, index }: { service: (typeof services)[0]; index: number }) => {
    const handleServiceClick = useCallback(() => {
      trackServiceInterest(service.id, "learn_more", {
        service_name: service.title,
        location: "services_section",
      });

      // Navigate directly to the specific service section with proper anchor
      const serviceAnchor = service.id;
      window.location.href = `/services#${serviceAnchor}`;
    }, [service.id, service.title]);

    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        className="group relative cursor-pointer touch-manipulation"
        data-service-id={service.id}
        onClick={handleServiceClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleServiceClick();
          }
        }}
      >
        {/* Premium phase number background */}
        <div className="absolute -top-2 -left-2 text-6xl font-thin text-white/[0.03] pointer-events-none select-none">
          {service.phase}
        </div>

        {/* Mobile-optimized hover glow effect - reduced for performance */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${service.shadowColor} hidden md:block`}
        />

        {/* Main card with mobile-optimized glassmorphism */}
        <div
          className={`
          relative bg-white/[0.02] border ${service.borderColor} ${service.hoverBorder}
          rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300 ease-out
          hover:bg-white/[0.03] hover:shadow-xl md:hover:shadow-2xl
          active:scale-[0.98] md:hover:-translate-y-1 transform
          min-h-[360px] sm:min-h-[420px] lg:min-h-[450px] flex flex-col
          backdrop-blur-sm
        `}
        >
          {/* Simplified glassmorphism layers for mobile */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-2xl" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:duration-500`}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Enhanced header */}
            <div className="flex items-start justify-between mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm group-hover:bg-white/15 transition-all duration-300">
                <service.icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${service.iconColor}`}
                />
              </div>

              <div className="text-right">
                <div className="text-xs sm:text-xs text-white/40 mb-1">
                  Timeline
                </div>
                <div
                  className={`text-sm sm:text-sm font-medium ${service.accentColor}`}
                >
                  {service.timeline}
                </div>
              </div>
            </div>

            {/* Enhanced content */}
            <div className="flex-1 space-y-6">
              {/* Title and tagline */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white leading-tight tracking-[-0.01em]">
                  {service.title}
                </h3>
                <p className="text-base sm:text-lg text-white/80 font-light">
                  {service.tagline}
                </p>
                <div
                  className={`inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm ${service.accentColor} font-medium backdrop-blur-sm`}
                >
                  {service.impact}
                </div>
              </div>

              {/* Enhanced benefits */}
              <div className="space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="relative flex-shrink-0 mt-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${service.iconColor}`}
                      />
                      <div
                        className={`absolute inset-0 ${service.iconColor} blur-sm opacity-60`}
                      />
                    </div>
                    <span className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              {/* Premium example tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.examples.map((example, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/50 hover:text-white/70 hover:bg-white/[0.08] transition-colors duration-200 backdrop-blur-sm"
                  >
                    {example}
                  </span>
                ))}
              </div>

              {/* Enhanced CTA */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${service.accentColor} group-hover:text-white transition-colors duration-300`}
                >
                  Learn More
                </span>
                <div className="p-1.5 rounded-full bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight
                    className={`w-4 h-4 ${service.accentColor} group-hover:text-white group-hover:translate-x-1 transition-all duration-300`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  },
);

ServiceCard.displayName = "ServiceCard";

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const handleExploreAllServices = useCallback(() => {
    window.location.href = "/services";
  }, []);

  return (
    <section
      ref={ref}
      id="services"
      className="relative pt-32 md:pt-36 lg:pt-44 pb-32 md:pb-36 lg:pb-44 overflow-hidden"
    >
      <PremiumBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-24 md:mb-28 lg:mb-32">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 lg:mb-12 leading-tight tracking-[-0.02em]">
            Four Things We{" "}
            <span className="relative">
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Do
              </span>
              {/* Subtle glow effect - disabled on mobile for performance */}
              <div className="absolute -inset-x-4 -inset-y-2 bg-blue-500/20 blur-2xl opacity-30 hidden md:block" />
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
            Four practical ways we help businesses integrate AI into their
            operations.
          </p>
        </div>

        {/* Services Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Enhanced bottom CTA */}
        <div className="text-center mt-20 lg:mt-24">
          <p className="text-white/60 text-lg mb-6">
            Ready to see how AI can transform your business?
          </p>
          <button
            onClick={handleExploreAllServices}
            className="
              inline-flex items-center gap-3 px-8 py-4 
              bg-white/10 hover:bg-white/15 backdrop-blur-sm
              border border-white/20 hover:border-white/30
              rounded-xl text-white font-medium
              transition-all duration-300 hover:scale-105
              group hover:shadow-2xl hover:shadow-blue-500/20
              active:scale-95 touch-manipulation
            "
          >
            Explore All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
