"use client";

import { PageWrapper } from "@/components/layout";
import { useHorizontalSwipe } from "@/hooks";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Brain,
  Building2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  ExternalLink,
  Globe,
  Star,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import React, { useRef, useState } from "react";

// TypeScript interfaces
interface ProjectMetric {
  label: string;
  icon: any;
}

interface ProjectTestimonial {
  quote: string;
  author: string;
  rating: number;
}

interface Project {
  title: string;
  status: string;
  category: string;
  description: string;
  metrics?: ProjectMetric[];
  techStack?: string;
  testimonial?: ProjectTestimonial;
  outcome?: string;
  vision?: string;
  approach?: string;
  philosophy?: string;
  deliverables?: string[];
  scope?: string;
}

interface PortfolioSection {
  id: string;
  title: string;
  icon: any;
  iconColor: string;
  borderColor: string;
  hoverBorderColor: string;
  timelineStyle: string;
  projects: Project[];
}

// Portfolio project data with real content
const portfolioSections: PortfolioSection[] = [
  {
    id: "client-platforms",
    title: "Client Platforms",
    icon: Building2,
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/15",
    hoverBorderColor: "hover:border-blue-500/25",
    timelineStyle: "live",
    projects: [
      {
        title: "Self-Development Platform",
        status: "LIVE • 8 MONTHS",
        category: "Production System",
        description:
          "We transformed a leadership coach's manual processes into an automated platform serving 1,000+ daily interactions. The system handles complex timezone logic, subscription management, and delivers bi-weekly feature updates based on actual user needs.",
        metrics: [
          { label: "100% uptime across 8 months", icon: CheckCircle },
          { label: "15 hours saved weekly through automation", icon: Clock },
          {
            label: "Global user base with seamless timezone handling",
            icon: Globe,
          },
        ],
        techStack: "React • Firebase • Complex Timezone Logic",
        testimonial: {
          quote:
            "After nine months with another developer who couldn't deliver, FIELDPORTER rebuilt our entire platform from scratch. Their work is exceptional delivered on time, beautifully crafted, and at a fair price. You're partnering with a team that genuinely cares about your success.",
          author: "Steve, Leadership Development Coach",
          rating: 5,
        },
      },
    ],
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    icon: Brain,
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/15",
    hoverBorderColor: "hover:border-purple-500/25",
    timelineStyle: "delivered",
    projects: [
      {
        title: "VOYCAP Investment News Feed",
        status: "PROTOTYPES DELIVERED",
        category: "Content Intelligence",
        description:
          "VOYCAP needed reliable content and working images. We delivered three approaches using G-News and EODHD API, achieving 85% image success (up from 30%). Each prototype handles different data sources and image fallback strategies.",
        metrics: [
          {
            label: "Image display success: 85% vs 30% before",
            icon: TrendingUp,
          },
          { label: "Three working prototypes delivered", icon: Code2 },
          { label: "AI summarization with cost optimization", icon: Brain },
        ],
        techStack:
          "G-News API • EODHD Financial Data • Multi-Source Aggregation",
      },
      {
        title: "Email Classifier and Responder System",
        status: "PROTOTYPE COMPLETE",
        category: "AI System",
        description:
          "Built for VC firm to automate email triage and response. AI prototype classifies emails with 85% accuracy and generates contextual responses, cutting manual review time by 70%.",
        metrics: [
          { label: "85% email classification accuracy", icon: Target },
          { label: "70% reduction in manual review time", icon: Zap },
          {
            label: "Automated routing of investment inquiries",
            icon: CheckCircle,
          },
        ],
        techStack: "React/TypeScript • Firebase • DeepSeek AI",
      },
    ],
  },
  {
    id: "strategic-research",
    title: "Strategic Research",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/15",
    hoverBorderColor: "hover:border-emerald-500/25",
    timelineStyle: "research",
    projects: [
      {
        title: "Sir the Label: US Market Entry Analysis",
        status: "COMPLETED",
        category: "Market Intelligence",
        description:
          "Comprehensive supply chain and market positioning research for Australian fashion brand expanding to America. Analyzed distribution channels, competitive landscape, pricing strategies, and regulatory requirements for textile imports.",
        deliverables: [
          "Complete US market assessment and competitive analysis",
          "Supply chain optimization recommendations",
          "Distribution channel strategy and partner identification",
          "Pricing framework adapted for American market dynamics",
        ],
      },
      {
        title: "Australian VC Firm: Portfolio Validation Framework",
        status: "COMPLETED",
        category: "Investment Intelligence",
        description:
          "Developed systematic methodology for evaluating potential investments. Created repeatable frameworks for assessing founder capability and market opportunity.",
        deliverables: [
          "Founder assessment criteria and scoring methodology",
          "Market opportunity evaluation framework",
          "Due diligence process optimization",
          "Portfolio risk assessment templates",
        ],
      },
      {
        title: "Multiple Strategic Engagements",
        status: "ONGOING",
        category: "Business Intelligence",
        description:
          "From competitor analysis to market sizing, we combine AI tools with business acumen to deliver actionable intelligence across diverse industries and markets.",
        scope: "Cross-industry strategic research and competitive intelligence",
      },
    ],
  },
  {
    id: "in-house-ventures",
    title: "In-House Ventures",
    icon: Building2,
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/15",
    hoverBorderColor: "hover:border-yellow-500/25",
    timelineStyle: "development",
    projects: [
      {
        title: "Family Care Platform",
        status: "ACTIVE DEVELOPMENT",
        category: "Flagship Product",
        description:
          "Making AI technology accessible for elderly care. Simple, privacy-focused platform in early development.",
        vision:
          "Bringing advanced technology to families who need it most, without the complexity.",
        techStack: "Privacy-First AI • Simple Interface Design",
      },
      {
        title: "MORE IN-HOUSE VENTURES COMING!",
        status: "CONCEPT PHASE",
        category: "Product Development",
        description:
          "Multiple new concepts in development. Each internal project teaches us something valuable for client work.",
        philosophy:
          "Every internal project teaches us something that benefits client work",
      },
    ],
  },
];

// Status badge styling
const getTimelineBadgeStyle = (timelineStyle?: string) => {
  switch (timelineStyle) {
    case "live":
      return "bg-green-500/20 border-green-500/30 text-green-400";
    case "delivered":
      return "bg-blue-500/20 border-blue-500/30 text-blue-400";
    case "research":
      return "bg-emerald-500/20 border-emerald-500/30 text-emerald-400";
    case "development":
      return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
    default:
      return "bg-gray-500/20 border-gray-500/30 text-gray-400";
  }
};

// Premium Aurora Background matching services
function PremiumAuroraBackground() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [0.6, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ opacity, scale, willChange: "transform" }}
    >
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          type: "tween",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-500/15 via-purple-400/8 to-transparent rounded-full blur-3xl"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          type: "tween",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-t from-emerald-500/10 via-emerald-300/5 to-transparent rounded-full blur-3xl"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
          type: "tween",
        }}
      />
    </motion.div>
  );
}

// Portfolio Hero Section with Subtle 3D Constellation Background
function PortfolioHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Premium Aurora Background */}
      <div className="absolute inset-0 z-0">
        <PremiumAuroraBackground />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl backdrop-blur-xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.015] dark:bg-white/[0.015]">
              <Code2 className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white leading-tight tracking-[-0.02em]">
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                FIELDPORTER
              </span>{" "}
              - Building Tomorrow's AI Systems{" "}
              <span className="font-semibold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Today
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              A collection of real client work and internal ventures. Every
              project represents hands-on experience we bring to advising your
              business challenges.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Interactive Portfolio Slideshow
function InteractivePortfolioShowcase() {
  const [activeSection, setActiveSection] = useState(0);

  const safeIndex = Math.max(
    0,
    Math.min(activeSection, portfolioSections.length - 1),
  );
  const currentSection = portfolioSections[safeIndex];

  // Navigation functions for swipe support
  const goToPrevious = () => {
    setActiveSection((prev) =>
      prev > 0 ? prev - 1 : portfolioSections.length - 1,
    );
  };

  const goToNext = () => {
    setActiveSection((prev) =>
      prev < portfolioSections.length - 1 ? prev + 1 : 0,
    );
  };

  // Add swipe gesture support
  const swipeHandlers = useHorizontalSwipe(goToPrevious, goToNext);

  if (!currentSection) {
    return null;
  }

  return (
    <section className="relative py-32 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-3 md:gap-6 mb-20 md:mb-24 lg:mb-32 flex-wrap px-4">
          {portfolioSections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <button
                key={section.id}
                data-section-id={section.id}
                onClick={() => setActiveSection(index)}
                className={`
                  px-4 md:px-8 py-3 md:py-4 rounded-2xl transition-all duration-500 backdrop-blur-xl border font-medium text-sm md:text-lg hover:scale-105 transform will-change-transform touch-manipulation
                  ${
                    activeSection === index
                      ? `bg-gray-900/[0.08] dark:bg-white/[0.08] ${section.borderColor.replace("/15", "/40")} text-gray-900 dark:text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]`
                      : "bg-gray-900/[0.01] dark:bg-white/[0.01] border-gray-900/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/[0.02] dark:hover:bg-white/[0.02]"
                  }
                `}
              >
                <span className="flex items-center gap-2 md:gap-3">
                  <SectionIcon
                    className={`w-4 h-4 md:w-5 md:h-5 ${activeSection === index ? section.iconColor : "text-gray-500"}`}
                  />
                  <span className="hidden sm:inline">{section.title}</span>
                  <span className="sm:hidden">
                    {section.title.split(" ")[0]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Slideshow Content with Swipe Support */}
        <div {...swipeHandlers} className="select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              {/* Desktop Navigation Buttons */}
              <div className="hidden lg:flex absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
                <button
                  onClick={goToPrevious}
                  className="w-12 h-12 rounded-2xl bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 backdrop-blur-lg hover:bg-gray-900/15 dark:hover:bg-white/15 transition-all duration-500 flex items-center justify-center group hover:scale-105"
                  aria-label="Previous section"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-blue-300 transition-colors duration-500" />
                </button>
              </div>

              <div className="hidden lg:flex absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
                <button
                  onClick={goToNext}
                  className="w-12 h-12 rounded-2xl bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 backdrop-blur-lg hover:bg-gray-900/15 dark:hover:bg-white/15 transition-all duration-500 flex items-center justify-center group hover:scale-105"
                  aria-label="Next section"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-blue-300 transition-colors duration-500" />
                </button>
              </div>
              {/* Section Header */}
              <div className="text-center mb-16 md:mb-20">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gray-900/5 dark:bg-white/5 border ${currentSection.borderColor} flex items-center justify-center backdrop-blur-sm`}
                  >
                    {React.createElement(currentSection.icon, {
                      className: `w-8 h-8 ${currentSection.iconColor}`,
                    })}
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 leading-tight tracking-[-0.02em]">
                  {currentSection.id === "client-platforms" &&
                    "Production Systems with Real Impact"}
                  {currentSection.id === "ai-automation" &&
                    "Intelligence Systems That Scale"}
                  {currentSection.id === "strategic-research" &&
                    "Deep Intelligence for Critical Decisions"}
                  {currentSection.id === "in-house-ventures" &&
                    "Products We're Building"}
                </h2>
              </div>

              {/* Projects Grid */}
              <div className="space-y-12 md:space-y-16">
                {currentSection.projects.map((project, projectIndex) => (
                  <motion.div
                    key={projectIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: projectIndex * 0.1 }}
                    className="relative"
                  >
                    <div
                      className={`grid gap-8 md:gap-12 lg:gap-16 items-start ${project.testimonial ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-4xl mx-auto"}`}
                    >
                      {/* Content Side */}
                      <div className="space-y-6 md:space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <span>{project.category}</span>
                            <span>•</span>
                            <span
                              className={`px-3 py-1 rounded-xl border backdrop-blur-md font-medium ${getTimelineBadgeStyle(currentSection.timelineStyle)}`}
                            >
                              {project.status}
                            </span>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white leading-tight">
                            {project.title}
                          </h3>

                          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Vision Section */}
                        {project.vision && (
                          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
                            <h4 className="text-lg font-medium text-yellow-300 mb-3">
                              Vision
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {project.vision}
                            </p>
                            {project.approach && (
                              <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 italic">
                                Approach: {project.approach}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Philosophy */}
                        {project.philosophy && (
                          <div className="bg-gray-900/[0.02] dark:bg-white/[0.02] border border-gray-900/10 dark:border-white/10 rounded-2xl p-6">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                              "{project.philosophy}"
                            </p>
                          </div>
                        )}

                        {/* Deliverables */}
                        {project.deliverables && (
                          <div className="space-y-4">
                            <h4 className="text-gray-900 dark:text-white font-semibold text-lg">
                              Key Deliverables:
                            </h4>
                            <ul className="space-y-3">
                              {project.deliverables.map((deliverable, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                                >
                                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span>{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Metrics */}
                        {project.metrics && (
                          <div className="space-y-4">
                            <h4 className="text-gray-900 dark:text-white font-semibold text-lg">
                              Impact Metrics:
                            </h4>
                            <div className="space-y-3">
                              {project.metrics.map((metric, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                                >
                                  {React.createElement(metric.icon, {
                                    className: `w-5 h-5 ${currentSection.iconColor} flex-shrink-0 mt-0.5`,
                                  })}
                                  <span>{metric.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech Stack */}
                        {project.techStack && (
                          <div className="bg-gray-100/50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-300/30 dark:border-gray-700/30">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              Technical Stack
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">
                              {project.techStack}
                            </div>
                          </div>
                        )}

                        {/* Outcome */}
                        {project.outcome && (
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                            <div className="text-blue-300 font-medium">
                              {project.outcome}
                            </div>
                          </div>
                        )}

                        {/* Scope */}
                        {project.scope && (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                            <div className="text-emerald-300">
                              {project.scope}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Testimonial Side (only show for projects that have one) */}
                      {project.testimonial && (
                        <div className="relative order-first lg:order-last">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 rounded-3xl blur-xl opacity-60" />

                            <div className="relative bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-gray-900/10 dark:border-white/10 rounded-3xl p-8 md:p-12">
                              <div className="flex items-start gap-4">
                                <div className="text-blue-400 text-4xl leading-none">
                                  "
                                </div>
                                <div className="flex-1">
                                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 italic text-lg">
                                    {project.testimonial.quote}
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                      {[
                                        ...Array(project.testimonial.rating),
                                      ].map((_, i) => (
                                        <Star
                                          key={i}
                                          className="w-4 h-4 text-yellow-400 fill-current"
                                        />
                                      ))}
                                    </div>
                                    <span className="text-gray-900 dark:text-white font-medium">
                                      — {project.testimonial.author}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Portfolio CTA Section
function PortfolioCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white leading-tight tracking-[-0.02em]">
            From Concept to Revenue
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Whether you need strategic guidance, AI implementation advice, or
            help building prototypes, we bring hands-on experience to your
            business challenges. No theory. Just practical solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <motion.a
              href="/contact"
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/30 backdrop-blur-xl border border-blue-500/20"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="/services"
              className="group inline-flex items-center gap-4 bg-gray-900/[0.03] dark:bg-white/[0.03] border border-gray-900/20 dark:border-white/20 hover:bg-gray-900/[0.08] dark:hover:bg-white/[0.08] hover:border-gray-900/30 dark:hover:border-white/30 text-gray-900 dark:text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-500 hover:shadow-xl backdrop-blur-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn Our Approach
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <PageWrapper>
      <PremiumAuroraBackground />

      <div className="relative z-10 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black min-h-screen">
        <PortfolioHero />
        <InteractivePortfolioShowcase />
        <PortfolioCTA />
      </div>
    </PageWrapper>
  );
}
