"use client";

import { Button } from "@/components/ui/button";
import { trackServiceInterest } from "@/lib/firebase-analytics";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Code,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useRef } from "react";

const services = [
  {
    id: "strategic-research",
    phase: "01",
    icon: TrendingUp,
    title: "Strategic Research & Intelligence",
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
    title: "Rapid AI Development & Integration",
    tagline: "Turn 'good ideas' into working products. Fast.",
    impact: "Launch MVP in 2 weeks",
    benefits: [
      "Production-ready AI applications",
      "APIs that plug into your existing tools, with clear docs",
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
    id: "workflow-optimization",
    phase: "03",
    icon: Building2,
    title: "Process Efficiency & Workflow Optimisation",
    tagline: "Replace expensive admin hours with reliable code.",
    impact: "Save 20+ hours/week",
    benefits: [
      "Eliminate operational drag and manual data entry",
      "Automate complex workflows end-to-end",
      "Get more done without adding headcount",
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
    title: "AI Strategy & Team Capability Building",
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

// Mobile-optimized service card component
const ServiceCard = memo(
  ({ service, index }: { service: (typeof services)[0]; index: number }) => {
    const router = useRouter();
    const handleServiceClick = useCallback(() => {
      trackServiceInterest(service.id, "learn_more", {
        service_name: service.title,
        location: "services_section",
      });
      router.push(`/services#${service.id}`);
    }, [service.id, service.title, router]);

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

        {/* Hover/tap glow: subtle on mobile, full on desktop */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-[0.08] group-hover:opacity-100 group-active:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ${service.shadowColor}`}
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
            className={`absolute inset-0 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
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

  return (
    <section
      ref={ref}
      id="services"
      className="relative section-rhythm-lg overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight tracking-[-0.02em] break-words">
            <span className="relative">
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Production Systems in Weeks. Strategic Research in Days.
              </span>
              {/* Subtle glow - lighter on mobile */}
              <div className="absolute -inset-x-4 -inset-y-2 bg-blue-500/20 blur-2xl opacity-15 md:opacity-30" />
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-700/70 dark:text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
            We remove bottlenecks and save time with AI integration, automation,
            and research. Here's how we deliver.
          </p>
        </div>

        {/* Services Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Enhanced bottom CTA */}
        <div className="text-center mt-20 lg:mt-24">
          <p className="text-gray-600 dark:text-white/60 text-lg mb-6">
            Ready to cut overhead, move faster, or de-risk your next decision?
          </p>
          <Button variant="secondary" size="lg" className="group" asChild>
            <Link href="/services" className="inline-flex items-center gap-3">
              Explore All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
