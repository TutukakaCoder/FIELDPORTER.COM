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
  FAQSection,
  type FAQSectionProps,
} from "@/components/services/faq-section";
import { MethodologySection } from "@/components/services/methodology-section";
import { ServiceHero } from "@/components/services/service-hero";

const heroData = {
  title: "Strategic Research & AI Implementation",
  subtitle: "Practical AI guidance for small and medium businesses",
  description:
    "We combine systematic research methodology with hands-on development. Building agents, knowledge bases and preparing business professionals with the modern tools to compete.",
  stats: [],
  ctaText: "Schedule Strategy Discussion",
  ctaHref: "/contact",
};

const services = [
  {
    id: "strategic-research",
    phase: "01",
    icon: TrendingUp,
    title: "Strategic Research & Intelligence",
    description:
      "Deep research that cuts through the noise to deliver actionable insights for strategic decisions.",
    detailedExplanation:
      "We combine AI models like Claude and Perplexity with human insight to deliver research in hours, not weeks. Our process involves contextualising your challenge, parallel AI analysis across multiple sources, synthesis of findings, and delivery of decision-ready documentation. From market entry analysis to competitor intelligence, we handle complex research requirements with speed and accuracy.",
    outcomes: [
      "Decision-relevant insights delivered 5-10x faster than traditional research",
      "Multi-source analysis reducing information gaps and blind spots",
      "Clear recommendations with confidence levels and risk assessments",
      "Comprehensive documentation ready for strategic implementation",
    ],
    investment: "$500-$3,000",
    timeline: "3-5 days",
    timelineStyle: "research",
    borderColor: "border-emerald-500/15",
    hoverBorderColor: "hover:border-emerald-500/25",
    iconColor: "text-emerald-400",
    proof:
      "From 6-week market analysis to 3-day strategic brief with 40+ actionable insights.",
  },
  {
    id: "rapid-development",
    phase: "02",
    icon: Code,
    title: "Rapid AI Development & Prototyping",
    description: "Proof-of-concept to production-ready in weeks, not months.",
    detailedExplanation:
      "We specialise in AI feature prototyping and integration roadmaps. Our sweet spot is proving AI concepts work for your specific use case in 1-3 weeks, then providing clear documentation for your team to implement at scale. From chat systems to workflow automation, we build working prototypes that demonstrate real value before major investment.",
    outcomes: [
      "Working prototypes proving technical feasibility within 1-3 weeks",
      "Clear implementation roadmaps for scaling with your existing team",
      "Technical documentation enabling seamless handoff",
      "Risk-free validation before larger development commitments",
    ],
    investment: "$3,000-$8,000",
    timeline: "1-3 weeks",
    timelineStyle: "development",
    borderColor: "border-blue-500/15",
    hoverBorderColor: "hover:border-blue-500/25",
    iconColor: "text-blue-400",
    proof:
      "From manual 15-hour process to 4-hour automated workflow through prototype validation.",
  },
  {
    id: "workflow-optimisation",
    phase: "03",
    icon: Building2,
    title: "Process Efficiency & Workflow Optimisation",
    description:
      "Systematic identification and automation of repetitive tasks to reclaim time for strategic work.",
    detailedExplanation:
      "We analyse your current workflows to identify automation opportunities, then build solutions that integrate seamlessly with your existing tools. Our approach focuses on high-impact, low-risk improvements that deliver measurable time savings within weeks. From lead generation systems to reporting automation, we optimise processes that actually matter to your business outcomes.",
    outcomes: [
      "Documented workflow analysis with specific optimisation recommendations",
      "Automated systems reducing manual work by 60-80% in targeted areas",
      "Lead generation and outreach system optimisation",
      "Integration with your existing tools and platforms for minimal disruption",
    ],
    investment: "$2,000-$5,000",
    timeline: "2-4 weeks",
    timelineStyle: "automation",
    borderColor: "border-purple-500/15",
    hoverBorderColor: "hover:border-purple-500/25",
    iconColor: "text-purple-400",
    proof:
      "Client saved 15+ hours weekly through strategic workflow optimisation.",
  },
  {
    id: "ai-strategy",
    phase: "04",
    icon: BookOpen,
    title: "AI Strategy & Team Capability Building",
    description:
      "Strategic guidance on AI adoption with hands-on training for your team.",
    detailedExplanation:
      "Beyond just tools and tactics, we help you develop a strategic approach to AI that aligns with your business objectives. This includes capability assessment, tool selection and optimisation for your workflows, team training sessions, and ongoing strategic guidance. We focus on building internal AI capability rather than creating dependency.",
    outcomes: [
      "Strategic AI adoption roadmap tailored to your business context",
      "Team training on AI tools and best practices for your industry",
      "AI tool selection and optimisation for your workflows",
      "Internal capability building reducing reliance on external AI consultants",
    ],
    investment: "$75-$150 per hour",
    timeline: "Custom sessions",
    timelineStyle: "strategic",
    borderColor: "border-orange-500/15",
    hoverBorderColor: "hover:border-orange-500/25",
    iconColor: "text-orange-400",
    proof:
      "Organisations report 3-5x improvement in AI tool effectiveness after strategic guidance.",
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
    "Understanding how we work with small and medium businesses on AI implementation.",
  faqs: [
    {
      question:
        "Do you build complete production systems or just AI prototypes?",
      answer:
        "We specialize in AI feature prototyping and integration roadmaps. Our sweet spot is proving AI concepts work for your specific use case in 1-3 weeks, then providing clear documentation for your team to implement. Think of us as your AI R&D department.",
    },
    {
      question: "How quickly can you prototype and deliver AI functionality?",
      answer:
        "Most AI prototypes are delivered within 1-3 weeks. Week 1: We understand your process. Week 2: AI agents are trained and tested. Week 3: Working prototype with integration documentation. Faster than hiring, more focused than consultants.",
    },
    {
      question: "What happens after you deliver the AI prototype?",
      answer:
        "You get: 1) Working prototype code, 2) Integration documentation, 3) Training for your team, 4) 30-day support for questions. Most clients either implement themselves or use our integration roadmap with their existing developers.",
    },
    {
      question:
        "How do you help us integrate AI into our existing application?",
      answer:
        "We create working prototypes with clear API documentation. Your developers get commented code, integration guides, and implementation roadmaps. We show exactly how to connect AI features to your existing systems.",
    },
    {
      question: "What if we need ongoing development beyond the AI features?",
      answer:
        "We focus on AI innovation, not long-term development. After delivering prototypes and training, most clients either implement themselves or work with their existing dev teams. We are happy to recommend trusted partners for ongoing development.",
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
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
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
                  px-3 md:px-4 lg:px-8 py-2 md:py-3 lg:py-4 rounded-xl md:rounded-2xl transition-all duration-500 backdrop-blur-xl border font-medium text-xs md:text-sm lg:text-lg hover:scale-105 transform will-change-transform touch-manipulation
                  ${
                    activeService === index
                      ? "bg-blue-500/20 border-blue-500/40 text-gray-900 dark:text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                      : "bg-gray-900/[0.01] dark:bg-white/[0.01] border-gray-900/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/[0.02] dark:hover:bg-white/[0.02]"
                  }
                `}
              >
                <span className="flex items-center gap-1 md:gap-2 lg:gap-3">
                  <ServiceIcon
                    className={`w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 ${activeService === index ? service.iconColor : "text-gray-500"}`}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
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
                    <summary className="flex items-center justify-between cursor-pointer text-gray-900 dark:text-white font-medium text-base md:text-lg hover:text-blue-400 transition-colors duration-200 list-none touch-manipulation">
                      <span>How This Works</span>
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-open:rotate-180" />
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
                  rounded-3xl p-8 md:p-12 lg:p-16 xl:p-20 transition-all duration-700
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
                      className: `w-8 h-8 md:w-12 md:h-12 ${currentService.iconColor}`,
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
                onClick={() =>
                  setActiveService(
                    activeService > 0 ? activeService - 1 : services.length - 1,
                  )
                }
                className="p-3 md:p-4 rounded-full bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 hover:bg-gray-900/10 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-xl touch-manipulation"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
              </button>
              <button
                onClick={() =>
                  setActiveService(
                    activeService < services.length - 1 ? activeService + 1 : 0,
                  )
                }
                className="p-3 md:p-4 rounded-full bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 hover:bg-gray-900/10 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-xl touch-manipulation"
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

      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MethodologySection {...methodologyData} />
        </div>
      </section>

      <div className="py-24 md:py-32 lg:py-40">
        <FAQSection {...faqData} />
      </div>
    </PageWrapper>
  );
}
