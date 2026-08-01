"use client";

import { useReducedMotion } from "@/hooks";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import {
  memo,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

type ProjectCardData = {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  status: string;
  statusTone: "live" | "uat";
  category: string;
  image: string;
};

const projects: ProjectCardData[] = [
  {
    id: "voluntas-intelligence",
    title: "VOLOCEAN Client and Investment Management Platform",
    shortTitle: "VOLOCEAN Platform",
    tagline:
      "Shared management platform for clients, investors, advisors, and staff. 805 investors in the network. Live about 9 months.",
    status: "Live • 9 Months",
    statusTone: "live",
    category: "Client and investment management",
    image: "/portfolio/volocean/dashboard-hero.png",
  },
  {
    id: "gogoprop",
    title: "GoGoProp Portal",
    shortTitle: "GoGoProp Portal",
    tagline:
      "Specialist lending portal from enquiry through identity checks. Purpose-built pipeline, deal tools, and client portal, currently in active client testing ahead of launch.",
    status: "IN DEVELOPMENT • CLIENT UAT",
    statusTone: "uat",
    category: "Property finance",
    image: "/portfolio/gogoprop/dashboard-hero.png",
  },
];

const jasonTestimonial = {
  quote:
    "Freddy took the time to really understand what we needed and delivered something right on the mark, fast, professional, and great to work with.",
  fullQuote:
    "We wanted to create an AI platform to help run our advisory business, something that could manage clients, streamline admin and help automate our service delivery. Freddy took the time to really understand what we needed and delivered something right on the mark, fast, professional, and great to work with.",
  author: "Jason Holdsworth",
  role: "Founding Partner - VOLOCEAN",
  projectResult: "805 investors on the platform, live about 9 months.",
  image: "/images/jason-h-profile.jpg",
};

const statusClass = {
  live: "text-green-600 dark:text-green-400 border-green-500/20 bg-green-500/10",
  uat: "text-amber-700 dark:text-amber-400 border-amber-500/25 bg-amber-500/10",
} as const;

function useSpotlight() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
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

const ProjectCard = memo(
  ({
    project,
    index,
    reducedMotion,
  }: {
    project: ProjectCardData;
    index: number;
    reducedMotion: boolean;
  }) => {
    const spotlight = useSpotlight();

    return (
      <motion.article
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          delay: reducedMotion ? 0 : index * 0.1,
          duration: reducedMotion ? 0 : 0.6,
          ease: PREMIUM_EASE,
        }}
      >
        <Link
          ref={spotlight.ref}
          href="/portfolio"
          style={spotlight.style}
          onMouseMove={spotlight.onMouseMove}
          onMouseEnter={spotlight.onMouseEnter}
          onMouseLeave={spotlight.onMouseLeave}
          className="group relative block h-full overflow-hidden rounded-2xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02] transition-colors duration-300 hover:border-blue-400/30 dark:hover:border-blue-400/30"
        >
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[var(--spotlight-opacity)] transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(450px circle at var(--spotlight-x) var(--spotlight-y), rgba(59,130,246,0.1), transparent 40%)",
            }}
            aria-hidden
          />

          <div className="relative aspect-[16/9] overflow-hidden bg-gray-900/40 border-b border-gray-900/10 dark:border-white/10">
            <Image
              src={project.image}
              alt={`${project.title} product interface`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="relative z-20 p-4 sm:p-6 md:p-8">
            <div className="mb-3 sm:mb-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {project.category}
            </div>

            <span
              className={`inline-block text-xs font-medium border px-2.5 py-1 rounded-full mb-3 ${statusClass[project.statusTone]}`}
            >
              {project.status}
            </span>

            <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight mb-2 sm:mb-3">
              <span className="md:hidden">{project.shortTitle}</span>
              <span className="hidden md:inline">{project.title}</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 font-light leading-relaxed mb-4 sm:mb-6 line-clamp-2 md:line-clamp-none">
              {project.tagline}
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-blue-500 dark:text-blue-400 group-hover:gap-3 transition-all duration-300">
              <span>View work</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </motion.article>
    );
  },
);

ProjectCard.displayName = "ProjectCard";

export function PortfolioSection() {
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
      id="portfolio"
      className="relative section-rhythm-lg overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={
            {
              y: headingY,
              opacity: headingOpacity,
            } as MotionStyle
          }
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight tracking-[-0.02em] break-words">
            Live client work
          </h2>
          <p className="section-copy max-w-3xl mx-auto font-light">
            Production platforms and active client builds we continue to improve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              reducedMotion={!!prefersReducedMotion}
            />
          ))}
        </div>

        <motion.blockquote
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: PREMIUM_EASE,
          }}
          className="max-w-3xl mx-auto rounded-2xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02] p-4 sm:p-6 md:p-10"
        >
          <Quote
            className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500/50 dark:text-blue-400/50 mb-3 sm:mb-4"
            aria-hidden
          />
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-light mb-4 sm:mb-6 line-clamp-2 md:line-clamp-none">
            <span className="md:hidden">
              &ldquo;{jasonTestimonial.quote}&rdquo;
            </span>
            <span className="hidden md:inline">
              &ldquo;{jasonTestimonial.fullQuote}&rdquo;
            </span>
          </p>
          <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400 mb-6">
            {jasonTestimonial.projectResult}
          </p>
          <footer className="flex items-center gap-3 sm:gap-4">
            <Image
              src={jasonTestimonial.image}
              alt={jasonTestimonial.author}
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10 sm:w-12 sm:h-12"
            />
            <div>
              <cite className="not-italic font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                {jasonTestimonial.author}
              </cite>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {jasonTestimonial.role}
              </p>
            </div>
          </footer>
        </motion.blockquote>

        <div className="text-center mt-8 md:mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 dark:text-blue-400 hover:gap-3 transition-all duration-300"
          >
            See full portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
