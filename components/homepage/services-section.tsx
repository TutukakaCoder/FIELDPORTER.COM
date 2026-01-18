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
    title: "Stop Guessing.",
    tagline: "Market intelligence that kills risk before you spend.",
    impact: "Know your market in 5 days",
    benefits: [
      "Multi-source research preventing costly missteps",
      "Strategic insights answering critical viability questions",
      "Clear implementation guidance, not just theory",
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
    title: "Validate Instantly.",
    tagline: "Turn 'good ideas' into working products. Fast.",
    impact: "Launch MVP in 2 weeks",
    benefits: [
      "Production-ready AI applications",
      "Seamless API integrations with existing tools",
      "Complete technical documentation and handoff",
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
    title: "Cut the Bloat.",
    tagline: "Replace expensive admin hours with reliable code.",
    impact: "Save 20+ hours/week",
    benefits: [
      "Eliminate operational drag and manual data entry",
      "Automate complex workflows end-to-end",
      "Scale your output without scaling headcount",
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
    title: "Own the Tech.",
    tagline: "Don't rent your advantage. Build internal capability.",
    impact: "Build a self-sufficient team",
    benefits: [
      "Industry-specific AI strategy workshops",
      "Custom knowledge systems on your own data",
      "Train your team to fish, not just eat",
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
      <div className="absolute inset-0 bg-transparent" />

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
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-900/20 dark:to-black/20" />
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
        <div className="absolute -top-2 -left-2 text-6xl font-thin text-gray-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none">
          {service.phase}
        </div>

        {/* Mobile-optimized hover glow effect - reduced for performance */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${service.shadowColor} hidden md:block`}
        />

        {/* Main card with mobile-optimized glassmorphism */}
        <div
          className={`
          relative bg-gray-900/[0.02] dark:bg-white/[0.02] border ${service.borderColor} ${service.hoverBorder}
          rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300 ease-out
          hover:bg-gray-900/[0.03] dark:hover:bg-white/[0.03] hover:shadow-xl md:hover:shadow-2xl
          active:scale-[0.98] md:hover:-translate-y-1 transform
          min-h-[360px] sm:min-h-[420px] lg:min-h-[450px] flex flex-col
          backdrop-blur-sm
        `}
        >
          {/* Simplified glassmorphism layers for mobile */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/[0.02] dark:from-white/[0.02] to-transparent rounded-2xl" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:duration-500`}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Enhanced header */}
            <div className="flex items-start justify-between mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 rounded-xl bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 backdrop-blur-sm group-hover:bg-gray-900/15 dark:group-hover:bg-white/15 transition-all duration-300">
                <service.icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${service.iconColor}`}
                />
              </div>

              <div className="text-right">
                <div className="text-xs sm:text-xs text-gray-600/40 dark:text-white/40 mb-1">
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
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white leading-tight tracking-[-0.01em]">
                  {service.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-700/80 dark:text-white/80 font-light">
                  {service.tagline}
                </p>
                <div
                  className={`inline-block px-3 py-1 rounded-full bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 text-sm ${service.accentColor} font-medium backdrop-blur-sm`}
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
                    <span className="text-sm text-gray-600/70 dark:text-white/70 leading-relaxed group-hover:text-gray-900/90 dark:group-hover:text-white/90 transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced footer */}
            <div className="mt-8 pt-6 border-t border-gray-900/10 dark:border-white/10">
              {/* Premium example tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.examples.map((example, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-gray-900/[0.05] dark:bg-white/[0.05] border border-gray-900/10 dark:border-white/10 text-xs text-gray-600/50 dark:text-white/50 hover:text-gray-900/70 dark:hover:text-white/70 hover:bg-gray-900/[0.08] dark:hover:bg-white/[0.08] transition-colors duration-200 backdrop-blur-sm"
                  >
                    {example}
                  </span>
                ))}
              </div>

              {/* Enhanced CTA */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${service.accentColor} group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300`}
                >
                  Learn More
                </span>
                <div className="p-1.5 rounded-full bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight
                    className={`w-4 h-4 ${service.accentColor} group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300`}
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
      className="relative pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden bg-transparent"
    >
      <PremiumBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-24 md:mb-28 lg:mb-32">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 dark:text-white mb-8 lg:mb-12 leading-tight tracking-[-0.02em]">
            Stop Lagging.{" "}
            <span className="relative">
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Start Leading.
              </span>
              {/* Subtle glow effect - disabled on mobile for performance */}
              <div className="absolute -inset-x-4 -inset-y-2 bg-blue-500/20 blur-2xl opacity-30 hidden md:block" />
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-700/70 dark:text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
            We don't sell &quot;AI&quot;. We sell outcomes. Here is how we
            remove bottlenecks and drive growth.
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
          <p className="text-gray-600 dark:text-white/60 text-lg mb-6">
            Ready to see how AI can transform your business?
          </p>
          <button
            onClick={handleExploreAllServices}
            className="
              inline-flex items-center gap-3 px-8 py-4 
              bg-gray-900/10 dark:bg-white/10 hover:bg-gray-900/15 dark:hover:bg-white/15 backdrop-blur-sm
              border border-gray-900/20 dark:border-white/20 hover:border-gray-900/30 dark:hover:border-white/30
              rounded-xl text-gray-900 dark:text-white font-medium
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
