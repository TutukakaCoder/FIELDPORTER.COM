"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle,
  ChevronDown,
  Code,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { PageWrapper } from "@/components/layout";
import {
  BRAND,
  CORE_OFFER_HIERARCHY,
  PRIMARY_AUDIENCE,
} from "@/config/constants";
import {
  FAQSection,
  type FAQSectionProps,
} from "@/components/services/faq-section";
import { MethodologySection } from "@/components/services/methodology-section";
import { ServiceHero } from "@/components/services/service-hero";

const heroData = {
  title: CORE_OFFER_HIERARCHY.primary,
  subtitle: `For ${PRIMARY_AUDIENCE.short}`,
  description:
    "We build and deploy practical AI systems and automations that remove manual work and speed up decisions. Research supports the decisions; implementation delivers the results.",
  stats: [],
  ctaText: "Book a Call",
  ctaHref: "/contact",
};

const services = [
  {
    id: "strategic-research",
    phase: "01",
    icon: TrendingUp,
    title: "Strategic Research & Intelligence",
    description:
      "For leaders deciding where to invest: a written brief with clear recommendations, risk levels, and next steps in 2–5 days.",
    detailedExplanation:
      "Best for: leadership about to commit capital to a new market, product, or partnership and who need a fast, evidence-based view before committing. We deliver: a single strategic brief (PDF or Notion) with validated answers to your key question (e.g. market viability, competitor moves, hidden risks), confidence levels, and concrete next steps. At the end you get the document, a short walkthrough, and optional follow-up for one round of questions.",
    outcomes: [
      "One decision-ready brief with recommendations and confidence levels",
      "Answers to your specific question in 2–5 days",
      "Clear next steps so you can act or kill the idea with evidence",
      "Handoff call plus one round of follow-up questions included",
    ],
    investment: "$500-$3,000",
    timeline: "2-5 days",
    timelineStyle: "research",
    borderColor: "border-emerald-500/15",
    hoverBorderColor: "hover:border-emerald-500/25",
    iconColor: "text-emerald-400",
    proof:
      "Strategic research: 6-week market analysis condensed into a 3-day brief with 40+ actionable insights and clear go/no-go recommendation.",
  },
  {
    id: "rapid-development",
    phase: "02",
    icon: Code,
    title: "Rapid AI Development & Integration",
    description:
      "For teams with a defined use case: a working AI system, integration docs, and handover in 1–3 weeks so you can scale or hand to your devs.",
    detailedExplanation:
      "Best for: operators or product leads who have a specific AI use case (e.g. internal chatbot, document processing, workflow automation) and need a working proof that can go to production. We deliver: a built and tested system, source code, API or integration documentation, and a handover session. At the end you own the code and can run it yourself or pass it to your developers; we do not lock you into ongoing dev retainers.",
    outcomes: [
      "Working AI system delivered in 1–3 weeks, ready to run or extend",
      "Source code, integration docs, and one handover session",
      "You keep full ownership; no mandatory ongoing engagement",
      "Option to scale in-house or with your existing dev team",
    ],
    investment: "$3,000-$8,000",
    timeline: "1-3 weeks",
    timelineStyle: "development",
    borderColor: "border-blue-500/15",
    hoverBorderColor: "hover:border-blue-500/25",
    iconColor: "text-blue-400",
    proof:
      "Rapid development: manual 15-hour weekly process replaced by a 4-hour automated workflow with production-ready system and handover docs.",
  },
  {
    id: "workflow-optimization",
    phase: "03",
    icon: Building2,
    title: "Process Efficiency & Workflow Optimization",
    description:
      "For teams drowning in repeatable tasks: we identify and automate high-impact workflows and hand you a runnable system plus documentation.",
    detailedExplanation:
      "Best for: small teams or operators where the same manual process (e.g. lead triage, reporting, data entry) eats 10+ hours a week. We deliver: a scoped automation plan, the built automation (integrated with your tools where possible), runbooks, and a handover so your team can maintain it. At the end you have a live system, docs, and optional short support window—no long-term dependency.",
    outcomes: [
      "Scoped automation plan plus built solution for agreed workflows",
      "Integration with your existing tools and clear runbooks",
      "Handover and optional support window; you run it after that",
      "Focus on one or two high-impact flows, not everything at once",
    ],
    investment: "$2,000-$5,000",
    timeline: "2-4 weeks",
    timelineStyle: "automation",
    borderColor: "border-purple-500/15",
    hoverBorderColor: "hover:border-purple-500/25",
    iconColor: "text-purple-400",
    proof:
      "Workflow optimization: recurring manual process (15+ hrs/week) automated and handed over with runbooks; team runs it in-house.",
  },
  {
    id: "ai-strategy",
    phase: "04",
    icon: BookOpen,
    title: "AI Strategy & Team Capability Building",
    description:
      "For leaders who want their team using AI safely and effectively: assessment, tailored training, and a short roadmap—no long-term consulting lock-in.",
    detailedExplanation:
      "Best for: founders or ops leads who want to raise team AI literacy and align tool use with business goals without hiring a permanent AI team. We deliver: a lightweight capability assessment, tailored training sessions (tools and workflows that fit your context), and a short roadmap. At the end you get the assessment summary, training materials, and optional follow-up sessions—we build your internal capability, not ongoing dependency.",
    outcomes: [
      "Capability assessment summary and a short, actionable roadmap",
      "Tailored training sessions for your team and tools",
      "Materials and guidance so you can iterate without us",
      "Optional follow-up sessions; no required retainer",
    ],
    investment: "$75-$150 per hour",
    timeline: "Custom sessions",
    timelineStyle: "strategic",
    borderColor: "border-orange-500/15",
    hoverBorderColor: "hover:border-orange-500/25",
    iconColor: "text-orange-400",
    proof:
      "AI strategy: team capability assessment plus tailored training; follow-up showed 3–5x improvement in effective use of existing AI tools.",
  },
];

const methodologyData = {
  title: "How Strategic Research Intelligence Works",
  subtitle:
    "Here's an example of our research process for the Strategic Research Intelligence service:",
  phases: [
    {
      phase: "01",
      title: "Foundation",
      description:
        "Gather all your business context - pitch decks, processes, investment memorandums, competitive landscape, strategic objectives.",
      deliverables: [
        "Complete business context mapping and documentation",
        "Strategic objectives analysis and priority framework",
        "Competitive landscape assessment and positioning analysis",
        "Investment memorandums and pitch deck strategic review",
        "Project knowledge base creation for AI-specific context",
      ],
      timeline: "Foundation Phase",
      timelineStyle: "research",
    },
    {
      phase: "02",
      title: "Deep Research",
      description:
        "Using Claude for contextual understanding, Gemini for deep analysis, DeepSeek for cost-effective bulk processing.",
      deliverables: [
        "Claude integration for contextual understanding and analysis",
        "Gemini deployment for comprehensive deep research processing",
        "DeepSeek utilization for cost-effective bulk data processing",
        "Specialized research tools and database integration",
        "Parallel source processing across thousands of information sources",
      ],
      timeline: "Research Phase",
      timelineStyle: "prototype",
    },
    {
      phase: "03",
      title: "Validation & Filtering",
      description:
        "Raw AI research produces massive information volumes. Systematically filter this down to useful intelligence.",
      deliverables: [
        "Systematic information filtering and relevance assessment",
        "Strategic decision framework application to research data",
        "Intelligence extraction from bulk research volumes",
        "Jargon elimination and clarity-focused content refinement",
        "Decision-relevant insight prioritization and organization",
      ],
      timeline: "Validation Phase",
      timelineStyle: "advisory",
    },
    {
      phase: "04",
      title: "Cross-Model Validation",
      description:
        "Run refined information through different AI models to catch inconsistencies and verify source quality.",
      deliverables: [
        "Cross-model validation for accuracy and consistency verification",
        "Source quality assessment and credibility weighting",
        "Academic research versus social media content differentiation",
        "Hallucination prevention through systematic verification processes",
        "Reliability framework application for business decision support",
      ],
      timeline: "Validation Phase",
      timelineStyle: "research",
    },
    {
      phase: "05",
      title: "Strategic Documentation",
      description:
        "Convert validated research into usable business documentation - strategic frameworks, competitive analysis, implementation roadmaps.",
      deliverables: [
        "Strategic frameworks and decision-making tools",
        "Competitive analysis with positioning insights",
        "Implementation roadmaps with clear next steps",
        "Business documentation designed for operational use",
        "Complete handoff materials and ongoing support guidance",
      ],
      timeline: "Delivery Phase",
      timelineStyle: "advisory",
    },
  ],
};

const faqData: FAQSectionProps = {
  title: "Common Questions",
  subtitle:
    "Understanding how we work with growing companies on AI implementation.",
  faqs: [
    {
      question:
        "Do you build complete production systems or just proof-of-concepts?",
      answer:
        "We build fully automated AI applications and production-ready integrations. Our focus is proving concepts work in 1-3 weeks with systems you can scale immediately. Think of us as your AI R&D team delivering working applications, not experiments.",
    },
    {
      question: "How quickly can you build and deliver AI functionality?",
      answer:
        "Most production systems are delivered within 1-3 weeks. Week 1: We understand your process. Week 2: AI agents are trained and tested. Week 3: Working system with integration documentation. Faster than hiring, more focused than consultants.",
    },
    {
      question: "What happens after you deliver the AI system?",
      answer:
        "You get: 1) Production-ready application code, 2) Integration documentation, 3) Training for your team, 4) 30-day support for questions. Most clients either implement themselves or use our integration roadmap with their existing developers.",
    },
    {
      question:
        "How do you help us integrate AI into our existing application?",
      answer:
        "We create production-ready systems with clear API documentation. Your developers get commented code, integration guides, and implementation roadmaps. We show exactly how to connect AI features to your existing systems.",
    },
    {
      question: "What if we need ongoing development beyond the AI features?",
      answer:
        "We focus on AI innovation, not long-term development. After delivering production systems and training, most clients either implement themselves or work with their existing dev teams. We are happy to recommend trusted partners for ongoing development.",
    },
    {
      question:
        "How do you choose which AI tools and approaches for our project?",
      answer:
        "We match tools to your specific needs. Claude for complex reasoning, GPT-4 for general tasks, DeepSeek for cost efficiency, open-source models for privacy. No vendor lock-in - we recommend what works best for you.",
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
            Four Things We{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Do
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            AI-powered solutions applied to specific business challenges with
            clear outcomes.
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

                  <div className="pt-6 md:pt-8 border-t border-gray-900/10 dark:border-white/10">
                    <div className="space-y-2 md:space-y-3">
                      <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
                        Investment:
                      </p>
                      <p
                        className={`text-xl md:text-2xl font-medium ${currentService.iconColor} hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.5)] transition-all duration-300`}
                      >
                        {currentService.investment}
                      </p>
                    </div>
                  </div>
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
