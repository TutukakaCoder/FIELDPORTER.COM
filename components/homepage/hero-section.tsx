"use client";

import { motion, useInView, Variants } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Search,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useRef } from "react";

// Enhanced service pillar data with more human, conversational descriptions
const servicePillars = [
  {
    icon: Search,
    title: "Smart Research",
    description: "Get answers that others miss",
    iconColor: "text-emerald-400",
    gradientFrom: "emerald-500",
    gradientTo: "teal-500",
    hoverGlow: "shadow-[0_0_25px_rgba(16,185,129,0.12)]",
    hoverBorder: "hover:border-emerald-500/25",
    cardBorder: "border-emerald-500/15",
    href: "/services#strategic-research",
    cardClass:
      "bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/15",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Rapid AI Builds",
    description: "Working prototypes in days",
    iconColor: "text-blue-400",
    gradientFrom: "blue-500",
    gradientTo: "indigo-500",
    hoverGlow: "shadow-[0_0_25px_rgba(59,130,246,0.12)]",
    hoverBorder: "hover:border-blue-500/25",
    cardBorder: "border-blue-500/15",
    href: "/services#rapid-development",
    cardClass:
      "bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-blue-500/15",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Workflow,
    title: "Workflow Magic",
    description: "Automate the repetitive stuff",
    iconColor: "text-purple-400",
    gradientFrom: "purple-500",
    gradientTo: "violet-500",
    hoverGlow: "shadow-[0_0_25px_rgba(168,85,247,0.12)]",
    hoverBorder: "hover:border-purple-500/25",
    cardBorder: "border-purple-500/15",
    href: "/services#workflow-optimization",
    cardClass:
      "bg-gradient-to-br from-purple-500/5 to-violet-500/5 border-purple-500/15",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: Sparkles,
    title: "AI Strategy",
    description: "Pick tools that actually work",
    iconColor: "text-orange-400",
    gradientFrom: "orange-500",
    gradientTo: "amber-500",
    hoverGlow: "shadow-[0_0_25px_rgba(249,115,22,0.12)]",
    hoverBorder: "hover:border-orange-500/25",
    cardBorder: "border-orange-500/15",
    href: "/services#ai-training",
    cardClass:
      "bg-gradient-to-br from-orange-500/5 to-amber-500/5 border-orange-500/15",
    iconBg: "bg-orange-500/10",
  },
];

// Floating orb component for depth and movement
const FloatingOrb = ({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute w-32 h-32 rounded-full ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-xl" />
  </motion.div>
);

// Interactive background pattern
function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <svg className="absolute w-full h-full">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />
    </div>
  );
}

// Premium aurora background with enhanced sophistication and performance optimization
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

      {/* Large dramatic aurora blobs with hardware acceleration */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
        style={{
          background:
            "linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.2))",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
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
          type: "tween",
        }}
      />

      <motion.div
        className="absolute -top-1/3 -right-1/3 w-[500px] h-[500px] rounded-full opacity-15 blur-[80px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(249, 115, 22, 0.2))",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
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
          type: "tween",
        }}
      />
    </div>
  );
}

// Premium 3D Service Card with sequential flip-in animation
function ServiceCard3D({
  service,
  index,
}: {
  service: (typeof servicePillars)[0];
  index: number;
}) {
  const handleClick = () => {
    window.location.href = service.href;
  };

  return (
    <motion.div
      className="group cursor-pointer h-full"
      initial={{
        opacity: 0,
        rotateY: -90,
        z: -100,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        rotateY: 0,
        z: 0,
        scale: 1,
      }}
      transition={{
        delay: index * 0.15, // Stagger each card
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1], // Premium easing
      }}
      style={{
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onClick={handleClick}
    >
      <motion.div
        className={`
          relative h-full p-8 rounded-2xl backdrop-blur-xl border
          ${service.cardClass} hover:bg-white/[0.03] ${service.hoverBorder}
          transition-all duration-400 ease-out
          hover:shadow-xl ${service.hoverGlow}
          will-change-transform
        `}
        whileHover={{
          y: -8,
          rotateY: 5,
          rotateX: -5,
          transition: { duration: 0.3 },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Enhanced glassmorphism layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent rounded-2xl opacity-40" />
        <div
          className={`absolute inset-0 rounded-2xl border ${service.cardBorder} opacity-30`}
        />

        <div
          className="relative z-10 h-full flex flex-col text-center"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Enhanced icon with 3D depth */}
          <motion.div
            className={`
              mx-auto p-4 rounded-xl ${service.iconBg} border border-white/15 backdrop-blur-lg 
              transition-all duration-300 group-hover:bg-white/12 mb-6
            `}
            whileHover={{
              rotate: [0, -8, 8, -8, 0],
              scale: 1.05,
              transition: { duration: 0.5 },
            }}
            style={{ transform: "translateZ(10px)" }}
          >
            <service.icon className={`w-8 h-8 ${service.iconColor}`} />
          </motion.div>

          {/* Enhanced content */}
          <div className="flex-1 space-y-4 flex flex-col justify-center">
            <h3
              className={`
                text-xl font-medium text-white leading-tight 
                group-hover:${service.iconColor} transition-colors duration-300
                tracking-[-0.01em]
              `}
            >
              {service.title}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 max-w-xs mx-auto">
              {service.description}
            </p>
          </div>

          {/* Enhanced hover indicator */}
          <motion.div
            className="opacity-0 group-hover:opacity-60 transition-all duration-300 mt-4"
            whileHover={{ x: 3 }}
          >
            <div className="flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Animated call-to-action button
function AnimatedCTA() {
  return (
    <motion.button
      className="group relative px-8 py-4 overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        // Target the dialog trigger specifically
        const chatButton = document.querySelector("[data-chat-trigger]");
        if (chatButton) {
          (chatButton as HTMLElement).click();
        }
      }}
    >
      {/* Subtle premium background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-fieldporter-blue/20 via-indigo-500/30 to-fieldporter-blue/20"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Premium glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-white/[0.02] rounded-2xl" />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 text-white font-medium">
        <MessageSquare className="w-5 h-5" />
        <span>Chat with our AI</span>
        <motion.span
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const textReveal: Variants = {
    hidden: { opacity: 0, y: 25, filter: "blur(3px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.7,
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden py-28 md:py-32 lg:py-40"
    >
      <PremiumAuroraBackground />
      <BackgroundPattern />

      {/* Floating orbs for depth */}
      <FloatingOrb className="top-20 left-10 hidden lg:block" delay={0} />
      <FloatingOrb className="bottom-20 right-20 hidden lg:block" delay={2} />
      <FloatingOrb className="top-40 right-40 hidden xl:block" delay={4} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16 md:space-y-20 lg:space-y-24"
        >
          {/* Enhanced main headline with personality */}
          <motion.div
            variants={textReveal}
            className="space-y-8 md:space-y-10 text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight">
              <motion.span
                className="block text-white/90"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Build Your Own
              </motion.span>
              <motion.span
                className="block mt-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    AI Advantage
                  </span>
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </motion.span>
            </h1>

            {/* Refined value proposition */}
            <div className="space-y-3">
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                Learn the tools. Master the workflows.{" "}
                <motion.span
                  className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-normal"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Modernise your operations
                </motion.span>
                .
              </p>
            </div>
          </motion.div>

          {/* Premium 3D Service Cards Grid */}
          <motion.div variants={textReveal} className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {servicePillars.map((service, index) => (
                <ServiceCard3D key={index} service={service} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Enhanced animated CTA */}
          <motion.div variants={textReveal} className="text-center pt-8">
            <AnimatedCTA />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
