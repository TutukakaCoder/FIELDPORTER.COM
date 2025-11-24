"use client";

import { useHorizontalSwipe } from "@/hooks";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  FileText,
  Filter,
  Search,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface MethodologyPhase {
  id: string;
  number: string;
  title: string;
  value: string;
  time: string;
  example: string;
  icon: any;
  color: string;
  colorRgb: string;
}

interface MethodologySectionProps {
  title: string;
  subtitle: string;
  phases?: any[]; // Legacy prop - we'll use our own phases
}

const phases: MethodologyPhase[] = [
  {
    id: "context",
    number: "01",
    title: "Data Structuring for AI",
    value:
      "We gather your business information and structure it for optimal AI processing",
    time: "",
    example:
      "Example: We collect your documents, processes, and objectives, then organize them into a format that AI models can efficiently analyze and reference throughout the research process.",
    icon: Upload,
    color: "from-blue-500 to-blue-600",
    colorRgb: "59, 130, 246",
  },
  {
    id: "research",
    number: "02",
    title: "Multi-Model Research",
    value:
      "Deploy multiple AI models to conduct comprehensive research based on your needs",
    time: "",
    example:
      "Example: Using Claude for deep analysis, Perplexity for real-time data, and specialized models for industry-specific insights, all working in parallel to gather comprehensive information.",
    icon: Search,
    color: "from-purple-500 to-purple-600",
    colorRgb: "139, 92, 246",
  },
  {
    id: "filter",
    number: "03",
    title: "Strategic Filtering",
    value: "Extract only the insights that matter for your specific objectives",
    time: "",
    example:
      "Example: From hundreds of data points, we identify the critical insights that directly impact your decision-making, removing noise and focusing on actionable intelligence.",
    icon: Filter,
    color: "from-emerald-500 to-emerald-600",
    colorRgb: "16, 185, 129",
  },
  {
    id: "verify",
    number: "04",
    title: "Cross-Model Validation",
    value:
      "Verify accuracy by cross-referencing findings across different AI models",
    time: "",
    example:
      "Example: Each key finding is validated through multiple AI models and source verification to ensure accuracy and eliminate any potential AI hallucinations or biases.",
    icon: CheckCircle,
    color: "from-orange-500 to-orange-600",
    colorRgb: "251, 146, 60",
  },
  {
    id: "deliver",
    number: "05",
    title: "Direct Documentation",
    value: "Deliver clear, organized documentation tailored to your needs",
    time: "",
    example:
      "Example: You receive structured documentation with findings, insights, and recommendations in a format that directly supports your decision-making process.",
    icon: FileText,
    color: "from-green-500 to-green-600",
    colorRgb: "34, 197, 94",
  },
];

// Simple scroll indicator
const ScrollIndicator = () => (
  <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-8 pointer-events-none z-20">
    <motion.div
      className="flex items-center gap-2 bg-gray-900/50 dark:bg-black/50 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-900/10 dark:border-white/10"
      animate={{ x: [0, 6, 0] }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }}
    >
      <span className="text-xs text-gray-600 dark:text-white/60">
        Auto-scrolling
      </span>
      <ArrowRight className="w-3 h-3 text-gray-600 dark:text-white/60" />
    </motion.div>
  </div>
);

const InteractivePhaseCard = ({
  phase,
  index,
  isMobile,
}: {
  phase: MethodologyPhase;
  index: number;
  isMobile: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="methodology-card relative flex-shrink-0 w-[320px] sm:w-[360px] lg:w-[400px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Simplified card with smooth height expansion */}
      <motion.div
        className="relative p-6 sm:p-8 rounded-2xl border border-gray-900/10 dark:border-white/10 bg-white dark:bg-black hover:border-gray-900/20 dark:hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
        animate={{
          height: isExpanded ? "auto" : isMobile ? 380 : 420,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Number badge moved to top-right and made smaller */}
        <div
          className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, 
              rgba(${phase.colorRgb}, 0.2) 0%, 
              rgba(${phase.colorRgb}, 0.1) 100%
            )`,
            border: `2px solid rgba(${phase.colorRgb}, 0.5)`,
            backdropFilter: "blur(10px)",
            boxShadow: `0 0 20px rgba(${phase.colorRgb}, 0.3)`,
          }}
        >
          <span className="text-lg font-light text-gray-900 dark:text-white">
            {phase.number}
          </span>
        </div>

        {/* Subtle background number watermark */}
        <div
          className="absolute top-4 right-4 text-6xl font-thin select-none pointer-events-none"
          style={{ color: `rgba(${phase.colorRgb}, 0.08)` }}
        >
          {phase.number}
        </div>

        {/* Main content */}
        <div className="relative z-10 pt-12">
          {/* Icon - made bigger */}
          <motion.div
            animate={
              isExpanded ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg`}
            >
              <phase.icon className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-4 leading-tight">
            {phase.title}
          </h3>

          {/* Value proposition */}
          <p className="text-gray-700 dark:text-white/70 text-lg leading-relaxed mb-6">
            {phase.value}
          </p>

          {/* Expand button */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-white/40 mb-4">
            <span className="text-sm">See example</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Expanded content - real example */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-900/10 dark:border-white/10 pt-6 mt-6"
              >
                <h4 className="text-lg font-light text-gray-900 dark:text-white mb-3">
                  Real Example:
                </h4>
                <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                  {phase.example}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function MethodologySection({
  title,
  subtitle,
}: MethodologySectionProps) {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Simplified scroll state
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const manualScrollTimeout = useRef<NodeJS.Timeout>();
  const animationRef = useRef<number>();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Swipe navigation functions
  const scrollToNext = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = isMobile ? 360 : 432;
      const currentScrollLeft = container.scrollLeft;
      const nextPosition = Math.min(
        currentScrollLeft + cardWidth,
        cardWidth * phases.length,
      );
      container.scrollTo({ left: nextPosition, behavior: "smooth" });
      handleManualScroll();
    }
  };

  const scrollToPrevious = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = isMobile ? 360 : 432;
      const currentScrollLeft = container.scrollLeft;
      const prevPosition = Math.max(currentScrollLeft - cardWidth, 0);
      container.scrollTo({ left: prevPosition, behavior: "smooth" });
      handleManualScroll();
    }
  };

  // Add swipe gesture support
  const swipeHandlers = useHorizontalSwipe(scrollToPrevious, scrollToNext);

  // Continuous auto-scroll with smooth infinite loop
  useEffect(() => {
    if (!isInView) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = isMobile ? 360 : 432; // card width + gap
    const totalWidth = cardWidth * phases.length; // 5 cards total width
    let currentPosition = container.scrollLeft;

    const animate = () => {
      if (isManualScrolling) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      currentPosition += 0.5; // Smooth speed

      // Smooth infinite loop - when we reach the end, seamlessly reset
      if (currentPosition >= totalWidth) {
        currentPosition = 0;
      }

      container.scrollLeft = currentPosition;
      setScrollPosition(currentPosition);

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start immediately
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, isManualScrolling, isMobile]);

  // Handle manual scroll with temporary pause
  const handleManualScroll = useCallback(() => {
    setIsManualScrolling(true);
    clearTimeout(manualScrollTimeout.current);

    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }

    manualScrollTimeout.current = setTimeout(() => {
      setIsManualScrolling(false);
    }, 3000);
  }, []);

  return (
    <section ref={ref} className="py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Clear, accurate header */}
        <motion.div
          className="text-center mb-20 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6 tracking-tight">
            Our Deep Research Process
          </h2>
          <p className="text-xl text-gray-700 dark:text-white/70 max-w-3xl mx-auto mb-4">
            Real examples of how we use AI to deliver comprehensive insights in
            hours, not weeks
          </p>
          <p className="text-sm text-gray-600 dark:text-white/50 max-w-2xl mx-auto">
            Every project is different. These examples show our typical
            approach, but we adapt our process to match your specific needs.
          </p>
        </motion.div>

        {/* Fixed cards container */}
        <div className="relative min-h-[600px]">
          {/* Scrollable cards with proper positioning and swipe support */}
          <div
            ref={scrollContainerRef}
            className="relative overflow-x-auto scrollbar-hide"
            onWheel={handleManualScroll}
            {...swipeHandlers}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              position: "relative", // Fix positioning warning
            }}
          >
            <div
              className="flex gap-8 pb-12 px-4"
              style={{
                width: `${(isMobile ? 360 : 432) * phases.length * 2}px`, // Double width for seamless loop
              }}
            >
              {/* Render phases twice for seamless infinite loop */}
              {[...phases, ...phases].map((phase, i) => (
                <InteractivePhaseCard
                  key={`${phase.id}-${Math.floor(i / phases.length)}`}
                  phase={phase}
                  index={i % phases.length}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>

          <ScrollIndicator />
        </div>

        {/* Simple progress indicators */}
        <div className="flex justify-center gap-3 mt-16">
          {phases.map((phase, i) => {
            const cardWidth = isMobile ? 360 : 432;
            const currentPhase =
              Math.floor(scrollPosition / cardWidth) % phases.length;
            const isActive = currentPhase === i;

            return (
              <motion.div
                key={i}
                className="h-1 rounded-full transition-all duration-500"
                animate={{
                  width: isActive ? 40 : 12,
                  backgroundColor: isActive
                    ? `rgba(${phase.colorRgb}, 0.9)`
                    : "rgba(255,255,255,0.3)",
                }}
                style={{
                  boxShadow: isActive
                    ? `0 0 8px rgba(${phase.colorRgb}, 0.5)`
                    : "none",
                }}
              />
            );
          })}
        </div>

        {/* Updated bottom summary without timeline references */}
        <motion.div
          className="text-center mt-20 pt-16 border-t border-gray-900/10 dark:border-white/10 relative z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto leading-relaxed mb-4">
            Every research project is customized to your specific needs and
            objectives. This process adapts to deliver exactly the insights you
            need.
          </p>
          <p className="text-sm text-gray-500 dark:text-white/40 max-w-2xl mx-auto">
            Have a specific research challenge? Let's discuss how we can tailor
            this process for you.
          </p>
        </motion.div>
      </div>

      {/* Simple CSS for hover effects */}
      <style jsx>{`
        .methodology-card {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .methodology-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
