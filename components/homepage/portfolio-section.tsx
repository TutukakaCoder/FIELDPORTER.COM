"use client";

import { trackServiceInterest } from "@/lib/firebase-analytics";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Code,
  Heart,
  Lightbulb,
  Quote,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";

const projects = [
  {
    id: "papps-mastery",
    phase: "01",
    icon: Code,
    title: "Self Development Platform",
    tagline:
      "Custom client platform with 8+ months active use. React/Firebase application demonstrating full-stack capabilities.",
    keyBenefits: [
      "Complex timezone handling, user management, daily programs for life coach",
      "Custom client build, new features and updates monthly",
    ],

    timeline: "Live & Active",
    status: "Production",
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    glowColor: "bg-emerald-500/10",
    hoverGlow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    gradientFrom: "from-emerald-500/20",
    gradientTo: "to-emerald-500/5",
  },
  {
    id: "process-automation",
    phase: "02",
    icon: Brain,
    title: "Process Automation Suite",
    tagline:
      "Multi-AI model integration for automated research processes. Advanced reasoning with comprehensive data validation.",
    keyBenefits: [
      "Cross-model validation and intelligent synthesis",
      "Automated insight discovery, testing with real clients",
    ],

    timeline: "Active Development",
    status: "Building",
    statusColor: "text-blue-400",
    statusBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    glowColor: "bg-blue-500/10",
    hoverGlow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    gradientFrom: "from-blue-500/20",
    gradientTo: "to-blue-500/5",
  },
  {
    id: "family-care",
    phase: "03",
    icon: Heart,
    title: "Family Care Platform",
    tagline:
      "AI-powered coordination for elderly care. Privacy-first design with the aim of making new tech easily accessble.",
    keyBenefits: [
      "Intelligent scheduling with family-context awareness",
      "SMS to LLM, calendar integration",
    ],

    timeline: "Under Development",
    status: "Planning",
    statusColor: "text-purple-400",
    statusBg: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-400",
    glowColor: "bg-purple-500/10",
    hoverGlow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-purple-500/5",
  },
];

const industries = [
  {
    title: "Manufacturing & Automation",
    description: "Process optimization and intelligent systems",
    icon: Zap,
    iconColor: "text-amber-400",
    glowColor: "bg-amber-500/10",
  },
  {
    title: "Environmental Solutions",
    description: "Monitoring and sustainability tools",
    icon: Target,
    iconColor: "text-emerald-400",
    glowColor: "bg-emerald-500/10",
  },
  {
    title: "Startup Growth",
    description: "Technical strategy for scaling businesses",
    icon: TrendingUp,
    iconColor: "text-blue-400",
    glowColor: "bg-blue-500/10",
  },
  {
    title: "AI Implementation",
    description: "Practical training and adoption support",
    icon: Lightbulb,
    iconColor: "text-purple-400",
    glowColor: "bg-purple-500/10",
  },
];

const testimonials = [
  {
    quote:
      "Fieldporter combines sharp problem solving with excellent communication and handy technical expertise. Their systematic approach, enthusiasm for learning and actually getting stuck into the complex business challenges set them apart.",
    author: "Seb Lindner",
    role: "Founder & CEO, Web3 Daily",
    highlight: "Problem Solving",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    hoverBorderColor: "hover:border-emerald-500/30",
    badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    glowColor: "shadow-[0_0_25px_rgba(16,185,129,0.12)]",
  },
  {
    quote:
      "We had a rare find. After a previous development company failed to deliver, Freddy stepped in and completely rebuilt our coaching platform from the ground up. His integrity and professionalism exceeded expectations.",
    author: "Steve Papps",
    role: "Life Coach",
    highlight: "Delivery Excellence",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    hoverBorderColor: "hover:border-blue-500/30",
    badgeColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    glowColor: "shadow-[0_0_25px_rgba(59,130,246,0.12)]",
  },
  {
    quote:
      "Freddy was an asset to our team. He demonstrated a deep understanding of AI, including the latest tools, and an exceptional ability to get up the learning curve fast on new industries or topics. Showed experience and maturity beyond his years.",
    author: "Paul Rataul",
    role: "AI Startup Founder in Stealth",
    highlight: "Strategic Thinking",
    accentColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    hoverBorderColor: "hover:border-purple-500/30",
    badgeColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    glowColor: "shadow-[0_0_25px_rgba(168,85,247,0.12)]",
  },
];

// Enhanced premium background with subtle effects
const PremiumBackground = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black" />

      {/* Subtle floating orbs */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-500/6 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Premium grain texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/20 dark:to-black/20" />
    </div>
  );
});

PremiumBackground.displayName = "PremiumBackground";

// Enhanced industry card with premium effects
const IndustryCard = memo(
  ({
    title,
    description,
    icon: Icon,
    iconColor,
    glowColor,
    delay,
    isInView,
  }: {
    title: string;
    description: string;
    icon: React.ElementType;
    iconColor: string;
    glowColor: string;
    delay: number;
    isInView: boolean;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ delay, duration: 0.4, ease: "easeOut" }}
        className="group relative h-full"
      >
        <div className="relative p-6 lg:p-8 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-gray-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 hover:border-gray-900/20 dark:hover:border-white/20 transition-all duration-300 h-full flex flex-col min-h-[140px] lg:min-h-[160px]">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/[0.02] dark:from-white/[0.02] to-transparent rounded-2xl" />

          <div className="relative z-10 flex flex-col h-full items-center text-center">
            <div
              className={`w-10 h-10 lg:w-12 lg:h-12 mb-4 rounded-2xl bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:${glowColor} transition-all duration-300`}
            >
              <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${iconColor}`} />
            </div>

            <div className="flex-1 space-y-2">
              <h4 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                {title}
              </h4>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                {description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

IndustryCard.displayName = "IndustryCard";

// Enhanced testimonial with premium glassmorphism
const TestimonialCard = memo(
  ({
    testimonial,
    index,
  }: {
    testimonial: (typeof testimonials)[0];
    index: number;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          delay: index * 0.1,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="group relative h-full"
      >
        {/* Subtle glow on hover */}
        <div
          className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${testimonial.glowColor}`}
        />

        <div
          className={`
        relative p-8 lg:p-10 rounded-3xl border backdrop-blur-sm
        ${testimonial.borderColor} ${testimonial.hoverBorderColor}
        bg-white/25 dark:bg-black/25 hover:bg-white/35 dark:hover:bg-black/35 
        transition-all duration-300 h-full flex flex-col
      `}
        >
          {/* Premium glassmorphism layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/[0.03] dark:from-white/[0.03] to-transparent rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 dark:from-black/10 to-transparent rounded-3xl" />

          <div className="relative z-10 flex flex-col h-full">
            <Quote
              className={`w-8 h-8 ${testimonial.accentColor} opacity-70 mb-6`}
            />

            <blockquote className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg lg:text-xl font-light mb-8 flex-1 tracking-[-0.01em]">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="text-gray-900 dark:text-white font-semibold text-xl tracking-[-0.01em]">
                  {testimonial.author}
                </div>
                <div
                  className={`${testimonial.accentColor} text-base font-normal`}
                >
                  {testimonial.role}
                </div>
              </div>

              <div className="flex justify-start">
                <div
                  className={`px-4 py-2 rounded-xl ${testimonial.badgeColor} backdrop-blur-sm`}
                >
                  <span className="text-sm font-medium">
                    {testimonial.highlight}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

TestimonialCard.displayName = "TestimonialCard";

// Enhanced project card with premium effects
const ProjectCard = memo(
  ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = useCallback(() => {
      trackServiceInterest(project.id, "learn_more", {
        service_name: project.title,
        location: "portfolio_section",
      });

      const sectionMap: { [key: string]: string } = {
        "papps-mastery": "portfolio-section",
        "process-automation": "research-section",
        "family-care": "portfolio-section",
      };

      sessionStorage.setItem("targetSection", sectionMap[project.id] || "");
      window.location.href = "/portfolio";
    }, [project.id, project.title]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          delay: index * 0.15,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="group relative cursor-pointer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating phase number */}
        <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8 text-6xl lg:text-7xl font-thin text-gray-900/5 dark:text-white/5 pointer-events-none select-none">
          {project.phase}
        </div>

        {/* Premium hover glow */}
        <div
          className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${project.hoverGlow}`}
        />

        <div
          className={`
        relative p-6 lg:p-8 xl:p-10 rounded-3xl border border-gray-900/10 dark:border-white/10 backdrop-blur-sm
        bg-white/25 dark:bg-black/25 hover:bg-white/35 dark:hover:bg-black/35 hover:border-gray-900/20 dark:hover:border-white/20
        transition-all duration-300 hover:shadow-2xl
        h-full min-h-[420px] md:min-h-[480px] lg:min-h-[520px]
      `}
        >
          {/* Premium glassmorphism layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/[0.03] dark:from-white/[0.03] to-transparent rounded-3xl" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-6 lg:mb-8">
              <div className="p-4 lg:p-5 rounded-2xl bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20 backdrop-blur-sm group-hover:bg-gray-900/15 dark:group-hover:bg-white/15 transition-all duration-300">
                <project.icon
                  className={`w-7 h-7 lg:w-8 lg:h-8 ${project.iconColor}`}
                />
              </div>

              <div
                className={`px-4 lg:px-5 py-2 lg:py-2.5 rounded-full border font-medium text-xs lg:text-sm ${project.statusBg} ${project.statusColor} backdrop-blur-sm`}
              >
                {project.status}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6 lg:space-y-8">
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900 dark:text-white leading-tight tracking-[-0.01em]">
                  {project.title}
                </h3>
                <p className="text-base lg:text-lg text-gray-700 dark:text-gray-200 font-light leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Timeline */}
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-medium text-sm">
                  Status:
                </span>
                <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                  {project.timeline}
                </span>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3">
                {project.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="relative flex-shrink-0 mt-1.5">
                      <div
                        className={`w-2 h-2 rounded-full ${project.iconColor.replace("text-", "bg-")}`}
                      />
                      <div
                        className={`absolute inset-0 ${project.glowColor} blur-sm opacity-60`}
                      />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm lg:text-base group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced arrow indicator */}
            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="p-2 rounded-full bg-gray-900/5 dark:bg-white/5 backdrop-blur-sm">
                <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";

export function PortfolioSection() {
  const ref = useRef(null);
  // FIXED: Reduced negative margin to prevent overlap
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="portfolio"
      className="relative pt-32 md:pt-36 lg:pt-44 pb-32 md:pb-36 lg:pb-44 overflow-hidden"
    >
      <PremiumBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-24 md:mb-28 lg:mb-32">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-12 lg:mb-16 leading-tight tracking-[-0.02em]">
            Projects We&apos;re{" "}
            <span className="relative">
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Building
              </span>
              {/* Subtle glow effect */}
              <div className="absolute -inset-x-4 -inset-y-2 bg-blue-500/20 blur-2xl opacity-30" />
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Real applications we&apos;re developing while helping clients.
            Everything we recommend comes from hands-on experience.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-32 md:mb-36 lg:mb-40">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Industries Section */}
        <div className="mb-32 md:mb-36 lg:mb-40">
          <div className="text-center mb-24 md:mb-28 lg:mb-32">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-8 leading-tight tracking-[-0.02em]">
              Industries We&apos;re{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Exploring
              </span>
            </h3>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Areas where we&apos;re developing practical solutions and gaining
              expertise.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {industries.map((industry, index) => (
              <IndustryCard
                key={index}
                {...industry}
                delay={index * 0.1}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center mb-24 md:mb-28 lg:mb-32">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-8 leading-tight tracking-[-0.02em]">
              Client{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Experiences
              </span>
            </h3>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Real feedback from completed projects with measurable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
