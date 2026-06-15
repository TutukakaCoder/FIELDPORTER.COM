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
import {
  FAQSection,
  type FAQSectionProps,
} from "@/components/services/faq-section";
import { MethodologySection } from "@/components/services/methodology-section";
import { ServiceHero } from "@/components/services/service-hero";

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

const faqData: FAQSectionProps = {
  title: "Common Questions",
  subtitle:
    "Practical answers about custom software, portals, and AI inside real workflows.",
  faqs: [
    {
      question: "Do you build complete systems or prototypes?",
      answer:
        "We build working custom software, not slide decks. For larger portals, we usually start with a focused version that solves the core workflow first, then improve it from real use.",
    },
    {
      question:
        "When is custom software better than HubSpot, Airtable, Monday or another SaaS tool?",
      answer:
        "Custom software makes sense when your workflow is specific, your users need different views, your data is scattered, or you are paying for large tools with features you do not use.",
    },
    {
      question: "How long does a portal or internal system take?",
      answer:
        "Focused custom software projects usually start around 8-10 weeks. Smaller automations can be faster. Larger portals with multiple user types, integrations or AI features need a scoped plan before timelines are promised.",
    },
    {
      question: "What does a typical 8-week build include?",
      answer:
        "Usually a focused portal or internal tool with authentication, role-based views, a custom database, core dashboards, key workflows, testing, deployment and handover documentation.",
    },
    {
      question: "Can you add AI to a portal safely?",
      answer:
        "Yes, when the data, permissions and workflow are clear. We use AI for specific jobs such as search, document extraction, summaries, triage, SOP checks and decision support, with human review where needed.",
    },
    {
      question: "Who owns the code and data after launch?",
      answer:
        "The goal is for you to own the system, data model and workflow logic. We document the build and avoid locking you into a tool stack you cannot understand or maintain.",
    },
    {
      question: "Can you train our team to use the system and AI features?",
      answer:
        "Yes. Training is part of making the system useful. We show your team how the workflow works, where AI should be trusted, where it should be checked, and how to use it day to day.",
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
    case "portfolio":
      return "bg-orange-500/20 border-orange-500/30 text-orange-400";
    case "advisory":
      return "bg-blue-500/20 border-blue-500/30 text-blue-400";
    default:
      return "bg-gray-500/20 border-gray-500/30 text-gray-400";
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
      className="relative section-rhythm-xl overflow-hidden"
    >
      {/* Add invisible anchor elements for each service */}
      {services.map((service) => (
        <div key={service.id} id={service.id} className="absolute -top-20" />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-32 lg:mb-40">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6 md:mb-8 lg:mb-12 leading-tight tracking-[-0.02em]">
            What We{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Build
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Four capabilities inside every custom software build: portals, data,
            automation, and AI where it helps.
          </p>
        </div>

        <div className="flex justify-center gap-2 md:gap-3 lg:gap-6 mb-16 md:mb-20 lg:mb-32 flex-wrap px-4">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`
                  min-h-[44px] px-4 md:px-4 lg:px-8 py-3 md:py-3 lg:py-4 rounded-xl md:rounded-2xl transition-colors duration-200 backdrop-blur-xl border font-medium text-xs md:text-sm lg:text-lg touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black
                  ${
                    activeService === index
                      ? "bg-blue-500/20 border-blue-500/40 text-gray-900 dark:text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                      : "bg-gray-900/[0.01] dark:bg-white/[0.01] border-gray-900/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/[0.02] dark:hover:bg-white/[0.02]"
                  }
                `}
              >
                <span className="flex items-center gap-1 md:gap-2 lg:gap-3">
                  <ServiceIcon
                    className={`w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors duration-300 ${activeService === index ? service.iconColor : "text-gray-500"}`}
                  />
                  <span className="hidden lg:inline">{service.title}</span>
                  <span className="hidden sm:inline lg:hidden">
                    {service.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <span className="sm:hidden">
                    {service.title.split(" ")[0]}
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
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 xl:gap-32 items-start lg:items-center">
              <div className="space-y-8 md:space-y-12">
                <div className="flex items-center gap-3 md:gap-4">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gray-900/5 dark:bg-white/5 border ${currentService.borderColor} flex items-center justify-center backdrop-blur-sm`}
                  >
                    <span className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {currentService.phase}
                    </span>
                  </div>
                  {React.createElement(currentService.icon, {
                    className: `w-6 h-6 md:w-8 md:h-8 ${currentService.iconColor}`,
                  })}
                </div>

                <div className="space-y-6 md:space-y-8">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white leading-tight">
                    {currentService.title}
                  </h3>

                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {currentService.description}
                  </p>

                  <details className="group mt-6 md:mt-8">
                    <summary className="flex items-center justify-between cursor-pointer text-gray-900 dark:text-white font-medium text-base md:text-lg hover:text-blue-400 transition-all duration-300 list-none touch-manipulation hover:pl-2">
                      <span>How This Works</span>
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-open:rotate-180 group-hover:text-blue-400" />
                    </summary>
                    <div className="mt-4 md:mt-6 space-y-4 md:space-y-6">
                      <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                        {currentService.detailedExplanation}
                      </p>

                      <div className="space-y-3 md:space-y-4">
                        <h4 className="text-gray-900 dark:text-white font-semibold text-lg md:text-xl">
                          Key Outcomes:
                        </h4>
                        <ul className="space-y-2 md:space-y-3">
                          {currentService.outcomes.map((outcome, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-3 md:space-x-4 text-base md:text-lg text-gray-800 dark:text-gray-100"
                            >
                              <CheckCircle
                                className={`w-5 h-5 md:w-6 md:h-6 ${currentService.iconColor} flex-shrink-0 mt-0.5 md:mt-1`}
                              />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              <div className="relative order-first lg:order-last">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 rounded-3xl blur-xl opacity-60" />

                <div
                  className={`
                  relative bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border ${currentService.borderColor} 
                  rounded-3xl p-8 md:p-12 lg:p-16 xl:p-20 transition-colors duration-200
                  hover:bg-gray-900/[0.04] dark:hover:bg-white/[0.04] ${currentService.hoverBorderColor}
                  shadow-[0_20px_40px_rgba(0,0,0,0.3)]
                `}
                >
                  <div
                    className={`inline-flex px-4 md:px-6 py-2 md:py-3 rounded-xl border backdrop-blur-md font-medium text-sm md:text-lg mb-6 md:mb-8 ${getTimelineBadgeStyle(currentService.timelineStyle)}`}
                  >
                    {currentService.timeline}
                  </div>

                  <div
                    className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gray-900/5 dark:bg-white/5 border ${currentService.borderColor} flex items-center justify-center mb-6 md:mb-8 backdrop-blur-sm`}
                  >
                    {React.createElement(currentService.icon, {
                      className: `w-8 h-8 md:w-12 md:h-12 ${currentService.iconColor} transition-transform duration-500 group-hover/card:scale-110`,
                    })}
                  </div>

                  <blockquote className="text-lg md:text-xl text-gray-600 dark:text-gray-300 italic leading-relaxed border-l-4 border-blue-500/30 pl-4 md:pl-6">
                    &ldquo;{currentService.proof}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 md:gap-6 mt-16">
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MethodologySection {...methodologyData} />
        </div>
      </section>

      <div className="section-rhythm-xl">
        <FAQSection {...faqData} />
      </div>
    </PageWrapper>
  );
}
