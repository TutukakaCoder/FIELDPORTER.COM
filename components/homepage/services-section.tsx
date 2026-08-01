"use client";

import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks";
import { trackServiceInterest } from "@/lib/firebase-analytics";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ChevronDown,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    id: "custom-portals",
    phase: "01",
    icon: Building2,
    title: "Custom Portals and Internal Tools",
    railLabel: "Portals & Internal Tools",
    tagline:
      "One secure place for the right people to see the right information and take action.",
    benefits: [
      "Role-based access for clients, staff, admins, investors or partners",
      "Dashboards, forms, uploads, approvals and activity tracking",
      "A focused alternative to spreadsheet, email and oversized SaaS workflows",
    ],
    timeline: "8-10 weeks typical",
  },
  {
    id: "databases-dashboards",
    phase: "02",
    icon: BarChart3,
    title: "Databases, Dashboards and Reporting",
    railLabel: "Databases & Dashboards",
    tagline:
      "Clean data models and reporting screens built around the decisions you make.",
    benefits: [
      "Custom databases for the information your business actually needs",
      "Management screens, reporting views, logs and decision dashboards",
      "A stronger data layer before automation or AI is added",
    ],
    timeline: "Scoped per build",
  },
  {
    id: "workflow-automation",
    phase: "03",
    icon: Workflow,
    title: "Workflow Automation and Integrations",
    railLabel: "Workflow Automation",
    tagline:
      "Automate handoffs, document intake, approvals, notifications and repeatable admin.",
    benefits: [
      "Connect CRMs, finance tools, email, forms, storage and existing systems",
      "Reduce manual chasing, re-keying and status updates",
      "Use n8n where it fits and custom code where ownership matters",
    ],
    timeline: "2-6 weeks or part of build",
  },
  {
    id: "ai-capability",
    phase: "04",
    icon: Sparkles,
    title: "AI Capability and Team Enablement",
    railLabel: "AI Capability",
    tagline:
      "Add AI where it is controlled, useful and connected to approved business data.",
    benefits: [
      "Secure chat over approved business information",
      "Document extraction, review, triage, summaries and recommendations",
      "Practical training so your team uses AI safely in daily work",
    ],
    timeline: "Built into scope",
  },
];

type Service = (typeof services)[0];

function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const onMouseEnter = useCallback(() => setActive(true), []);
  const onMouseLeave = useCallback(() => setActive(false), []);

  const style = {
    "--spotlight-x": `${pos.x}px`,
    "--spotlight-y": `${pos.y}px`,
    "--spotlight-opacity": active ? "1" : "0",
  } as CSSProperties;

  return { ref, style, onMouseMove, onMouseEnter, onMouseLeave };
}

const ServiceCard = memo(
  ({
    service,
    index,
    isActive,
    cardRef,
    reducedMotion,
  }: {
    service: Service;
    index: number;
    isActive: boolean;
    cardRef: (el: HTMLElement | null) => void;
    reducedMotion: boolean;
  }) => {
    const router = useRouter();
    const spotlight = useSpotlight();

    const handleServiceClick = useCallback(() => {
      trackServiceInterest(service.id, "learn_more", {
        service_name: service.title,
        location: "services_section",
      });
      router.push(`/services#${service.id}`);
    }, [service.id, service.title, router]);

    return (
      <motion.article
        ref={cardRef}
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: reducedMotion ? 0 : 0.6,
          delay: reducedMotion ? 0 : index * 0.06,
          ease: PREMIUM_EASE,
        }}
        className="group relative cursor-pointer touch-manipulation"
        data-service-id={service.id}
        onClick={handleServiceClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleServiceClick();
          }
        }}
      >
        <div
          ref={spotlight.ref}
          style={spotlight.style}
          onMouseMove={spotlight.onMouseMove}
          onMouseEnter={spotlight.onMouseEnter}
          onMouseLeave={spotlight.onMouseLeave}
          className={`
            relative overflow-hidden rounded-2xl border p-6 lg:p-8
            bg-gray-900/[0.02] dark:bg-white/[0.02]
            transition-[border-color,box-shadow] duration-300 ease-out
            hover:shadow-lg
            ${
              isActive
                ? "border-blue-400/40 dark:border-blue-400/30"
                : "border-gray-900/10 dark:border-white/10 hover:border-blue-400/30"
            }
          `}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[var(--spotlight-opacity)] transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(450px circle at var(--spotlight-x) var(--spotlight-y), rgba(59,130,246,0.1), transparent 40%)",
            }}
            aria-hidden
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/15 transition-colors duration-300">
                  <service.icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-400 dark:text-white/30 tabular-nums">
                  {service.phase}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-600/40 dark:text-white/40 mr-2">
                  Timeline
                </span>
                <span className="text-sm font-medium text-blue-400">
                  {service.timeline}
                </span>
              </div>
            </div>

            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white leading-tight tracking-[-0.01em] mb-2">
              {service.title}
            </h3>
            <p className="text-sm lg:text-base text-gray-700/80 dark:text-white/80 font-light leading-relaxed mb-4">
              {service.tagline}
            </p>

            <ul className="space-y-2 mb-5">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full mt-[9px] shrink-0 bg-blue-400" />
                  <span className="text-sm text-gray-600/70 dark:text-white/60 leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-gray-900/10 dark:border-white/10 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                Learn More
              </span>
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </motion.article>
    );
  },
);

ServiceCard.displayName = "ServiceCard";

const ServiceAccordionItem = memo(
  ({
    service,
    isOpen,
    onToggle,
  }: {
    service: Service;
    isOpen: boolean;
    onToggle: () => void;
  }) => {
    const panelId = useId();
    const buttonId = useId();
    const router = useRouter();

    const handleLearnMore = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        trackServiceInterest(service.id, "learn_more", {
          service_name: service.title,
          location: "services_section_mobile",
        });
        router.push(`/services#${service.id}`);
      },
      [service.id, service.title, router],
    );

    return (
      <div className="rounded-xl border border-blue-500/20 bg-gray-900/[0.02] dark:bg-white/[0.02] overflow-hidden">
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full text-left px-4 py-4 flex items-start gap-3 touch-manipulation"
        >
          <span className="text-xs font-medium text-blue-400 pt-0.5 shrink-0">
            {service.phase}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-base font-semibold text-gray-900 dark:text-white leading-snug">
              {service.title}
            </span>
            <span className="block mt-1 text-sm text-gray-600 dark:text-white/70 font-light line-clamp-1">
              {service.tagline}
            </span>
          </span>
          <ChevronDown
            className={`w-5 h-5 shrink-0 mt-0.5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          hidden={!isOpen}
          className={
            isOpen
              ? "px-4 pb-4 border-t border-gray-900/10 dark:border-white/10"
              : undefined
          }
        >
          {isOpen ? (
            <div className="pt-4 space-y-4">
              <p className="text-sm font-medium text-blue-400">
                Timeline: {service.timeline}
              </p>
              <ul className="space-y-2.5">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-blue-400" />
                    <span className="text-sm text-gray-600 dark:text-white/70 leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={handleLearnMore}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 pt-1"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

ServiceAccordionItem.displayName = "ServiceAccordionItem";

const ServicesMobileAccordion = memo(() => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3 md:hidden">
      {services.map((service) => (
        <ServiceAccordionItem
          key={service.id}
          service={service}
          isOpen={openId === service.id}
          onToggle={() =>
            setOpenId((current) =>
              current === service.id ? null : service.id,
            )
          }
        />
      ))}
    </div>
  );
});

ServicesMobileAccordion.displayName = "ServicesMobileAccordion";

const ServicesDesktopSplit = memo(
  ({ reducedMotion }: { reducedMotion: boolean }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const cardEls = useRef<(HTMLElement | null)[]>([]);
    const setCardRef = useCallback(
      (index: number) => (el: HTMLElement | null) => {
        cardEls.current[index] = el;
      },
      [],
    );

    useEffect(() => {
      const elements = cardEls.current.filter(Boolean) as HTMLElement[];
      if (elements.length === 0) return;

      // A card becomes active the moment it crosses a band around the
      // viewport center - snappy and unambiguous.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const id = entry.target.getAttribute("data-service-id");
            const idx = services.findIndex((s) => s.id === id);
            if (idx !== -1) setActiveIndex(idx);
          }
        },
        {
          threshold: 0,
          rootMargin: "-35% 0px -55% 0px",
        },
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, []);

    const scrollToCard = useCallback(
      (index: number) => {
        const el = cardEls.current[index];
        if (!el) return;
        el.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "center",
        });
      },
      [reducedMotion],
    );

    return (
      <div className="hidden md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
        <aside className="sticky top-28 self-start" aria-label="Service navigation">
          <nav className="flex flex-col">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  aria-current={isActive ? "true" : undefined}
                  className={`
                    group/nav relative flex items-center gap-3 py-3.5 pl-5 text-left
                    border-l-2 transition-colors duration-200
                    ${
                      isActive
                        ? "border-blue-500"
                        : "border-gray-900/10 dark:border-white/10 hover:border-gray-900/30 dark:hover:border-white/30"
                    }
                  `}
                >
                  <span
                    className={`text-xs font-medium tabular-nums transition-colors duration-200 ${
                      isActive
                        ? "text-blue-400"
                        : "text-gray-400 dark:text-white/30"
                    }`}
                  >
                    {service.phase}
                  </span>
                  <span
                    className={`text-sm leading-snug transition-colors duration-200 ${
                      isActive
                        ? "font-semibold text-gray-900 dark:text-white"
                        : "font-normal text-gray-500 dark:text-white/50 group-hover/nav:text-gray-700 dark:group-hover/nav:text-white/70"
                    }`}
                  >
                    {service.railLabel}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pl-5">
            <Button variant="secondary" size="sm" className="group" asChild>
              <Link href="/services" className="inline-flex items-center gap-2">
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </aside>

        <div className="flex flex-col gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeIndex === index}
              cardRef={setCardRef(index)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    );
  },
);

ServicesDesktopSplit.displayName = "ServicesDesktopSplit";

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const headingY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [28, 0],
  );
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.6],
    prefersReducedMotion ? [1, 1] : [0.4, 1],
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative section-rhythm-lg overflow-x-clip bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={
            {
              y: headingY,
              opacity: headingOpacity,
            } as MotionStyle
          }
          className="text-center mb-8 md:mb-14"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 md:mb-4">
            What We Build
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-700 dark:from-white dark:to-white/70 mb-4 md:mb-6 leading-[1.15] pb-1 md:pb-2 break-words">
            Software for workflows generic tools do not fit.
          </h2>
          <p className="section-copy max-w-3xl mx-auto font-light">
            We design and build the core systems your team, clients, and partners
            use to see the right information and get work done.
          </p>
        </motion.div>

        <ServicesMobileAccordion />
        <ServicesDesktopSplit reducedMotion={!!prefersReducedMotion} />

        <div className="text-center mt-10 md:hidden">
          <Button variant="secondary" size="lg" className="group" asChild>
            <Link href="/services" className="inline-flex items-center gap-3">
              Explore Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
