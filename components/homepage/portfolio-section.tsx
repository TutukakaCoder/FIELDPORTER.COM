"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Code, Quote } from "lucide-react";
import { memo } from "react";

const projects = [
  {
    id: "voluntas-intelligence",
    icon: Building2,
    title: "VOLOCEAN Client and Investment Management Platform",
    tagline:
      "Client and investment management platform. 21 clients, 70 portfolio submissions. Building for 6 months, still evolving.",
    status: "Live • 21 Clients",
  },
  {
    id: "papps-mastery",
    icon: Code,
    title: "Self Development Platform",
    tagline:
      "Life-coach platform in production 12+ months. Rebuilt from the ground up with ongoing feature delivery.",
    status: "Production",
  },
];

const jasonTestimonial = {
  quote:
    "We wanted to create an AI platform to help run our advisory business, something that could manage clients, streamline admin and help automate our service delivery. Freddy took the time to really understand what we needed and delivered something right on the mark, fast, professional, and great to work with.",
  author: "Jason Holdsworth",
    role: "Founding Partner - VOLOCEAN",
  projectResult:
    "85% onboarding time saved; 21 clients, 70 submissions on the platform.",
  image: "/images/jason-h-profile.jpg",
};

const ProjectCard = memo(
  ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
    const Icon = project.icon;

    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <Link
          href="/portfolio"
          className="group block h-full rounded-2xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02] p-6 sm:p-8 transition-colors duration-300 hover:border-gray-900/20 dark:hover:border-white/20"
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="p-3 rounded-xl bg-gray-900/10 dark:bg-white/10 border border-gray-900/20 dark:border-white/20">
              <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400 border border-green-500/20 bg-green-500/10 px-2.5 py-1 rounded-full">
              {project.status}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight mb-3">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 font-light leading-relaxed mb-6">
            {project.tagline}
          </p>

          <div className="flex items-center gap-2 text-sm font-medium text-blue-500 dark:text-blue-400 group-hover:gap-3 transition-all duration-300">
            <span>View work</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </motion.article>
    );
  },
);

ProjectCard.displayName = "ProjectCard";

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative section-rhythm-lg overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-6 leading-tight tracking-[-0.02em] break-words">
            Live client work
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Production platforms we built and continue to improve with clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto rounded-2xl border border-gray-900/10 dark:border-white/10 bg-gray-900/[0.02] dark:bg-white/[0.02] p-6 sm:p-8 md:p-10"
        >
          <Quote
            className="w-8 h-8 text-blue-500/50 dark:text-blue-400/50 mb-4"
            aria-hidden
          />
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-light mb-6">
            &ldquo;{jasonTestimonial.quote}&rdquo;
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {jasonTestimonial.projectResult}
          </p>
          <footer className="flex items-center gap-4">
            <Image
              src={jasonTestimonial.image}
              alt={jasonTestimonial.author}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <cite className="not-italic font-semibold text-gray-900 dark:text-white">
                {jasonTestimonial.author}
              </cite>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {jasonTestimonial.role}
              </p>
            </div>
          </footer>
        </motion.blockquote>

        <div className="text-center mt-12">
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
