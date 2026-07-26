"use client";

import { PageWrapper } from "@/components/layout";
import { useHorizontalSwipe, usePortfolioMediaPreloader } from "@/hooks";
import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Brain,
  Building2,
  CheckCircle,
  ChevronDown,
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
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

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
  shortTitle?: string;
  status: string;
  shortStatus?: string;
  category: string;
  description: string;
  outcomeLine?: string;
  metrics?: ProjectMetric[];
  techStack?: string;
  testimonial?: ProjectTestimonial;
  outcome?: string;
  vision?: string;
  approach?: string;
  philosophy?: string;
  deliverables?: string[];
  scope?: string;
  capabilities?: string[];
  videoUrl?: string;
  ctaUrl?: string;
  applyUrl?: string;
  heroImage?: string;
  galleryImages?: string[];
  logoSrc?: string;
  statusStyle?: "live" | "uat" | "delivered" | "research" | "development";
}

interface PortfolioSection {
  id: string;
  title: string;
  shortLabel: string;
  group: "client" | "in-house";
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
    shortLabel: "Platforms",
    group: "client",
    icon: Building2,
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/15",
    hoverBorderColor: "hover:border-blue-500/25",
    timelineStyle: "live",
    projects: [
      {
        title: "VOLOCEAN Client and Investment Management Platform",
        shortTitle: "VOLOCEAN Platform",
        status: "LIVE • 9 MONTHS",
        shortStatus: "Live · 9 mo",
        category: "Client and Investment Management",
        outcomeLine:
          "Shared client and investor workspace, live about 9 months",
        description:
          "Live for about 9 months and still improving. A shared management platform where clients, investors, advisors, product managers, staff, and admins see the same picture and work from one place, instead of chasing updates across emails, decks, and notes.",
        applyUrl: "https://voluntas.web.app/apply?ref=FIELDPORTER",
        capabilities: [
          "One workspace for clients, investors, advisors, staff, and admins",
          "Client and investor profiles kept in sync for the whole team",
          "Portfolio pipeline and submission tracking",
          "Investor matching and research tools for the advisory team",
          "AI helpers for documents and day-to-day questions",
        ],
        metrics: [
          {
            label: "805 investors in the database",
            icon: Target,
          },
          {
            label:
              "One place for clients, investors, advisors, staff, and admins",
            icon: TrendingUp,
          },
          {
            label: "Live about 9 months, still iterating with the team",
            icon: CheckCircle,
          },
        ],
        techStack:
          "React 18 • TypeScript • Firebase • Google Gemini AI • Multi-tenant Architecture",
        heroImage: "/portfolio/volocean/dashboard-hero.png",
        videoUrl: "/videos/Voluntas-application-run-through.mp4",
        testimonial: {
          quote:
            "We wanted to create an AI platform to help run our advisory business, something that could manage clients, streamline admin and help automate our service delivery. Freddy took the time to really understand what we needed and delivered something right on the mark, fast, professional, and great to work with.",
          author: "Jason Holdsworth, Founding Partner - VOLOCEAN",
          rating: 5,
        },
      },
      {
        title: "GoGoProp Portal",
        shortTitle: "GoGoProp Portal",
        status: "IN DEVELOPMENT • CLIENT UAT",
        shortStatus: "Client UAT",
        statusStyle: "uat",
        category: "Full product build · Property finance",
        outcomeLine: "Lending portal in active client testing ahead of launch",
        description:
          "FIELDPORTER is building GoGoProp’s Phase 1 lending portal: a branded system for staff, borrowers, and brokers covering enquiry, decisions in principle, full application, and KYC. It replaces early CRM-based workflow with a purpose-built pipeline, deal tools, and client portal, currently in active client testing ahead of launch.",
        capabilities: [
          "Branded online enquiry and status tracking",
          "One portal for borrowers and introducers/brokers",
          "Staff deal pipeline and deal workspace",
          "Property data checks and valuation support",
          "Decision-in-principle (PDF) with staff control",
          "Full application documents and identity-check journey",
        ],
        techStack:
          "Next.js • React • TypeScript • Firebase • Transactional email • Property data and identity verification integrations",
        heroImage: "/portfolio/gogoprop/dashboard-hero.png",
        galleryImages: [
          "/portfolio/gogoprop/pipeline-list.png",
          "/portfolio/gogoprop/deal-workspace.png",
          "/portfolio/gogoprop/borrower-dashboard.png",
        ],
      },
      {
        title: "Self-Development Platform",
        shortTitle: "Self-Development",
        status: "LIVE • 12 MONTHS",
        shortStatus: "Live · 12 mo",
        category: "Production System",
        outcomeLine: "1,000+ daily interactions; ~15 hrs/week saved",
        description:
          "We transformed a leadership coach's manual processes into an automated platform serving 1,000+ daily interactions. The system handles complex timezone logic, subscription management, and delivers bi-weekly feature updates based on actual user needs.",
        metrics: [
          {
            label: "Running live for 12 months with steady reliability",
            icon: CheckCircle,
          },
          {
            label: "About 15 hours saved weekly for the coach (admin and scheduling)",
            icon: Clock,
          },
          {
            label:
              "1,000+ daily interactions; timezone logic handles global users",
            icon: Globe,
          },
        ],
        techStack: "React • Firebase • Complex Timezone Logic",
        testimonial: {
          quote:
            "After nine months with another developer who couldn't deliver, FIELDPORTER rebuilt our entire platform from scratch. Their work is exceptional, delivered on time, beautifully crafted, and at a fair price. You're partnering with a team that genuinely cares about your success.",
          author: "Steve, Leadership Development Coach",
          rating: 5,
        },
      },
    ],
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    shortLabel: "AI",
    group: "client",
    icon: Brain,
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/15",
    hoverBorderColor: "hover:border-purple-500/25",
    timelineStyle: "delivered",
    projects: [
      {
        title: "VOYCAP Investment News Feed",
        shortTitle: "VOYCAP News Feed",
        status: "PROTOTYPES DELIVERED",
        shortStatus: "Delivered",
        category: "Content Intelligence",
        outcomeLine: "Image success 85% vs 30% — three prototypes delivered",
        description:
          "VOYCAP needed reliable content and working images. We delivered three approaches using G-News and EODHD API, achieving 85% image success (up from 30%). Each prototype handles different data sources and image fallback strategies.",
        metrics: [
          {
            label:
              "Image display success: 85% vs 30% before (news feed context)",
            icon: TrendingUp,
          },
          {
            label:
              "Three working prototypes delivered for client to choose from",
            icon: Code2,
          },
          {
            label: "AI summarization with cost controls for production use",
            icon: Brain,
          },
        ],
        techStack:
          "G-News API • EODHD Financial Data • Multi-Source Aggregation",
      },
      {
        title: "Email Classifier and Responder System",
        shortTitle: "Email Classifier",
        status: "PROTOTYPE COMPLETE",
        shortStatus: "Complete",
        category: "AI System",
        outcomeLine: "85% accuracy; ~70% less manual email review time",
        description:
          "Built for a VC firm to automate email triage and response. AI prototype classifies inbound emails with 85% accuracy and drafts contextual replies; client reported ~70% less time spent on manual review.",
        metrics: [
          {
            label: "85% classification accuracy on investment-related inbound",
            icon: Target,
          },
          {
            label: "~70% reduction in manual review time (client feedback)",
            icon: Zap,
          },
          {
            label: "Investment inquiries routed automatically for follow-up",
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
    shortLabel: "Research",
    group: "client",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/15",
    hoverBorderColor: "hover:border-emerald-500/25",
    timelineStyle: "research",
    projects: [
      {
        title: "Sir the Label: US Market Entry Analysis",
        shortTitle: "Sir the Label US Entry",
        status: "COMPLETED",
        shortStatus: "Done",
        category: "Market Intelligence",
        outcomeLine: "US market & supply-chain research for fashion expansion",
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
        shortTitle: "VC Portfolio Framework",
        status: "COMPLETED",
        shortStatus: "Done",
        category: "Investment Intelligence",
        outcomeLine: "Repeatable founder & market evaluation methodology",
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
        title: "Strategic Research (Ongoing)",
        shortTitle: "Strategic Research",
        status: "ONGOING",
        shortStatus: "Ongoing",
        category: "Business Intelligence",
        outcomeLine: "Competitor analysis and due-diligence for defined briefs",
        description:
          "Competitor analysis, market sizing, and due-diligence support for investors and operators. We focus on sectors where we have depth: advisory and capital, consumer and retail, and operations-heavy businesses. Clear deliverables and recommendations.",
        scope:
          "Strategic research and competitive intelligence for defined briefs",
      },
    ],
  },
  {
    id: "in-house-ventures",
    title: "In-House Ventures",
    shortLabel: "Ventures",
    group: "in-house",
    icon: Building2,
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/15",
    hoverBorderColor: "hover:border-yellow-500/25",
    timelineStyle: "development",
    projects: [
      {
        title: "Family Care Platform",
        shortTitle: "Family Care",
        status: "ACTIVE DEVELOPMENT",
        shortStatus: "Building",
        category: "Flagship Product",
        outcomeLine: "Privacy-focused AI care platform in early development",
        description:
          "Making AI technology accessible for elderly care. Simple, privacy-focused platform in early development.",
        vision:
          "Bringing advanced technology to families who need it most, without the complexity.",
        techStack: "Privacy-First AI • Simple Interface Design",
      },
      {
        title: "Additional In-House Concepts",
        shortTitle: "In-House Concepts",
        status: "CONCEPT PHASE",
        shortStatus: "Concept",
        category: "Product Development",
        outcomeLine: "Internal builds that feed back into client delivery",
        description:
          "Other internal products in early concept stage. We build in-house so we stay close to real implementation; what we learn feeds back into client delivery.",
        philosophy: "We build for ourselves so we build better for you",
      },
    ],
  },
];

// Status badge styling
const getTimelineBadgeStyle = (timelineStyle?: string) => {
  switch (timelineStyle) {
    case "live":
      return "bg-green-500/20 border-green-500/30 text-green-400";
    case "uat":
      return "bg-amber-500/20 border-amber-500/30 text-amber-400";
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

function displayTitle(project: Project, mobile: boolean) {
  if (mobile && project.shortTitle) return project.shortTitle;
  return project.title;
}

function displayStatus(project: Project, mobile: boolean) {
  if (mobile && project.shortStatus) return project.shortStatus;
  return project.status;
}

// Simple hero background - static gradient blobs, no animation
function PortfolioHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-t from-emerald-500/8 to-transparent rounded-full blur-3xl" />
    </div>
  );
}

function PortfolioHero() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <PortfolioHeroBackground />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          <div className="flex justify-center">
            <div className="p-3 md:p-4 rounded-2xl backdrop-blur-xl border border-gray-900/10 bg-gray-900/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <Code2 className="w-8 h-8 md:w-12 md:h-12 text-blue-500 dark:text-blue-400" />
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-light text-gray-900 dark:text-white leading-tight">
              Portfolio
            </h1>
            <div className="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light">
              Real client work and internal ventures
            </div>
          </div>

          <div className="max-w-2xl mx-auto hidden sm:block">
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Client work and in-house builds: AI systems, workflow automation,
              and strategic research with clear outcomes.
            </p>
          </div>

          <div className="flex justify-center pt-4 md:pt-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PortfolioVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [preload, setPreload] = useState<"none" | "metadata">("none");

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPreload("metadata");
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black/50 rounded-2xl">
      <video
        ref={videoRef}
        controls
        loop
        playsInline
        preload={preload}
        className="w-full h-full block"
        style={{
          willChange: "auto",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

function ProjectMedia({
  project,
  imagePriority,
  compact,
}: {
  project: Project;
  imagePriority?: boolean;
  compact?: boolean;
}) {
  if (!project.testimonial && !project.videoUrl && !project.heroImage) {
    return null;
  }

  const frame = compact
    ? "relative border border-gray-900/10 dark:border-white/10 rounded-2xl overflow-hidden bg-gray-900/[0.02] dark:bg-white/[0.02]"
    : "relative border border-gray-900/10 dark:border-white/10 rounded-2xl md:rounded-3xl overflow-hidden bg-gray-900/[0.02] dark:bg-white/[0.02] backdrop-blur-xl transition-colors duration-200 hover:border-gray-900/20 dark:hover:border-white/20";

  const hasVisual = Boolean(project.heroImage || project.videoUrl);

  // Testimonial-only (desktop chrome; mobile collapses into details)
  if (!hasVisual) {
    if (compact) return null;

    return (
      <div className={`${frame} p-6 md:p-12`}>
        <div className="flex items-start gap-4">
          <div className="text-blue-400 text-4xl leading-none">&quot;</div>
          <div className="flex-1">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 italic text-base md:text-lg">
              {project.testimonial?.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(project.testimonial?.rating || 0)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-gray-900 dark:text-white font-medium">
                - {project.testimonial?.author}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${frame} ${project.heroImage ? (compact ? "p-0" : "p-0 md:p-4") : ""}`}
    >
      {project.heroImage && (
        <>
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/70 border border-white/5 rounded-2xl">
            <Image
              src={project.heroImage}
              alt={`${project.title} product interface`}
              fill
              className="object-contain object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={Boolean(imagePriority)}
            />
          </div>
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div
              className={`grid grid-cols-3 gap-1.5 md:gap-3 ${compact ? "mt-1.5 px-0" : "mt-2 md:mt-3"}`}
            >
              {project.galleryImages.map((src, idx) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] rounded-lg md:rounded-xl overflow-hidden bg-black/70 border border-white/5"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screen ${idx + 1}`}
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 1024px) 33vw, 160px"
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {project.videoUrl && (
        <div className={project.heroImage ? "mt-2 md:mt-3" : undefined}>
          <PortfolioVideo src={project.videoUrl} />
        </div>
      )}

      {project.testimonial && !compact && (
        <div className="hidden lg:block p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="text-blue-400 text-4xl leading-none">&quot;</div>
            <div className="flex-1">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 italic text-base">
                {project.testimonial.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(project.testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-900 dark:text-white font-medium">
                  - {project.testimonial.author}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectDetails({
  project,
  section,
}: {
  project: Project;
  section: PortfolioSection;
}) {
  return (
    <div className="space-y-5 md:space-y-8">
      <p className="max-w-3xl text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-7 md:leading-8">
        {project.description}
      </p>

      {project.applyUrl && (
        <p className="max-w-3xl text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-7 md:leading-8">
          If you&apos;d like to apply for capital raise or growth services,{" "}
          <a
            href={project.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-500 hover:text-blue-400 underline underline-offset-2"
          >
            apply here
          </a>
          .
        </p>
      )}

      {project.vision && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 md:p-6">
          <h4 className="text-base md:text-lg font-medium text-yellow-300 mb-2 md:mb-3">
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

      {project.philosophy && (
        <div className="bg-gray-900/[0.02] dark:bg-white/[0.02] border border-gray-900/10 dark:border-white/10 rounded-2xl p-4 md:p-6">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
            &quot;{project.philosophy}&quot;
          </p>
        </div>
      )}

      {project.capabilities && (
        <div className="space-y-3 md:space-y-4">
          <h4 className="text-gray-900 dark:text-white font-semibold text-base md:text-lg">
            Current Capabilities:
          </h4>
          <ul className="space-y-2.5 md:space-y-3 max-w-3xl">
            {project.capabilities.map((capability, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-gray-600 dark:text-gray-300 leading-7"
              >
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.deliverables && (
        <div className="space-y-3 md:space-y-4">
          <h4 className="text-gray-900 dark:text-white font-semibold text-base md:text-lg">
            Key Deliverables:
          </h4>
          <ul className="space-y-2.5 md:space-y-3">
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

      {project.metrics && (
        <div className="space-y-3 md:space-y-4">
          <h4 className="text-gray-900 dark:text-white font-semibold text-base md:text-lg">
            Impact Metrics:
          </h4>
          <div className="space-y-2.5 md:space-y-3">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
              >
                {React.createElement(metric.icon, {
                  className: `w-5 h-5 ${section.iconColor} flex-shrink-0 mt-0.5`,
                })}
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.techStack && (
        <div className="bg-gray-100/50 dark:bg-gray-900/50 rounded-xl p-3 md:p-4 border border-gray-300/30 dark:border-gray-700/30">
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1.5 md:mb-2">
            Technical Stack
          </div>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            {project.techStack}
          </div>
        </div>
      )}

      {project.outcome && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
          <div className="text-blue-300 font-medium">{project.outcome}</div>
        </div>
      )}

      {project.scope && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
          <div className="text-emerald-300">{project.scope}</div>
        </div>
      )}

      {project.testimonial && (
        <div className="lg:hidden border border-gray-900/10 dark:border-white/10 rounded-2xl p-4">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3 italic text-sm">
            &quot;{project.testimonial.quote}&quot;
          </p>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(project.testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-sm text-gray-900 dark:text-white font-medium">
              - {project.testimonial.author}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  section,
  projectIndex,
  isExpanded,
  onToggle,
}: {
  project: Project;
  section: PortfolioSection;
  projectIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const hasMedia = Boolean(
    project.testimonial || project.videoUrl || project.heroImage,
  );
  const imagePriority =
    Boolean(project.heroImage) &&
    section.projects.findIndex((p) => Boolean(p.heroImage)) === projectIndex;
  const statusStyle = getTimelineBadgeStyle(
    project.statusStyle || section.timelineStyle,
  );
  const outcome =
    project.outcomeLine || project.outcome || project.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: projectIndex * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative group/project"
    >
      {/* Mobile accordion header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="lg:hidden w-full text-left rounded-2xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02] p-4 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {project.category}
              </span>
              <span
                className={`self-start px-2.5 py-1 rounded-lg border text-xs font-medium whitespace-nowrap ${statusStyle}`}
              >
                {displayStatus(project, true)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug truncate">
              {displayTitle(project, true)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
              {outcome}
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 flex-shrink-0 mt-1 text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Mobile expanded body */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="mobile-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              {(project.videoUrl || project.heroImage) && (
                <ProjectMedia
                  project={project}
                  imagePriority={imagePriority}
                  compact
                />
              )}
              <ProjectDetails project={project} section={section} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop layout — always expanded, two-column when media */}
      <div
        className={`hidden lg:grid gap-8 md:gap-12 lg:gap-16 items-start ${
          hasMedia ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-4xl mx-auto"
        }`}
      >
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <div className="flex flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{project.category}</span>
              <span>•</span>
              <span
                className={`px-3 py-1 rounded-xl border backdrop-blur-md font-medium whitespace-nowrap ${statusStyle}`}
              >
                {displayStatus(project, false)}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white leading-tight transition-colors duration-300 group-hover/project:text-blue-600 dark:group-hover/project:text-blue-400">
              {displayTitle(project, false)}
            </h3>

            <ProjectDetails project={project} section={section} />
          </div>
        </div>

        {hasMedia && (
          <div className="relative">
            <ProjectMedia
              project={project}
              imagePriority={imagePriority}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function InteractivePortfolioShowcase() {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const safeIndex = Math.max(
    0,
    Math.min(activeSection, portfolioSections.length - 1),
  );
  const currentSection = portfolioSections[safeIndex];

  // Collapse accordion when switching category
  useEffect(() => {
    setExpandedKey(null);
  }, [safeIndex]);

  const goToPrevious = () => {
    setDirection(-1);
    setActiveSection((prev) =>
      prev > 0 ? prev - 1 : portfolioSections.length - 1,
    );
  };

  const goToNext = () => {
    setDirection(1);
    setActiveSection((prev) =>
      prev < portfolioSections.length - 1 ? prev + 1 : 0,
    );
  };

  const swipeHandlers = useHorizontalSwipe(goToPrevious, goToNext);

  if (!currentSection) {
    return null;
  }

  const toggleProject = (projectIndex: number) => {
    const key = `${currentSection.id}-${projectIndex}`;
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  return (
    <section className="relative section-rhythm-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sticky horizontal filter chips */}
        <div className="sticky top-24 z-30 -mx-4 px-4 py-2 mb-8 md:mb-10 lg:mb-14 bg-white dark:bg-black border-b border-gray-900/5 dark:border-white/5">
          <div className="flex flex-nowrap gap-1.5 md:gap-3 overflow-x-auto snap-x snap-mandatory pb-0.5 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {portfolioSections.map((section, index) => {
              const SectionIcon = section.icon;
              const active = activeSection === index;
              return (
                <button
                  key={section.id}
                  type="button"
                  data-section-id={section.id}
                  onClick={() => {
                    setDirection(index > activeSection ? 1 : -1);
                    setActiveSection(index);
                  }}
                  className={`
                    snap-start flex-shrink-0 px-3 md:px-6 py-2 md:py-3.5 rounded-full md:rounded-2xl transition-all duration-300 border font-medium text-xs md:text-base touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 min-h-[40px] md:min-h-[44px]
                    ${
                      active
                        ? `bg-gray-900/[0.06] dark:bg-white/[0.08] ${section.borderColor.replace("/15", "/40")} text-gray-900 dark:text-white`
                        : "bg-transparent border-gray-900/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }
                  `}
                >
                  <span className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
                    <SectionIcon
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 ${active ? section.iconColor : "text-gray-500"}`}
                    />
                    <span className="md:hidden">{section.shortLabel}</span>
                    <span className="hidden md:inline">{section.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div {...swipeHandlers} className="select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative"
            >
              <div className="hidden lg:flex absolute -left-20 top-1/2 transform -translate-y-1/2 z-20">
                <motion.button
                  onClick={goToPrevious}
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-2xl bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 backdrop-blur-lg hover:bg-gray-900/15 dark:hover:bg-white/15 transition-all duration-300 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  aria-label="Previous section"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-blue-400" />
                </motion.button>
              </div>

              <div className="hidden lg:flex absolute -right-20 top-1/2 transform -translate-y-1/2 z-20">
                <motion.button
                  onClick={goToNext}
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-2xl bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 backdrop-blur-lg hover:bg-gray-900/15 dark:hover:bg-white/15 transition-all duration-300 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  aria-label="Next section"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-blue-400" />
                </motion.button>
              </div>

              {/* Section marketing chrome — desktop/tablet only */}
              <div className="hidden md:block text-center mb-12 lg:mb-16">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                  {currentSection.group === "client"
                    ? "Client work"
                    : "In-house ventures"}
                </p>
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

              <div className="space-y-3 md:space-y-10 lg:space-y-14">
                {currentSection.projects.map((project, projectIndex) => (
                  <ProjectCard
                    key={`${currentSection.id}-${projectIndex}`}
                    project={project}
                    section={currentSection}
                    projectIndex={projectIndex}
                    isExpanded={
                      expandedKey === `${currentSection.id}-${projectIndex}`
                    }
                    onToggle={() => toggleProject(projectIndex)}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PortfolioCTA() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative section-rhythm-xl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white leading-tight tracking-[-0.02em]">
            From Concept to Revenue
          </h2>
          <p className="text-base lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Need research before a big decision, help shipping AI or automation,
            or a prototype fast? We work from real projects—no fluff.
          </p>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Book a call to scope your project. We reply within 24 hours and will
            say clearly if we&apos;re a fit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-6 md:pt-12">
            <motion.a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 md:gap-4 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-5 py-2.5 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-semibold text-sm md:text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/30 backdrop-blur-xl border border-blue-500/20 min-h-[44px]"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="/services"
              className="group inline-flex items-center justify-center gap-2 text-sm md:text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white sm:bg-gray-900/[0.03] sm:dark:bg-white/[0.03] sm:border sm:border-gray-900/20 sm:dark:border-white/20 sm:hover:bg-gray-900/[0.08] sm:dark:hover:bg-white/[0.08] sm:text-gray-900 sm:dark:text-white sm:px-10 sm:py-5 sm:rounded-2xl sm:font-semibold sm:backdrop-blur-xl sm:hover:shadow-xl min-h-[44px] transition-all duration-300 sm:duration-500 underline-offset-4 hover:underline sm:no-underline"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn Our Approach
              <ExternalLink className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  usePortfolioMediaPreloader();

  return (
    <PageWrapper>
      <div className="relative z-10 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black min-h-screen">
        <PortfolioHero />
        <InteractivePortfolioShowcase />
        <PortfolioCTA />
      </div>
    </PageWrapper>
  );
}
