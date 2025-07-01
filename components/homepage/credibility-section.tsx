"use client";

import {
  easeInOut,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Clock, Search, Settings, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse" />
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
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-5"
      style={{
        background: `radial-gradient(500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 50%)`,
      }}
    />
  );
}

export function CredibilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  // Add vertical fade animations like hero section
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [200, 600, 1000], [1, 0.9, 0.7]);
  const springContentY = useSpring(contentY, { damping: 30, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });

  const businessChallenges = [
    {
      id: "research-speed",
      icon: Search,
      title: "Not Enough Research",
      description:
        "Traditional market research is expensive and time consuming. Meanwhile, companies that deploy AI-powered research complete comprehensive analysis in days.",
      statistic: "757B",
      metric: "Global AI Market 2025",
      source: "Statista Market Insights",
      connection:
        "Our Strategic Research Intelligence delivers comprehensive market analysis in 3-5 days using AI Agents across thousands of sources.",
      iconColor: "text-emerald-400",
      cardBorder: "border-emerald-500/15",
      hoverBorder: "hover:border-emerald-500/25",
      glowColor: "bg-emerald-500/10",
      hoverGlow: "shadow-[0_0_25px_rgba(16,185,129,0.3)]",
    },
    {
      id: "manual-workflows",
      icon: Settings,
      title: "Manual Processes Drain Time",
      description:
        "Businesses waste 500+ hours annually on manual finance tasks alone. Successful companies automate repetitive workflows to focus on strategy.",
      statistic: "500+",
      metric: "Hours Saved Annually",
      source: "American Express Business Study",
      connection:
        "We automate manual workflows, with clients typically reclaiming 10-40 hours weekly through systematic optimization.",
      iconColor: "text-purple-400",
      cardBorder: "border-purple-500/15",
      hoverBorder: "hover:border-purple-500/25",
      glowColor: "bg-purple-500/10",
      hoverGlow: "shadow-[0_0_25px_rgba(168,85,247,0.3)]",
    },
    {
      id: "development-delays",
      icon: Clock,
      title: "Development Projects Drag On",
      description:
        "Most business software projects take months. Companies need working prototypes to validate concepts and make decisions quickly.",
      statistic: "60%",
      metric: "Companies Use Automation",
      source: "Duke University Study 2024",
      connection:
        "Our Rapid Development approach delivers functional prototypes and working systems in 1-2 weeks, not months.",
      iconColor: "text-blue-400",
      cardBorder: "border-blue-500/15",
      hoverBorder: "hover:border-blue-500/25",
      glowColor: "bg-blue-500/10",
      hoverGlow: "shadow-[0_0_25px_rgba(59,130,246,0.3)]",
    },
    {
      id: "ai-skills-gap",
      icon: Users,
      title: "Teams Need AI Capabilities",
      description:
        "While 78% of organizations use AI, most lack internal expertise. Companies that build AI capabilities reduce dependency on external services.",
      statistic: "78%",
      metric: "Organizations Use AI",
      source: "McKinsey Global AI Survey 2024",
      connection:
        "Our AI Training builds practical capabilities in your team, reducing long-term dependency on subscriptions and external consultants.",
      iconColor: "text-orange-400",
      cardBorder: "border-orange-500/15",
      hoverBorder: "hover:border-orange-500/25",
      glowColor: "bg-orange-500/10",
      hoverGlow: "shadow-[0_0_25px_rgba(249,115,22,0.3)]",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative pt-32 md:pt-36 lg:pt-44 pb-32 md:pb-36 lg:pb-44 overflow-hidden"
    >
      <PremiumAuroraBackground />
      <InteractiveSpotlight />

      <motion.div
        style={{ y: springContentY, opacity: springOpacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Enhanced Section Header with proper spacing */}
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
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-8 lg:mb-10 leading-tight tracking-[-0.02em]"
          >
            The Real Challenges To{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Navigate
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Most businesses struggle with practical implementation.
          </motion.p>
        </motion.div>

        {/* Enhanced Business Challenges Grid with generous spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          {businessChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.15,
                duration: 0.8,
                ease: easeInOut,
              }}
              className="group"
            >
              <div
                className={`
                  relative p-10 md:p-12 lg:p-14 rounded-2xl backdrop-blur-xl border ${challenge.cardBorder}
                  bg-white/[0.015] hover:bg-white/[0.025] ${challenge.hoverBorder}
                  transition-all duration-500 ease-out will-change-transform h-full
                  hover:shadow-xl ${challenge.hoverGlow}
                `}
              >
                {/* Enhanced glassmorphism layers */}
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl" />
                <div
                  className={`absolute inset-0 rounded-2xl border ${challenge.cardBorder} opacity-30`}
                />

                <div className="relative z-10 space-y-8">
                  {/* Icon and Statistic */}
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg flex items-center justify-center transition-all duration-300 group-hover:bg-white/15">
                      <challenge.icon
                        className={`w-8 h-8 ${challenge.iconColor}`}
                      />
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-2xl lg:text-3xl font-bold text-white group-hover:${challenge.iconColor} transition-colors duration-300`}
                      >
                        {challenge.statistic}
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        {challenge.metric}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl lg:text-2xl font-semibold text-white leading-tight group-hover:${challenge.iconColor} transition-colors duration-300`}
                  >
                    {challenge.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {challenge.description}
                  </p>

                  {/* Connection to Services */}
                  <div className="pt-4 border-t border-white/10">
                    <p
                      className={`text-sm leading-relaxed font-medium ${challenge.iconColor}`}
                    >
                      {challenge.connection}
                    </p>
                  </div>

                  {/* Source */}
                  <div className="text-xs text-gray-500 opacity-60">
                    {challenge.source}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Summary Statement with proper spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 md:mt-28 lg:mb-32 text-center"
        >
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            We can help you navigate the new tech landscape.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
