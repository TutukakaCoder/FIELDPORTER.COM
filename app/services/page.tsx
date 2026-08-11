"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle,
  ChevronDown,
  Sparkles,
  Workflow,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { PageWrapper } from "@/components/layout";
import { FAQSection } from "@/components/services/faq-section";
import { MethodologySection } from "@/components/services/methodology-section";
import { ServiceHero } from "@/components/services/service-hero";
import { SERVICES_FAQ_SECTION } from "@/config/services-faqs";

const heroData = {
  title: "Custom software for workflows that generic tools do not fit.",
  subtitle: "Custom Software Development",
  description:
    "We build portals, databases, dashboards, integrations, and AI-enabled tools around the way your business actually runs. Your clients and team get one secure place to see the right information and act on it.",
  stats: [],
  ctaText: "Book a Scoping Call",
  ctaHref: "/contact",
};

const services = [
  {
    id: "custom-portals",
    phase: "01",
    icon: Building2,
    title: "Custom Portals and Internal Tools",
    description:
      "Role-based systems for clients, staff, admins, investors, partners or suppliers, built around the way work actually moves through your business.",
    detailedExplanation:
      "Best for companies that need one secure place for people to log in, submit information, review status, upload documents, approve steps and see the right data. We map the roles, workflows and permissions first, then build the screens and database around that process.",
    outcomes: [
      "Secure login and role-based views",
      "Dashboards, uploads, approvals, notes and status tracking",
      "Custom workflows instead of forcing your business into generic SaaS",
      "A system your team owns and can improve over time",
    ],
    timeline: "8-10 weeks typical",
    timelineStyle: "development",
    borderColor: "border-emerald-500/15",
    hoverBorderColor: "hover:border-emerald-500/25",
    iconColor: "text-emerald-400",
    proof:
      "Best fit: client portals, investor portals, admin dashboards, deal flow systems and internal tools.",
  },
  {
    id: "databases-dashboards",
    phase: "02",
    icon: BarChart3,
    title: "Databases, Dashboards and Reporting",
    description:
      "Custom data structures and reporting screens that make the right information visible to the right people.",
    detailedExplanation:
      "Best for teams whose important information is split across spreadsheets, emails, PDFs or disconnected apps. We design the data model, build management screens and create reporting views so decisions are made from one reliable source of truth.",
    outcomes: [
      "Custom database structure for your actual workflow",
      "Admin screens, reports, logs and decision dashboards",
      "Cleaner data before automation or AI is added",
      "Visibility for leaders, operators, clients or partners",
    ],
    timeline: "Scoped per build",
    timelineStyle: "research",
    borderColor: "border-blue-500/15",
    hoverBorderColor: "hover:border-blue-500/25",
    iconColor: "text-blue-400",
    proof:
      "Best fit: reporting portals, management dashboards, data cleanup, activity logs and operational visibility.",
  },
  {
    id: "workflow-automation",
    phase: "03",
    icon: Workflow,
    title: "Workflow Automation and Integrations",
    description:
      "Automate handoffs, document intake, approvals, notifications and repeatable admin across your tools.",
    detailedExplanation:
      "Best for teams losing time to duplicate entry, manual status updates, document chasing or systems that do not talk to each other. We connect the right tools, automate the repeatable steps and keep humans in control where judgement is needed.",
    outcomes: [
      "Document intake, approvals, notifications and task routing",
      "Integrations with CRMs, finance tools, forms, email and storage",
      "n8n where it is practical and custom code where the workflow needs ownership",
      "Less manual chasing and fewer broken handoffs",
    ],
    timeline: "2-6 weeks or part of build",
    timelineStyle: "automation",
    borderColor: "border-purple-500/15",
    hoverBorderColor: "hover:border-purple-500/25",
    iconColor: "text-purple-400",
    proof:
      "Best fit: intake workflows, approval chains, CRM replacement, reporting automation and API sync.",
  },
  {
    id: "ai-capability",
    phase: "04",
    icon: Sparkles,
    title: "AI Capability and Team Enablement",
    description:
      "Controlled AI features inside real business systems, plus training so your team can use them safely.",
    detailedExplanation:
      "Best for companies that want AI connected to their own information, not a loose chatbot sitting outside the workflow. We add AI where it improves a real task, such as document review, extraction, search, triage, summaries, SOP checks or decision support.",
    outcomes: [
      "AI chat over approved business data",
      "Document extraction, review, triage, summaries and recommendations",
      "Safe access patterns, clear limits and human review where needed",
      "Team training focused on practical daily use",
    ],
    timeline: "Built into scope",
    timelineStyle: "strategic",
    borderColor: "border-orange-500/15",
    hoverBorderColor: "hover:border-orange-500/25",
    iconColor: "text-orange-400",
    proof:
      "Best fit: AI-assisted portals, SOP checks, document review, knowledge search and team training.",
  },
];

const methodologyData = {
  title: "How a custom build works",
  subtitle:
    "A focused process for turning a messy workflow into software your team can use.",
  phases: [
    {
      phase: "01",
      title: "Understand the workflow",
      description:
        "We map the current process, roles, data, pain points and where work gets stuck.",
    },
    {
      phase: "02",
      title: "Map roles, data and permissions",
      description:
        "We define who logs in, what they can see, what they can change and what needs to be tracked.",
    },
    {
      phase: "03",
      title: "Design the portal and database",
      description:
        "We shape the core screens, database structure, automation points and AI features before build starts.",
    },
    {
      phase: "04",
      title: "Build in focused milestones",
      description:
        "We ship working sections in practical milestones so feedback happens while the system is taking shape.",
    },
    {
      phase: "05",
      title: "Test, launch, train and hand over",
      description:
        "We test the workflow, deploy the system, train users and provide the documentation needed to run it.",
    },
  ],
};

const getTimelineBadgeStyle = (timelineStyle?: string) => {
  switch (timelineStyle) {
    case "training":
      return "bg-green-500/20 border-green-500/30 text-green-400";
    case "prototype":
      return "bg-purple-500/20 border-purple-500/30 text-purple-400";
    case "research":
      return "bg-emerald-500/20 border-emerald-500/30 text-emerald-400";
    case "development":
      return "bg-emerald-500/20 border-emerald-500/30 text-emerald-400";
    case "automation":
      return "bg-purple-500/20 border-purple-500/30 text-purple-400";
    case "strategic":
      return "bg-orange-500/20 border-orange-500/30 text-orange-400";
    case "portfolio":
      return "bg-orange-500/20 border-orange-500/30 text-orange-400";
    case "advisory":
      return "bg-blue-500/20 border-blue-500/30 text-blue-400";
    default:
      return "bg-blue-500/20 border-blue-500/30 text-blue-400";
  }
};

function InteractiveServiceShowcase() {
  const [activeService, setActiveService] = useState(0);

  // Handle URL hash navigation
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const serviceIndex = services.findIndex((service) => service.id === hash);
      if (serviceIndex !== -1) {
        setActiveService(serviceIndex);
        // Scroll to the service section
        setTimeout(() => {
          const element = document.getElementById("services-showcase");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    }
  }, []);

  // Ensure activeService is within bounds
  const safeIndex = Math.max(0, Math.min(activeService, services.length - 1));
  const currentService = services[safeIndex];

  if (!currentService) {
    return null; // Safety check
  }

  return (
    <section
      id="services-showcase"
      className="relative section-rhythm-lg overflow-hidden"
    >
      {/* Add invisible anchor elements for each service */}
      {services.map((service) => (
        <div key={service.id} id={service.id} className="absolute -top-20" />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black" />
      <div
        className="absolute -top-[10%] left-[-5%] w-[50vw] max-w-[520px] h-[40vh] max-h-[420px] rounded-full opacity-[0.08] dark:opacity-[0.12] blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.4), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-5%] right-[-5%] w-[45vw] max-w-[480px] h-[35vh] max-h-[380px] rounded-full opacity-[0.06] dark:opacity-[0.1] blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(16, 185, 129, 0.35), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight tracking-[-0.02em]">
            What We{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Build
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Four capabilities inside every custom software build: portals, data,
            automation, and AI where it helps.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mb-10 md:mb-14 px-0 md:px-4 max-w-5xl mx-auto items-stretch">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            const shortLabels: Record<string, string> = {
              "custom-portals": "Portals & Tools",
              "databases-dashboards": "Data & Reporting",
              "workflow-automation": "Automation",
              "ai-capability": "AI & Training",
            };
            return (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`
                  w-full h-full min-h-[44px] flex items-center justify-center text-center px-3 md:px-4 lg:px-4 py-2 md:py-3 lg:py-4 rounded-xl md:rounded-2xl transition-colors duration-200 backdrop-blur-xl border font-medium text-xs md:text-sm lg:text-base lg:leading-snug touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black
                  ${
                    activeService === index
                      ? "bg-blue-500/20 border-blue-500/40 text-gray-900 dark:text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                      : "bg-gray-900/[0.01] dark:bg-white/[0.01] border-gray-900/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/[0.02] dark:hover:bg-white/[0.02]"
                  }
                `}
              >
                <span className="flex items-center justify-center gap-2 lg:gap-2 w-full">
                  <ServiceIcon
                    className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors duration-300 ${activeService === index ? service.iconColor : "text-gray-500"}`}
                  />
                  <span className="hidden lg:inline line-clamp-2">
                    {service.title}
                  </span>
                  <span className="lg:hidden line-clamp-2">
                    {shortLabels[service.id] ?? service.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-3 md:gap-4">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gray-900/5 dark:bg-white/5 border ${currentService.borderColor} flex items-center justify-center backdrop-blur-sm`}
                  >
                    <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                      {currentService.phase}
                    </span>
                  </div>
                  {React.createElement(currentService.icon, {
                    className: `w-6 h-6 md:w-7 md:h-7 ${currentService.iconColor}`,
                  })}
                </div>

                <div className="space-y-5 md:space-y-6">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white leading-tight">
                    {currentService.title}
                  </h3>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {currentService.description}
                  </p>

                  <div className="space-y-3 md:space-y-4">
                    <h4 className="text-gray-900 dark:text-white font-semibold text-base md:text-lg">
                      Key Outcomes
                    </h4>
                    <ul className="space-y-2.5 md:space-y-3">
                      {currentService.outcomes.map((outcome, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-3 text-base md:text-lg text-gray-800 dark:text-gray-100"
                        >
                          <CheckCircle
                            className={`w-5 h-5 ${currentService.iconColor} flex-shrink-0 mt-0.5`}
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <details className="group mt-2">
                    <summary className="flex items-center justify-between cursor-pointer text-gray-900 dark:text-white font-medium text-base md:text-lg hover:text-blue-400 transition-all duration-300 list-none touch-manipulation">
                      <span>How This Works</span>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180 group-hover:text-blue-400" />
                    </summary>
                    <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                      {currentService.detailedExplanation}
                    </p>
                  </details>
                </div>
              </div>

              <div className="relative order-first lg:order-last">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 rounded-3xl blur-xl opacity-60" />

                <div
                  className={`
                  relative bg-gray-900/[0.03] dark:bg-white/[0.03] backdrop-blur-xl border ${currentService.borderColor} 
                  rounded-3xl p-5 md:p-10 lg:p-12 transition-colors duration-200
                  hover:bg-gray-900/[0.05] dark:hover:bg-white/[0.05] ${currentService.hoverBorderColor}
                  shadow-[0_20px_40px_rgba(0,0,0,0.25)]
                `}
                >
                  <div
                    className={`inline-flex px-4 py-2 rounded-xl border backdrop-blur-md font-medium text-sm md:text-base mb-6 ${getTimelineBadgeStyle(currentService.timelineStyle)}`}
                  >
                    {currentService.timeline}
                  </div>

                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-900/5 dark:bg-white/5 border ${currentService.borderColor} flex items-center justify-center mb-6 backdrop-blur-sm`}
                  >
                    {React.createElement(currentService.icon, {
                      className: `w-8 h-8 md:w-9 md:h-9 ${currentService.iconColor}`,
                    })}
                  </div>

                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                    {currentService.detailedExplanation}
                  </p>

                  <blockquote className="text-base md:text-lg text-gray-600 dark:text-gray-300 italic leading-relaxed border-l-4 border-blue-500/40 pl-4">
                    &ldquo;{currentService.proof}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 md:gap-6 mt-10 md:mt-12">
              <button
                type="button"
                onClick={() =>
                  setActiveService(
                    activeService > 0 ? activeService - 1 : services.length - 1,
                  )
                }
                className="p-3 md:p-4 rounded-full bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 hover:bg-gray-900/10 dark:hover:bg-white/10 hover:border-gray-900/20 dark:hover:border-white/20 transition-colors duration-200 backdrop-blur-xl touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
                aria-label="Previous service"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveService(
                    activeService < services.length - 1 ? activeService + 1 : 0,
                  )
                }
                className="p-3 md:p-4 rounded-full bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 hover:bg-gray-900/10 dark:hover:bg-white/10 hover:border-gray-900/20 dark:hover:border-white/20 transition-colors duration-200 backdrop-blur-xl touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
                aria-label="Next service"
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <PageWrapper>
      <ServiceHero {...heroData} />
      <InteractiveServiceShowcase />

      <section className="relative section-rhythm-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MethodologySection {...methodologyData} />
        </div>
      </section>

      <div className="section-rhythm-xl">
        <FAQSection
          title={SERVICES_FAQ_SECTION.title}
          subtitle={SERVICES_FAQ_SECTION.subtitle}
          faqs={SERVICES_FAQ_SECTION.faqs}
        />
      </div>
    </PageWrapper>
  );
}
