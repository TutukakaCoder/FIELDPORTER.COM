"use client";

import { trackServiceInterest } from "@/lib/firebase-analytics";
import {
  easeInOut,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "development-platform",
    phase: "01",
    icon: Code,
    title: "Self-Development Platform",
    tagline:
      "Private client platform with 8+ months active use. React/Firebase application demonstrating full-stack capabilities.",
    keyBenefits: [
      "Complex timezone handling with real user engagement",
      "Custom authentication and scalable data architecture",
    ],
    highlights: [
      "Production system with continuous user feedback",
      "Technical foundation for enterprise-grade solutions",
    ],
    timeline: "Live & Active",
    status: "Production",
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    glowColor: "bg-emerald-500/10",
    hoverGlow: "shadow-[0_0_40px_rgba(16,185,129,0.3)]",
  },
  {
    id: "ai-research-system",
    phase: "02",
    icon: Brain,
    title: "AI Research System",
    tagline:
      "Multi-AI model integration for automated research processes. Advanced reasoning with comprehensive data validation.",
    keyBenefits: [
      "Cross-model validation and intelligent synthesis",
      "Automated insight discovery from complex datasets",
    ],
    highlights: [
      "Testing with real client research requirements",
      "Advanced reasoning capabilities in development",
    ],
    timeline: "Active Development",
    status: "Building",
    statusColor: "text-blue-400",
    statusBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    glowColor: "bg-blue-500/10",
    hoverGlow: "shadow-[0_0_40px_rgba(59,130,246,0.3)]",
  },
  {
    id: "family-care-platform",
    phase: "03",
    icon: Heart,
    title: "Family Care Platform",
    tagline:
      "AI-powered coordination for elderly care. Privacy-first design with natural language processing for family communication.",
    keyBenefits: [
      "Intelligent scheduling with family-context awareness",
      "Privacy-first architecture for sensitive data",
    ],
    highlights: [
      "Real-world testing with family scenarios",
      "Accessibility-focused design and implementation",
    ],
    timeline: "Under Development",
    status: "Planning",
    statusColor: "text-purple-400",
    statusBg: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-400",
    glowColor: "bg-purple-500/10",
    hoverGlow: "shadow-[0_0_40px_rgba(168,85,247,0.3)]",
  },
];

const industries = [
  {
    title: "Robotics & Automation",
    description:
      "AI-driven robotics applications and automation solutions for operations.",
    icon: Zap,
    iconColor: "text-amber-400",
    glowColor: "bg-amber-500/10",
  },
  {
    title: "Environmental Sustainability",
    description:
      "Environmental monitoring systems and sustainability-focused AI implementations.",
    icon: Target,
    iconColor: "text-emerald-400",
    glowColor: "bg-emerald-500/10",
  },
  {
    title: "Early-Stage Growth",
    description:
      "Technical strategy and AI implementation support for startups scaling their capabilities.",
    icon: TrendingUp,
    iconColor: "text-blue-400",
    glowColor: "bg-blue-500/10",
  },
  {
    title: "AI Training & Empowerment",
    description:
      "Educational frameworks and capability-building programs for AI adoption across different industries.",
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
    hoverBorderColor: "hover:border-emerald-500/25",
    glowColor: "shadow-[0_0_25px_rgba(16,185,129,0.12)]",
    badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    quote:
      "We had a rare find. After a previous development company failed to deliver, Freddy stepped in and completely rebuilt our coaching platform from the ground up. His integrity and professionalism exceeded expectations.",
    author: "Steve Papps",
    role: "Life Coach",
    highlight: "Delivery Excellence",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    hoverBorderColor: "hover:border-blue-500/25",
    glowColor: "shadow-[0_0_25px_rgba(59,130,246,0.12)]",
    badgeColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  {
    quote:
      "Freddy was an asset to our team. He demonstrated a deep understanding of AI, including the latest tools, and an exceptional ability to get up the learning curve fast on new industries or topics. Showed experience and maturity beyond his years.",
    author: "Paul Rataul",
    role: "AI Startup Founder in Stealth",
    highlight: "Strategic Thinking",
    accentColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    hoverBorderColor: "hover:border-purple-500/25",
    glowColor: "shadow-[0_0_25px_rgba(168,85,247,0.12)]",
    badgeColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  },
];

// Optimized premium aurora background for better performance
function PremiumAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />

      {/* Enhanced grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Simplified aurora effects for better performance */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}

// Interactive spotlight effect
function InteractiveSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document
        .getElementById("portfolio")
        ?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 opacity-30">
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />
    </div>
  );
}

// Industry card component with consistent height and NO GREY BACKGROUNDS
function IndustryCard({
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
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="group relative h-full"
    >
      <div className="relative p-8 md:p-10 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.025] transition-all duration-500 will-change-transform h-full flex flex-col min-h-[200px]">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl" />
        <div className="absolute inset-0 rounded-2xl border border-white/5" />

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            className="w-14 h-14 mb-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg flex items-center justify-center group-hover:bg-white/15 transition-colors duration-500"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </motion.div>

          <div className="flex-1 space-y-4">
            <h4 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-500 leading-tight">
              {title}
            </h4>
            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Premium Testimonial Grid with masonry-style layout and color-coded accents
function PremiumTestimonialGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 40,
            rotateY: -15,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
            rotateY: 2,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            delay: index * 0.15,
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1], // Premium easing curve
          }}
          className="group relative h-full"
          style={{ transformPerspective: 1000 }}
        >
          {/* Enhanced glow effect on hover */}
          <div
            className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${testimonial.glowColor} blur-xl`}
          />

          <div
            className={`
            relative p-8 lg:p-10 rounded-3xl backdrop-blur-xl border 
            ${testimonial.borderColor} ${testimonial.hoverBorderColor}
            bg-white/[0.03] hover:bg-white/[0.05] 
            transition-all duration-500 will-change-transform h-full flex flex-col
            hover:shadow-2xl
          `}
          >
            {/* Enhanced glassmorphism layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent rounded-3xl opacity-40" />
            <div
              className={`absolute inset-0 rounded-3xl border ${testimonial.borderColor} opacity-30`}
            />

            {/* Subtle grain texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.02] rounded-3xl"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
              }}
            />

            <div className="relative z-10 flex flex-col h-full">
              {/* Enhanced quote icon with color-coded accent */}
              <motion.div
                className="mb-8"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <Quote
                  className={`w-10 h-10 ${testimonial.accentColor} opacity-70`}
                />
              </motion.div>

              {/* Enhanced quote content with better typography */}
              <blockquote
                className={`
                text-gray-100 leading-relaxed text-lg lg:text-xl font-light mb-8 flex-1
                group-hover:text-white transition-colors duration-500
                tracking-[-0.01em]
              `}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Enhanced author info with better spacing */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="text-white font-semibold text-xl tracking-[-0.01em]">
                    {testimonial.author}
                  </div>
                  <div
                    className={`${testimonial.accentColor} text-base font-normal`}
                  >
                    {testimonial.role}
                  </div>
                </div>

                {/* Color-coded category badge */}
                <div className="flex justify-start">
                  <div
                    className={`px-4 py-2 rounded-xl ${testimonial.badgeColor} backdrop-blur-md`}
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
      ))}
    </div>
  );
}

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Enhanced scroll animations
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [100, 500, 900], [1, 0.9, 0.7]);
  const springContentY = useSpring(contentY, { damping: 30, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });

  const toggleExpanded = (serviceId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedCards(newExpanded);
  };

  const handleServiceInterest = (serviceId: string, serviceName: string) => {
    trackServiceInterest(serviceId, "learn_more", {
      service_name: serviceName,
      location: "portfolio_section",
    });

    const sectionMap: { [key: string]: string } = {
      "development-platform": "portfolio-section",
      "ai-research-system": "research-section",
      "family-care-platform": "portfolio-section",
    };

    sessionStorage.setItem("targetSection", sectionMap[serviceId] || "");
    window.location.href = "/portfolio";
  };

  return (
    <section
      ref={ref}
      id="portfolio"
      data-cursor-zone="content"
      className="relative pt-32 md:pt-36 lg:pt-44 pb-32 md:pb-36 lg:pb-44 overflow-hidden"
    >
      <PremiumAuroraBackground />
      <InteractiveSpotlight />

      <motion.div
        style={{ y: springContentY, opacity: springOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: easeInOut }}
          className="text-center mb-24 md:mb-28 lg:mb-32"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-12 lg:mb-16 leading-tight tracking-[-0.02em]"
          >
            Projects We&apos;re{" "}
            <span className="relative">
              <span className="relative z-10 font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Building
              </span>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-blue-500/20 blur-3xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Real applications we&apos;re developing while helping clients.
            Everything we recommend comes from hands-on experience.
          </motion.p>
        </motion.div>

        {/* Enhanced Projects Grid with generous spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-32 md:mb-36 lg:mb-40">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
              className="group relative"
            >
              {/* Floating Phase Number */}
              <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8 text-6xl lg:text-7xl font-thin text-white/5 pointer-events-none select-none">
                {project.phase}
              </div>

              <div
                className={`
                  relative p-8 lg:p-10 rounded-3xl backdrop-blur-xl border border-white/10 
                  bg-white/[0.02] hover:bg-white/[0.03] 
                  transition-all duration-700 ease-out
                  hover:shadow-2xl ${project.hoverGlow}
                  will-change-transform h-full cursor-pointer
                  min-h-[520px] lg:min-h-[580px]
                `}
                onClick={() => handleServiceInterest(project.id, project.title)}
              >
                {/* Enhanced glassmorphism layers */}
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-3xl" />
                <div className="absolute inset-0 rounded-3xl border border-white/5" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-8">
                    <motion.div
                      className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg transition-all duration-500 group-hover:bg-white/15"
                      whileHover={{
                        rotate: [0, -8, 8, -8, 0],
                        scale: 1.1,
                        transition: { duration: 0.8 },
                      }}
                    >
                      <project.icon
                        className={`w-8 h-8 ${project.iconColor}`}
                      />
                    </motion.div>

                    <motion.div
                      className={`px-5 py-2.5 rounded-full border font-medium text-sm ${project.statusBg} ${project.statusColor} transition-all duration-500 group-hover:scale-105`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {project.status}
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <h3
                        className={`text-2xl lg:text-3xl font-semibold text-white leading-tight group-hover:${project.iconColor} transition-colors duration-500`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-lg text-gray-200 font-light leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center space-x-3">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-medium text-sm">
                        Status:
                      </span>
                      <span className="text-gray-300 text-sm font-medium">
                        {project.timeline}
                      </span>
                    </div>

                    {/* Key Benefits */}
                    <div className="space-y-4">
                      {project.keyBenefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                        >
                          <div className="relative flex-shrink-0 mt-1">
                            <div
                              className={`w-2 h-2 rounded-full ${project.iconColor.replace("text-", "bg-")}`}
                            />
                            <div
                              className={`absolute inset-0 ${project.glowColor} blur-sm opacity-60`}
                            />
                          </div>
                          <span className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-500">
                            {benefit}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="space-y-4">
                      {project.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: (project.keyBenefits.length + idx) * 0.1,
                            duration: 0.5,
                          }}
                        >
                          <div className="relative flex-shrink-0 mt-1">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${project.iconColor.replace("text-", "bg-")} opacity-60`}
                            />
                          </div>
                          <span className="text-sm text-gray-300 leading-relaxed">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Learn more indicator */}
                  <motion.div
                    className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    whileHover={{ x: 6 }}
                  >
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-500" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Industries Section with NO GREY CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: easeInOut }}
          className="mb-32 md:mb-36 lg:mb-40"
        >
          <div className="text-center mb-24 md:mb-28 lg:mb-32">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight tracking-[-0.02em]">
              Industries We&apos;re{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Exploring
              </span>
            </h3>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Future areas where we&apos;re applying technical expertise and
              building solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-16">
            {industries.map((industry, index) => (
              <IndustryCard
                key={index}
                {...industry}
                delay={index * 0.15}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Premium Testimonial Grid with NO GREY CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: easeInOut }}
        >
          <div className="text-center mb-24 md:mb-28 lg:mb-32">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight tracking-[-0.02em]">
              Client{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Experiences
              </span>
            </h3>
            <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Real feedback from completed projects with measurable outcomes.
            </p>
          </div>

          <PremiumTestimonialGrid />
        </motion.div>
      </motion.div>
    </section>
  );
}
