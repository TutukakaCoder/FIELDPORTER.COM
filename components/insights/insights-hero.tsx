"use client";

import { animations } from "@/lib/animations";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import { useRef } from "react";

interface InsightCard {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const insights: InsightCard[] = [
  {
    icon: <TrendingUp className="w-6 h-6 text-fieldporter-blue" />,
    title: "AI Transformation Success Rate",
    value: "73%",
    description: "Of enterprises see measurable ROI within 12 months",
  },
  {
    icon: <Target className="w-6 h-6 text-fieldporter-blue" />,
    title: "Strategic Implementation Wins",
    value: "8.4x",
    description: "Average revenue multiplier for strategic AI adoption",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-fieldporter-blue" />,
    title: "Decision Speed Improvement",
    value: "440%",
    description: "Faster strategic decisions with AI-powered research",
  },
];

// Premium aurora background matching homepage
function PremiumAuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />

      {/* Enhanced grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Large dramatic aurora blobs */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
        style={{
          background:
            "linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.2))",
        }}
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -100, 80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute -top-1/3 -right-1/3 w-[500px] h-[500px] rounded-full opacity-15 blur-[80px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(249, 115, 22, 0.2))",
        }}
        animate={{
          x: [0, -120, 100, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
      />

      {/* Insights page specific brain pattern overlay */}
      <motion.div
        className="absolute top-0 right-1/4 w-1/2 h-1/2 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Ccircle cx='40' cy='40' r='4'/%3E%3Ccircle cx='80' cy='40' r='4'/%3E%3Ccircle cx='60' cy='70' r='4'/%3E%3Cpath d='M40 40L80 40M40 40L60 70M80 40L60 70' stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        animate={{
          x: [0, -40, 0],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Interactive spotlight effect for insights section
function InteractiveSpotlight() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [400, 800, 300, 400],
          y: [100, 300, 200, 100],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

export function InsightsHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], [0, -110]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.85]);
  const springContentY = useSpring(contentY, { damping: 30, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });

  const categories = [
    {
      icon: (
        <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-fieldporter-blue" />
      ),
      name: "AI Strategy",
      count: "12 Articles",
      description: "Strategic frameworks for AI transformation",
      gradient: "from-emerald-500/20 to-blue-500/20",
      iconColor: "text-emerald-400",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    },
    {
      icon: (
        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-fieldporter-blue" />
      ),
      name: "Business Automation",
      count: "8 Articles",
      description: "Process optimization and intelligent automation",
      gradient: "from-blue-500/20 to-purple-500/20",
      iconColor: "text-blue-400",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    },
    {
      icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />,
      name: "Implementation",
      count: "15 Articles",
      description: "Real-world AI deployment experiences",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative section-spacing bg-black overflow-hidden pt-24 md:pt-32 lg:pt-20"
    >
      <PremiumAuroraBackground />
      <InteractiveSpotlight />

      <motion.div
        style={{ y: springContentY, opacity: springOpacity }}
        className="content-container relative z-10"
      >
        {/* Enhanced Section Header with mobile-optimized typography */}
        <motion.div
          variants={animations.premiumStaggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            variants={animations.premiumFadeInUp}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 p-3 sm:p-5 mx-auto mb-6 sm:mb-8 backdrop-blur-xl"
            whileHover={{
              scale: 1.05,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.6 },
            }}
          >
            {/* Enhanced glassmorphism layers */}
            <div className="absolute inset-0 bg-fieldporter-blue/10 backdrop-blur-xl rounded-2xl" />
            <div className="absolute inset-0 rounded-2xl border border-fieldporter-blue/20" />

            <BarChart3 className="relative z-10 w-full h-full text-fieldporter-blue drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
          </motion.div>

          <motion.h1
            variants={animations.dramaticTextReveal}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-[-0.025em] mb-4 sm:mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          >
            Strategic{" "}
            <span className="bg-gradient-to-r from-[#0066FF] via-blue-400 to-[#0052CC] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]">
              Insights
            </span>
          </motion.h1>

          <motion.p
            variants={animations.premiumFadeInUp}
            className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-fieldporter-blue via-blue-400 to-fieldporter-blue bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(59,130,246,0.2)]"
          >
            Thought Leadership from AI Operators
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Enhanced Content */}
          <motion.div
            variants={animations.premiumStaggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="component-spacing"
          >
            {/* Enhanced Icon */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 p-3 sm:p-5 backdrop-blur-xl"
              whileHover={{
                scale: 1.05,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.6 },
              }}
            >
              {/* Enhanced glassmorphism layers */}
              <div className="absolute inset-0 bg-fieldporter-blue/10 backdrop-blur-xl rounded-2xl" />
              <div className="absolute inset-0 rounded-2xl border border-fieldporter-blue/20" />

              <BookOpen className="relative z-10 w-full h-full text-fieldporter-blue drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
            </motion.div>

            {/* Enhanced Title with mobile-optimized typography */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className="text-spacing"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-fieldporter-white leading-tight tracking-[-0.025em]">
                AI Strategy
                <span className="text-fieldporter-blue"> Insights</span>
              </h2>
              <p
                className="text-base sm:text-lg md:text-xl text-fieldporter-gray leading-relaxed max-w-xl mt-4 font-light"
                style={{ letterSpacing: "0.01em" }}
              >
                Learn from operators who build AI companies while consulting on
                strategic implementations. Our insights come from real-world
                experience, not theoretical frameworks.
              </p>
            </motion.div>

            {/* Enhanced CTA with premium effects */}
            <motion.div variants={animations.premiumFadeInUp}>
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <button
                  onClick={() => {
                    const element = document.getElementById("latest-insights");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-fieldporter-blue to-blue-600 hover:from-blue-600 hover:to-fieldporter-blue text-white font-medium rounded-xl transition-all duration-300 overflow-hidden shadow-lg shadow-fieldporter-blue/25 hover:shadow-xl hover:shadow-fieldporter-blue/40 min-w-[200px]"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative tracking-[-0.01em]">
                    Explore Insights
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Categories Grid with premium styling */}
          <motion.div
            variants={animations.premiumStaggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="grid grid-cols-1 gap-4 sm:gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={animations.premiumFadeInUp}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                }}
                className={`group relative p-4 sm:p-6 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-500 will-change-transform h-full hover:border-white/20 hover:${category.glow}`}
              >
                {/* Enhanced glassmorphism layers */}
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl" />
                <div className="absolute inset-0 rounded-2xl border border-white/5" />

                {/* Premium gradient accent */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex items-start space-x-4">
                  <motion.div
                    className="p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg flex-shrink-0"
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.6 },
                    }}
                  >
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${category.iconColor} group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]`}
                    >
                      {category.icon}
                    </div>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-fieldporter-white mb-1 group-hover:text-blue-300 transition-colors duration-300 leading-tight tracking-[-0.01em]">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-fieldporter-blue font-medium mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {category.count}
                    </p>
                    <p className="text-xs sm:text-sm text-fieldporter-gray leading-relaxed group-hover:text-white transition-colors duration-300">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Enhanced Featured Topics with premium styling */}
            <motion.div
              variants={animations.premiumFadeInUp}
              className="relative p-4 sm:p-6 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              {/* Enhanced glassmorphism layers */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl" />
              <div className="absolute inset-0 rounded-2xl border border-white/5" />

              <div className="relative z-10">
                <h4 className="text-base sm:text-lg font-semibold text-fieldporter-white mb-4 tracking-[-0.01em]">
                  Featured Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AI Implementation",
                    "Strategic Planning",
                    "Business Automation",
                    "Market Research",
                    "Growth Strategy",
                    "Technology Integration",
                  ].map((topic) => (
                    <motion.span
                      key={topic}
                      className="px-2 sm:px-3 py-1 rounded-full bg-fieldporter-blue/20 text-fieldporter-blue text-xs sm:text-sm font-medium hover:bg-fieldporter-blue/30 transition-colors duration-200 cursor-pointer min-h-[32px] flex items-center border border-fieldporter-blue/30 hover:border-fieldporter-blue/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {topic}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
