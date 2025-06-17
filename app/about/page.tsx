'use client';

import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { easeInOut, motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Building2,
  Cloud,
  Code,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Settings,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Premium Aurora Background Component
function PremiumAuroraBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black' />
      <motion.div
        className='absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[120px] opacity-10'
        style={{
          background:
            'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
        }}
        animate={{
          x: [0, 200, -150, 0],
          y: [0, -100, 150, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className='absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-[100px] opacity-12'
        style={{
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(239, 68, 68, 0.2) 50%, transparent 100%)',
        }}
        animate={{
          x: [0, -180, 120, 0],
          y: [0, 120, -180, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// Interactive Spotlight Component
function InteractiveSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className='fixed inset-0 pointer-events-none z-5'
      style={{
        background: `radial-gradient(500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 50%)`,
      }}
    />
  );
}

const systematicApproach = [
  {
    number: '01',
    title: 'Analyze & Research',
    description:
      'Deep business analysis using our systematic research methodology to understand current state and identify optimization opportunities.',
    color: 'border-blue-500/30 text-blue-400',
  },
  {
    number: '02',
    title: 'Build & Test',
    description:
      'Rapid prototyping and proof-of-concept development to validate technical feasibility and business value before full implementation.',
    color: 'border-purple-500/30 text-purple-400',
  },
  {
    number: '03',
    title: 'Implement & Optimize',
    description:
      'Full deployment with continuous monitoring and optimization to ensure maximum business impact and seamless integration.',
    color: 'border-emerald-500/30 text-emerald-400',
  },
];

const developmentCapabilities = [
  {
    icon: TrendingUp,
    title: 'Strategic Research Intelligence',
    description:
      'Systematic methodology processing thousands of sources with multi-model validation for comprehensive business intelligence.',
    color: 'border-blue-500/30 text-blue-400',
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description:
      'React, TypeScript, Firebase, and MongoDB expertise with AI integration across modern web applications.',
    color: 'border-purple-500/30 text-purple-400',
  },
  {
    icon: Zap,
    title: 'Process Automation',
    description:
      'Business workflow optimization using n8n and custom solutions that eliminate manual tasks and improve efficiency.',
    color: 'border-emerald-500/30 text-emerald-400',
  },
];

const comprehensiveTechStack = [
  {
    category: 'AI & Analysis',
    tools: [
      {
        name: 'Claude',
        icon: Brain,
        description: 'Analysis, content generation, and research automation',
      },
      {
        name: 'OpenAI',
        icon: Cpu,
        description: 'GPT models for complex reasoning and specialized tasks',
      },
      {
        name: 'Gemini',
        icon: Globe,
        description: 'Document processing and comprehensive analysis',
      },
    ],
  },
  {
    category: 'Development & Infrastructure',
    tools: [
      {
        name: 'Cursor',
        icon: Code,
        description: 'AI-powered development environment for rapid prototyping',
      },
      {
        name: 'Firebase',
        icon: Cloud,
        description: 'Real-time applications and scalable backend infrastructure',
      },
      {
        name: 'MongoDB',
        icon: Database,
        description: 'Database solutions for complex data structures',
      },
    ],
  },
  {
    category: 'Automation & Integration',
    tools: [
      {
        name: 'GitHub',
        icon: GitBranch,
        description: 'Version control and collaborative development workflows',
      },
      {
        name: 'n8n',
        icon: Settings,
        description: 'Business process automation and service integration',
      },
      {
        name: 'DeepSeek',
        icon: Zap,
        description: 'Cost-effective AI processing for production systems',
      },
    ],
  },
];

export default function AboutPage() {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [200, 600, 1000], [1, 0.9, 0.7]);
  const springContentY = useSpring(contentY, { damping: 30, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-10%' });

  return (
    <PageWrapper>
      <PremiumAuroraBackground />
      <InteractiveSpotlight />

      <motion.div
        style={{ y: springContentY, opacity: springOpacity }}
        className='relative z-10 will-change-transform'
      >
        {/* Hero Section */}
        <section
          ref={heroRef}
          className='relative pt-24 md:pt-32 lg:pt-20 pb-16 md:pb-20 lg:pb-24 overflow-hidden'
        >
          <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1.0, ease: easeInOut }}
              className='text-center space-y-6 md:space-y-8'
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1.0, delay: 0.2, ease: easeInOut }}
                className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.02em] bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'
              >
                About FIELDPORTER
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1.0, delay: 0.4, ease: easeInOut }}
                className='text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light'
              >
                We build AI solutions while helping businesses implement them
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Company Foundation */}
        <motion.section
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0, duration: 0.8, ease: easeInOut }}
          className='relative py-16 md:py-20 lg:py-24 overflow-hidden'
        >
          <div className='absolute inset-0 bg-white/5' />
          <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
              <div className='space-y-6 md:space-y-8'>
                <h2 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                  Established Consultancy, AI Specialists
                </h2>
                <div className='space-y-4 text-gray-300 text-lg leading-relaxed'>
                  <p>
                    FIELDPORTER is an established business consultancy that has evolved into AI
                    implementation specialists. We focus on building working solutions rather than
                    just providing theoretical advice.
                  </p>
                  <p>
                    Our approach combines systematic business methodology with hands-on AI
                    development. We stay current with the latest AI developments and test new tools
                    in our own projects before recommending them to clients.
                  </p>
                  <p className='text-blue-400 font-semibold'>
                    Every AI solution we suggest comes from hands-on experience with real
                    implementations.
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className='relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-500 ease-out will-change-transform group'
              >
                <div className='absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl' />
                <div className='absolute inset-0 rounded-2xl border border-white/5' />
                <div className='relative z-10 space-y-6'>
                  <div className='w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center'>
                    <Building2 className='w-6 h-6 text-blue-400' />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-white mb-2'>
                      We Build What We Recommend
                    </h3>
                    <p className='text-gray-400 leading-relaxed'>
                      Our consultancy advice comes directly from building and operating our own AI
                      systems, not just theoretical knowledge.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Systematic Approach */}
        <motion.section
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.15, duration: 0.8, ease: easeInOut }}
          className='relative py-16 md:py-20 lg:py-24 overflow-hidden'
        >
          <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center space-y-6 md:space-y-8 mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                Our Systematic Approach
              </h2>
              <p className='text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed'>
                A proven methodology that combines strategic analysis with rapid implementation
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {systematicApproach.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.8, ease: easeInOut }}
                  className='relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-500 ease-out will-change-transform group border-blue-500/30 hover:shadow-2xl'
                >
                  <div className='absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl' />
                  <div className='absolute inset-0 rounded-2xl border border-white/5' />
                  <div className='relative z-10 space-y-6'>
                    <div className='text-4xl font-bold text-blue-400'>{step.number}</div>
                    <h3 className='text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300'>
                      {step.title}
                    </h3>
                    <p className='text-gray-400 leading-relaxed group-hover:text-white transition-colors duration-300'>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Technical Capability */}
        <motion.section
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.3, duration: 0.8, ease: easeInOut }}
          className='relative py-16 md:py-20 lg:py-24 overflow-hidden'
        >
          <div className='absolute inset-0 bg-white/5' />
          <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center space-y-6 md:space-y-8 mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                Technical Capability
              </h2>
              <p className='text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed'>
                Core competencies that drive business transformation
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {developmentCapabilities.map((capability, index) => {
                const IconComponent = capability.icon;
                return (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.8, ease: easeInOut }}
                    className='relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-500 ease-out will-change-transform group border-blue-500/30 hover:shadow-2xl'
                  >
                    <div className='absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl' />
                    <div className='absolute inset-0 rounded-2xl border border-white/5' />
                    <div className='relative z-10 space-y-6'>
                      <div className='w-12 h-12 rounded-xl bg-white/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                        <IconComponent className='w-6 h-6 text-blue-400' />
                      </div>
                      <h3 className='text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300'>
                        {capability.title}
                      </h3>
                      <p className='text-gray-400 leading-relaxed group-hover:text-white transition-colors duration-300'>
                        {capability.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Comprehensive Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.45, duration: 0.8, ease: easeInOut }}
          className='relative py-16 md:py-20 lg:py-24 overflow-hidden'
        >
          <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center space-y-6 md:space-y-8 mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                Comprehensive Tech Stack
              </h2>
              <p className='text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed'>
                Modern tools and frameworks for scalable AI implementation
              </p>
            </div>

            {comprehensiveTechStack.map((category, categoryIndex) => (
              <div key={category.category} className='mb-12 last:mb-0'>
                <h3 className='text-2xl font-semibold text-white mb-8 text-center'>
                  {category.category}
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {category.tools.map((tool, toolIndex) => {
                    const IconComponent = tool.icon;
                    return (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: categoryIndex * 0.2 + toolIndex * 0.1,
                          duration: 0.6,
                          ease: easeInOut,
                        }}
                        className='relative p-6 rounded-xl backdrop-blur-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-300 ease-out will-change-transform group'
                      >
                        <div className='absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-xl' />
                        <div className='absolute inset-0 rounded-xl border border-white/5' />
                        <div className='relative z-10 flex items-center space-x-4'>
                          <div className='w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                            <IconComponent className='w-5 h-5 text-blue-400' />
                          </div>
                          <div className='flex-1'>
                            <h4 className='font-semibold text-white group-hover:text-blue-400 transition-colors duration-300'>
                              {tool.name}
                            </h4>
                            <p className='text-sm text-gray-400 leading-relaxed group-hover:text-white transition-colors duration-300'>
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.6, duration: 0.8, ease: easeInOut }}
          className='relative py-16 md:py-20 lg:py-24 overflow-hidden'
        >
          <div className='absolute inset-0 bg-white/5' />
          <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className='relative p-8 md:p-12 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-500 ease-out will-change-transform'
            >
              <div className='absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl' />
              <div className='absolute inset-0 rounded-2xl border border-white/5' />
              <div className='relative z-10 space-y-6'>
                <h2 className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                  Ready to Discuss Your AI Implementation?
                </h2>
                <p className='text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed'>
                  Let&apos;s explore how our systematic approach can accelerate your business
                  transformation
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant='default'
                      size='lg'
                      className='bg-blue-600 hover:bg-blue-700 text-white border-0 px-8 py-3 text-lg font-semibold'
                      asChild
                    >
                      <Link href='/contact'>
                        Schedule Discussion
                        <ArrowRight className='ml-2 h-5 w-5' />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant='outline'
                      size='lg'
                      className='border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold'
                      asChild
                    >
                      <Link href='/services'>
                        View Services
                        <ArrowRight className='ml-2 h-5 w-5' />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </PageWrapper>
  );
}
