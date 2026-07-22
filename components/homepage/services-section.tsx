"use client";

import { Button } from "@/components/ui/button";
import { trackServiceInterest } from "@/lib/firebase-analytics";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useRef } from "react";

const services = [
  {
    id: "custom-portals",
    phase: "01",
    icon: Building2,
    title: "Custom Portals and Internal Tools",
    tagline:
      "One secure place for the right people to see the right information and take action.",
    impact: "Client, staff, admin and investor views",
    benefits: [
      "Role-based access for clients, staff, admins, investors or partners",
      "Dashboards, forms, uploads, approvals and activity tracking",
      "A focused alternative to spreadsheet, email and oversized SaaS workflows",
    ],
    timeline: "8-10 weeks typical",
    gradientFrom: "from-emerald-500/20",
    gradientTo: "to-emerald-500/5",
    borderColor: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-400/40",
    iconColor: "text-emerald-400",
    accentColor: "text-emerald-400",
    shadowColor: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  },
  {
    id: "databases-dashboards",
    phase: "02",
    icon: BarChart3,
    title: "Databases, Dashboards and Reporting",
    tagline:
      "Clean data models and reporting screens built around the decisions you make.",
    impact: "Right data, right role",
    benefits: [
      "Custom databases for the information your business actually needs",
      "Management screens, reporting views, logs and decision dashboards",
      "A stronger data layer before automation or AI is added",
    ],
    timeline: "Scoped per build",
    gradientFrom: "from-blue-500/20",
    gradientTo: "to-blue-500/5",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-400/40",
    iconColor: "text-blue-400",
    accentColor: "text-blue-400",
    shadowColor: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
  },
  {
    id: "workflow-automation",
    phase: "03",
    icon: Workflow,
    title: "Workflow Automation and Integrations",
    tagline:
      "Automate handoffs, document intake, approvals, notifications and repeatable admin.",
    impact: "Less duplicate entry",
    benefits: [
      "Connect CRMs, finance tools, email, forms, storage and existing systems",
      "Reduce manual chasing, re-keying and status updates",
      "Use n8n where it fits and custom code where ownership matters",
    ],
    timeline: "2-6 weeks or part of build",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-purple-500/5",
    borderColor: "border-purple-500/20",
    hoverBorder: "hover:border-purple-400/40",
    iconColor: "text-purple-400",
    accentColor: "text-purple-400",
    shadowColor: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
  },
  {
    id: "ai-capability",
    phase: "04",
    icon: Sparkles,
    title: "AI Capability and Team Enablement",
    tagline:
      "Add AI where it is controlled, useful and connected to approved business data.",
    impact: "AI inside the workflow",
    benefits: [
      "Secure chat over approved business information",
      "Document extraction, review, triage, summaries and recommendations",
      "Practical training so your team uses AI safely in daily work",
    ],
    timeline: "Built into scope",
    gradientFrom: "from-orange-500/20",
    gradientTo: "to-orange-500/5",
    borderColor: "border-orange-500/20",
    hoverBorder: "hover:border-orange-400/40",
    iconColor: "text-orange-400",
    accentColor: "text-orange-400",
    shadowColor: "shadow-[0_0_30px_rgba(249,115,22,0.15)]",
  },
];

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
        <div className="absolute -top-2 -left-2 text-6xl font-thin text-gray-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none">
          {service.phase}
        </div>

        <div
          className={`absolute inset-0 rounded-2xl opacity-[0.08] group-hover:opacity-100 group-active:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ${service.shadowColor}`}
        />

        <div
          className={`
          relative bg-gray-900/[0.02] dark:bg-white/[0.02] border ${service.borderColor} ${service.hoverBorder}
          rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300 ease-out
          hover:bg-gray-900/[0.03] dark:hover:bg-white/[0.03] hover:shadow-xl md:hover:shadow-2xl
          active:scale-[0.98] md:hover:-translate-y-1 transform
          min-h-[320px] sm:min-h-[360px] flex flex-col
          backdrop-blur-sm
        `}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/[0.02] dark:from-white/[0.02] to-transparent rounded-2xl" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 rounded-xl bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 backdrop-blur-sm group-hover:bg-gray-900/15 dark:group-hover:bg-white/15 transition-all duration-300">
                <service.icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${service.iconColor}`}
                />
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-600/40 dark:text-white/40 mb-1">
                  Timeline
                </div>
                <div className={`text-sm font-medium ${service.accentColor}`}>
                  {service.timeline}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-5">
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

              <div className="space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="relative flex-shrink-0 mt-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${service.iconColor}`}
                      />
                    </div>
                    <span className="text-sm text-gray-600/70 dark:text-white/70 leading-relaxed group-hover:text-gray-900/90 dark:group-hover:text-white/90 transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-900/10 dark:border-white/10 flex items-center justify-between">
              <span
                className={`text-sm font-medium ${service.accentColor} group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300`}
              >
                Learn More
              </span>
              <ArrowRight
                className={`w-4 h-4 ${service.accentColor} group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300`}
              />
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
  useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative section-rhythm-lg overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-4">
            What We Build
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight tracking-[-0.02em] break-words">
            <span className="relative">
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Software for workflows generic tools do not fit.
              </span>
              <div className="absolute -inset-x-4 -inset-y-2 bg-blue-500/20 blur-2xl opacity-15 md:opacity-30" />
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-700/70 dark:text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
            We design and build the core systems your team, clients, and partners
            use to see the right information and get work done.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="text-center mt-16 lg:mt-20">
          <Button variant="secondary" size="lg" className="group" asChild>
            <Link href="/services" className="inline-flex items-center gap-3">
              Explore Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
