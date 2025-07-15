"use client";

import { motion, useInView, Variants } from "framer-motion";
import { MessageSquare, Search, Sparkles, Workflow, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  useDeviceCapability,
  usePerformanceMonitor,
  useReducedMotion,
  useStableMobile,
} from "../../hooks";

// Lazy load the 3D backgrounds with enhanced loading strategy
const Hero3DBackground = dynamic(
  () =>
    import("./hero-3d-background").then((mod) => ({
      default: mod.Hero3DBackground,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
    ),
  },
);

const Hero3DBackgroundSimplified = dynamic(
  () =>
    import("./hero-3d-background-simplified").then((mod) => ({
      default: mod.Hero3DBackgroundSimplified,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
    ),
  },
);

// Enhanced service pillar data with mobile-optimized descriptions
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
    quadrant: "top-left",
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
    quadrant: "top-right",
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
    href: "/services#workflow-optimisation",
    cardClass:
      "bg-gradient-to-br from-purple-500/5 to-violet-500/5 border-purple-500/15",
    iconBg: "bg-purple-500/10",
    quadrant: "bottom-left",
  },
  {
    icon: Sparkles,
    title: "AI Training",
    description: "Master the tools that matter",
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
    quadrant: "bottom-right",
  },
];

// Smooth floating orb component with stable animations
const FloatingOrb = memo(
  ({ className, delay = 0 }: { className: string; delay?: number }) => {
    const isMobile = useStableMobile();
    const prefersReducedMotion = useReducedMotion();
    const { metrics } = usePerformanceMonitor();

    // Stable animation values that don't change frequently
    const animationValues = useMemo(() => {
      return {
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.02, 1],
      };
    }, []); // Empty dependency array for stable animations

    // Only disable for major issues, not minor FPS fluctuations
    if (isMobile || prefersReducedMotion || metrics.fps < 25) return null;

    return (
      <motion.div
        className={`absolute w-32 h-32 rounded-full ${className}`}
        animate={animationValues}
        transition={{
          duration: 12 + delay, // Slower, more graceful animation
          repeat: Infinity,
          ease: "easeInOut",
          type: "tween",
          repeatType: "mirror",
        }}
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          contain: "layout style paint",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/6 to-purple-400/6"
          style={{
            filter: "blur(28px)",
            opacity: 0.7,
          }}
        />
      </motion.div>
    );
  },
);

FloatingOrb.displayName = "FloatingOrb";

// Memoized background pattern with performance optimization
const BackgroundPattern = memo(() => {
  const isMobile = useStableMobile();
  const prefersReducedMotion = useReducedMotion();

  const patternSettings = useMemo(
    () => ({
      width: isMobile ? "60" : "40",
      height: isMobile ? "60" : "40",
      path: isMobile ? "M 60 0 L 0 0 0 60" : "M 40 0 L 0 0 0 40",
    }),
    [isMobile],
  );

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-30">
      <svg className="absolute w-full h-full">
        <defs>
          <pattern
            id="grid"
            width={patternSettings.width}
            height={patternSettings.height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={patternSettings.path}
              fill="none"
              stroke="rgba(0,0,0,0.03)"
              strokeWidth="1"
              className="dark:hidden"
            />
            <path
              d={patternSettings.path}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
              className="hidden dark:block"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated gradient overlay for desktop only */}
      {!isMobile && !prefersReducedMotion && (
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
          style={{
            backgroundSize: "200% 200%",
            willChange: "background-position",
          }}
        />
      )}
    </div>
  );
});

BackgroundPattern.displayName = "BackgroundPattern";

// Tiered Background System Component
const TieredBackground = memo(() => {
  const { experience } = useDeviceCapability();

  // Debug logging for development
  useEffect(() => {
    console.log("Device experience tier:", experience);
  }, [experience]);

  switch (experience) {
    case "full":
      return <Hero3DBackground />;
    case "simplified":
      return <Hero3DBackgroundSimplified />;
    case "css-only":
    default:
      return <PremiumAuroraBackground />;
  }
});

TieredBackground.displayName = "TieredBackground";

// Optimized premium aurora background with memory leak prevention
const PremiumAuroraBackground = memo(() => {
  const isMobile = useStableMobile();
  const prefersReducedMotion = useReducedMotion();
  const { metrics } = usePerformanceMonitor();

  const auroraSettings = useMemo(
    () => ({
      grain: isMobile ? "opacity-[0.003]" : "opacity-[0.008]", // Reduced grain opacity for performance
      showAnimated: !isMobile && !prefersReducedMotion && metrics.fps > 40,
      blurAmount:
        metrics.quality === "low" ? 40 : metrics.quality === "medium" ? 60 : 80,
    }),
    [isMobile, prefersReducedMotion, metrics.fps, metrics.quality],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sophisticated gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black" />

      {/* Reduced grain texture overlay for better performance */}
      <div
        className={`absolute inset-0 ${auroraSettings.grain}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* FIXED: Optimized Aurora blobs with proper containment */}
      {auroraSettings.showAnimated ? (
        <>
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full opacity-15"
            style={{
              background:
                "linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.15))",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              filter: `blur(${auroraSettings.blurAmount}px)`,
              contain: "layout style paint size",
              // FIXED: Use safer positioning that stays within bounds
              left: "calc(50% - 150px)", // Center-based positioning
              top: "calc(50% - 150px)", // Center-based positioning
            }}
            animate={{
              x: [0, 50, -25, 0], // Reduced movement range
              y: [0, -25, 20, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              type: "tween",
            }}
          />
          <motion.div
            className="absolute w-[250px] h-[250px] rounded-full opacity-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(249, 115, 22, 0.15))",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              filter: `blur(${auroraSettings.blurAmount - 20}px)`,
              contain: "layout style paint size",
              // FIXED: Use safer positioning that stays within bounds
              right: "calc(50% - 125px)", // Center-based positioning from right
              top: "calc(50% - 125px)", // Center-based positioning
            }}
            animate={{
              x: [0, -40, 30, 0], // Reduced movement range
              y: [0, 30, -20, 0],
              scale: [1, 0.95, 1.05, 1],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
              delay: 10,
              type: "tween",
            }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute w-[250px] h-[250px] rounded-full opacity-12"
            style={{
              background:
                "linear-gradient(45deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.1))",
              filter: `blur(${auroraSettings.blurAmount}px)`,
              left: "calc(50% - 125px)", // FIXED: Safe positioning
              top: "calc(50% - 125px)",
              contain: "layout style paint size",
            }}
          />
          <div
            className="absolute w-[200px] h-[200px] rounded-full opacity-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(249, 115, 22, 0.1))",
              filter: `blur(${auroraSettings.blurAmount - 20}px)`,
              right: "calc(50% - 100px)", // FIXED: Safe positioning
              top: "calc(50% - 100px)",
              contain: "layout style paint size",
            }}
          />
        </>
      )}
    </div>
  );
});

PremiumAuroraBackground.displayName = "PremiumAuroraBackground";

// Memoized animated CTA button with premium glassmorphism design
const AnimatedCTA = memo(() => {
  const isMobile = useStableMobile();
  const prefersReducedMotion = useReducedMotion();

  const handleChatClick = useCallback(() => {
    // Method 1: Look for chat widget toggle button
    const chatToggle = document.querySelector(
      "[data-chat-toggle]",
    ) as HTMLElement;
    if (chatToggle) {
      chatToggle.click();
      return;
    }

    // Method 2: Look for chat widget trigger
    const chatTrigger = document.querySelector(
      "[data-chat-trigger]",
    ) as HTMLElement;
    if (chatTrigger) {
      chatTrigger.click();
      return;
    }

    // Method 3: Dispatch custom event for chat widget
    window.dispatchEvent(
      new CustomEvent("open-chat-widget", {
        bubbles: true,
        detail: { source: "hero-cta" },
      }),
    );

    // Method 4: Try to find chat widget by class or id
    const chatWidget = document.querySelector(
      '.chat-widget, #chat-widget, [data-testid="chat-widget"]',
    ) as HTMLElement;
    if (chatWidget) {
      chatWidget.style.display = "block";
      chatWidget.classList.add("open");
    }
  }, []);

  return (
    <motion.button
      className={`
        group relative transition-all duration-300
        ${isMobile ? "px-8 py-4 text-base" : "px-10 py-5 text-lg"}
        
        // Premium glassmorphism background - lighter and more appealing
        bg-blue-500/10 dark:bg-black/20 backdrop-blur-xl border border-blue-500/20 dark:border-white/10
        hover:bg-blue-500/20 dark:hover:bg-black/30 hover:border-blue-500/30 dark:hover:border-white/20
        
        // Subtle glow effect
        shadow-[0_0_20px_rgba(59,130,246,0.15)]
        hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]
        
        // Perfect rounded button
        rounded-2xl
        
        // Touch-friendly
        touch-manipulation select-none
        
        // Focus states
        focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black
        
        min-w-[200px] sm:min-w-[240px]
      `}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              scale: isMobile ? 1.02 : 1.05,
              y: -2,
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      onClick={handleChatClick}
      aria-label="Open chat with our AI agent to get started"
      role="button"
      tabIndex={0}
    >
      {/* Enhanced glow effect on hover */}
      <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Button content with enhanced AI visual cues */}
      <span className="relative z-10 flex items-center justify-center gap-3 text-gray-900 dark:text-white font-medium">
        <div className="flex items-center gap-2">
          <MessageSquare
            className="w-5 h-5 sm:w-6 text-gray-900/90 dark:text-white/90"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <motion.div
            className="w-1.5 h-1.5 bg-blue-400 rounded-full"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 1, 0.8],
                  }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>
        <span>Chat with our Agent</span>
        <motion.span
          animate={
            isMobile || prefersReducedMotion
              ? {}
              : {
                  x: [0, 4, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          aria-hidden="true"
          className="text-blue-300"
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
});

AnimatedCTA.displayName = "AnimatedCTA";

// Memoized Interactive Service Selector with Fixed Tooltip Positioning
const HeroServiceSelector = memo(() => {
  const [activeService, setActiveService] = useState<
    (typeof servicePillars)[0] | null
  >(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const isMobile = useStableMobile();
  const prefersReducedMotion = useReducedMotion();
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateTooltipPosition = useCallback(
    (buttonElement: HTMLButtonElement) => {
      if (!buttonElement || isMobile) return;

      const rect = buttonElement.getBoundingClientRect();
      const tooltipWidth = 200;
      const tooltipHeight = 70;
      const margin = 16;

      let x = rect.left + rect.width / 2 - tooltipWidth / 2;
      let y = rect.top - tooltipHeight - margin;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Horizontal boundary checks
      if (x < 10) x = 10;
      if (x + tooltipWidth > viewportWidth - 10)
        x = viewportWidth - tooltipWidth - 10;

      // Vertical boundary checks
      if (y < 10) {
        y = rect.bottom + margin;
      }

      setTooltipPosition({ x, y, visible: true });
    },
    [isMobile],
  );

  const handleServiceHover = useCallback(
    (service: (typeof servicePillars)[0], index: number) => {
      setActiveService(service);

      if (!isMobile && iconRefs.current[index]) {
        calculateTooltipPosition(iconRefs.current[index]!);
      }

      if (!isMobile) {
        window.dispatchEvent(
          new CustomEvent("constellation-activate", {
            detail: { quadrant: service.quadrant },
          }),
        );
      }
    },
    [isMobile, calculateTooltipPosition],
  );

  const handleServiceLeave = useCallback(() => {
    setActiveService(null);
    setTooltipPosition((prev) => ({ ...prev, visible: false }));

    if (!isMobile) {
      window.dispatchEvent(new CustomEvent("constellation-deactivate"));
    }
  }, [isMobile]);

  const handleServiceClick = useCallback(
    (service: (typeof servicePillars)[0]) => {
      window.location.href = service.href;
    },
    [],
  );

  const handleKeyDown = useCallback(
    (
      event: React.KeyboardEvent,
      service: (typeof servicePillars)[0],
      index: number,
    ) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleServiceClick(service);
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = (index + 1) % servicePillars.length;
        iconRefs.current[nextIndex]?.focus();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        const prevIndex =
          (index - 1 + servicePillars.length) % servicePillars.length;
        iconRefs.current[prevIndex]?.focus();
      }
    },
    [handleServiceClick],
  );

  // Enhanced service labels mapping for premium dock
  const serviceLabels = {
    "Smart Research": isMobile ? "Research" : "Research",
    "Rapid AI Builds": isMobile ? "Build" : "Build",
    "Workflow Magic": isMobile ? "Flows" : "Workflows",
    "AI Training": isMobile ? "Learn" : "Learn",
  };

  // Portal-based tooltip component
  const TooltipPortal = useCallback(() => {
    if (
      !activeService ||
      !tooltipPosition.visible ||
      isMobile ||
      typeof window === "undefined"
    ) {
      return null;
    }

    return createPortal(
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 8, scale: 0.95 }
        }
        animate={
          prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
        }
        exit={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 8, scale: 0.95 }
        }
        transition={{
          duration: prefersReducedMotion ? 0.1 : 0.15,
          ease: [0.23, 1, 0.32, 1],
        }}
        className="fixed pointer-events-none z-[9999]"
        role="tooltip"
        aria-live="polite"
        style={{
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          width: "200px",
        }}
      >
        <div className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gray-900/25 dark:border-white/25 rounded-lg px-3 py-2 text-center shadow-xl">
          <h3
            className={`text-sm font-medium mb-0.5 ${activeService.iconColor}`}
          >
            {activeService.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs leading-tight">
            {activeService.description}
          </p>
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-0.5">
          <div className="w-1.5 h-1.5 bg-white/95 dark:bg-black/95 border-r border-b border-gray-900/25 dark:border-white/25 transform rotate-45"></div>
        </div>
      </motion.div>,
      document.body,
    );
  }, [activeService, tooltipPosition, isMobile, prefersReducedMotion]);

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className={`
          ${
            isMobile
              ? "grid grid-cols-2 gap-3 max-w-[280px] px-4 py-3"
              : "flex items-center gap-8 sm:gap-10 md:gap-12 px-6 sm:px-8 py-4 sm:py-5"
          } 
          bg-white/90 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-lg border border-gray-900/10 dark:border-white/5 mx-auto
        `}
        role="navigation"
        aria-label="Service categories"
      >
        {servicePillars.map((service, index) => (
          <div key={service.title} className="relative">
            <motion.button
              ref={(el) => {
                iconRefs.current[index] = el;
              }}
              className={`
                flex flex-col items-center gap-2 rounded-xl
                transition-all duration-300 cursor-pointer relative
                hover:bg-gray-900/5 dark:hover:bg-white/5 border border-transparent hover:border-gray-900/10 dark:hover:border-white/10
                focus:outline-none focus:ring-2 focus:ring-blue-400/50
                ${
                  isMobile
                    ? "min-h-[70px] min-w-[120px] p-3"
                    : "min-h-[80px] min-w-[80px] p-4 sm:p-5 gap-3"
                }
                ${activeService?.title === service.title ? "bg-gray-900/8 dark:bg-white/8 shadow-lg border-gray-900/10 dark:border-white/10" : ""}
              `}
              whileHover={
                prefersReducedMotion || isMobile
                  ? {}
                  : {
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.15 },
                    }
              }
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              onMouseEnter={() => handleServiceHover(service, index)}
              onMouseLeave={() => handleServiceLeave()}
              onFocus={() => handleServiceHover(service, index)}
              onBlur={() => handleServiceLeave()}
              onClick={() => handleServiceClick(service)}
              onKeyDown={(e) => handleKeyDown(e, service, index)}
              aria-label={`${service.title}: ${service.description}. Navigate to ${service.title} service page.`}
              tabIndex={0}
            >
              {/* Icon Container */}
              <div className="relative">
                <service.icon
                  className={`
                    ${isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"} 
                    ${service.iconColor} transition-all duration-300 group-hover:scale-110
                    drop-shadow-sm
                  `}
                  aria-hidden="true"
                />
              </div>

              {/* Premium Context Label */}
              <span
                className={`text-xs sm:text-sm font-medium transition-colors duration-300 tracking-wide uppercase ${service.iconColor} group-hover:text-gray-900 dark:group-hover:text-white`}
              >
                {serviceLabels[service.title as keyof typeof serviceLabels]}
              </span>
            </motion.button>
          </div>
        ))}
      </div>

      <TooltipPortal />
    </div>
  );
});

HeroServiceSelector.displayName = "HeroServiceSelector";

// Main Hero Section Component with Performance Monitoring
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px", amount: 0.05 });
  const isMobile = useStableMobile();
  const prefersReducedMotion = useReducedMotion();
  const { metrics } = usePerformanceMonitor();

  // Memoized animation variants
  const textReveal: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: isMobile ? 15 : 25,
        filter: isMobile ? "blur(0px)" : "blur(3px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 100,
          duration: isMobile ? 0.4 : 0.7,
        },
      },
    }),
    [isMobile],
  );

  const staggerContainer: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: isMobile ? 0.08 : 0.12,
          delayChildren: 0, // Removed blocking delay for immediate scroll response
        },
      },
    }),
    [isMobile],
  );

  // Performance monitoring and memory cleanup - DEVELOPMENT ONLY
  useEffect(() => {
    let logInterval: NodeJS.Timeout | undefined;

    // Only log in development and much less frequently
    if (process.env.NODE_ENV === "development") {
      logInterval = setInterval(() => {
        // Only log if there are performance issues
        if (metrics.fps < 30 || metrics.memoryUsage > 300) {
          console.log("Hero Performance Warning:", metrics);
        }
      }, 10000); // Every 10 seconds instead of 5
    }

    // Trigger aggressive cleanup if memory usage is very high
    if (metrics.memoryUsage > 320) {
      // Import and use WebGL context manager for cleanup
      import("../../lib/webgl-context-manager").then(
        ({ WebGLContextManager }) => {
          const manager = WebGLContextManager.getInstance();
          manager.forceCleanup();
        },
      );
    }

    return () => {
      if (logInterval) {
        clearInterval(logInterval);
      }
    };
  }, [metrics]); // Complete metrics object as dependency

  return (
    <section
      ref={ref}
      className={`
        ${
          isMobile
            ? "min-h-[100dvh] py-24 flex flex-col justify-center"
            : "min-h-screen flex items-end justify-center pt-24 pb-32 sm:pt-32 sm:pb-40 md:pt-36 md:pb-48 lg:pt-44 lg:pb-56"
        }
        bg-white dark:bg-black relative
      `}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        contain: "layout style paint",
        isolation: "isolate",
        // Mobile viewport handling
        ...(isMobile && {
          minHeight:
            "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
          paddingTop: "max(6rem, env(safe-area-inset-top) + 5rem)",
          paddingBottom: "max(6rem, env(safe-area-inset-bottom) + 5rem)",
        }),
      }}
    >
      {/* Tiered 3D Background System */}
      <TieredBackground />

      <BackgroundPattern />

      {/* Floating orbs - desktop only, stable memory thresholds */}
      {!isMobile &&
        metrics.memoryUsage < 320 && ( // More conservative threshold
          <>
            <FloatingOrb className="top-20 left-10 hidden lg:block" delay={0} />
            {metrics.memoryUsage < 300 && (
              <FloatingOrb
                className="bottom-20 right-20 hidden lg:block"
                delay={3}
              />
            )}
            {metrics.memoryUsage < 280 && (
              <FloatingOrb
                className="top-40 right-40 hidden xl:block"
                delay={6}
              />
            )}
          </>
        )}

      <div
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: "100%", overflow: "hidden" }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`
            ${
              isMobile
                ? "space-y-4"
                : "space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10"
            }
          `}
          style={{ overflow: "hidden", maxWidth: "100%" }}
        >
          {/* Main headline */}
          <motion.div
            variants={textReveal}
            className="space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-10 text-center"
          >
            <h1
              className={`
              ${isMobile ? "text-3xl" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"} 
              font-light leading-[1.1] tracking-tight
            `}
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-gray-900/95 dark:text-white/95 mr-2 sm:mr-4">
                  Build Your Own
                </span>
                <span className="relative pb-1">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-normal pb-1">
                    AI Advantage
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-[2px] sm:h-[3px] bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      delay: isMobile ? 0.3 : 0.5,
                      duration: isMobile ? 0.5 : 0.8,
                    }}
                  />
                </span>
              </motion.span>
            </h1>

            {/* Value proposition with improved contrast */}
            <div className="space-y-4 px-2 sm:px-4 lg:px-6">
              <p
                className={`
                ${isMobile ? "text-lg" : "text-xl sm:text-2xl md:text-3xl"} 
                text-gray-700 dark:text-gray-200 leading-relaxed max-w-4xl mx-auto font-light
              `}
              >
                Learn the tools. Master the workflows.{" "}
                <motion.span
                  className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent font-medium"
                  animate={
                    isMobile || prefersReducedMotion
                      ? {}
                      : {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                    willChange: "background-position",
                  }}
                >
                  Modernise your operations
                </motion.span>
                .
              </p>
            </div>
          </motion.div>

          {/* Animated CTA with tighter spacing */}
          <motion.div
            variants={textReveal}
            className={`text-center ${isMobile ? "pt-6" : "pt-8 sm:pt-10 md:pt-12"}`}
          >
            <AnimatedCTA />
          </motion.div>

          {/* Hero-Integrated Service Selector with closer dock placement */}
          <motion.div
            variants={textReveal}
            className={`text-center ${isMobile ? "pt-6" : "pt-8 sm:pt-10 md:pt-12"}`}
          >
            <HeroServiceSelector />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
