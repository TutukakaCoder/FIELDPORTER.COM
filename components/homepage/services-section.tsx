'use client';

import { trackServiceInterest } from '@/lib/firebase-analytics';
import {
  AnimatePresence,
  easeInOut,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const services = [
  {
    id: 'strategic-research',
    phase: '01',
    icon: TrendingUp,
    title: 'Strategic Research & Intelligence',
    tagline: 'Deep market analysis delivered in days, not weeks',
    keyBenefits: [
      'Multi-source research across thousands of data points and databases',
      'Strategic insights for market entry, competitive positioning, and opportunity identification',
    ],
    extendedBenefits: [
      'Regulatory landscape analysis and compliance requirements mapping',
      'Technology trend assessment and emerging market identification',
    ],
    quickExamples: ['Market sizing', 'Due diligence', 'Competitor intel', 'Tech scouting'],
    timeline: '3-5 days',
    timelineStyle: 'prototype',
    iconColor: 'text-emerald-300',
    glowColor: 'bg-emerald-500/10',
    hoverGlow: 'shadow-[0_0_30px_rgba(16,185,129,0.4)]',
  },
  {
    id: 'rapid-development',
    phase: '02',
    icon: Code,
    title: 'Rapid Development & Integration',
    tagline: 'Working systems in weeks, from concept to deployment',
    keyBenefits: [
      'Functional prototypes and production-ready applications',
      'API integrations connecting your existing tools and workflows',
    ],
    extendedBenefits: [
      'Complete technical documentation and team handoff procedures',
      'Modern tech stack implementation with scalability considerations',
    ],
    quickExamples: ['AI chat systems', 'Custom dashboards', 'API integration', 'Web apps'],
    timeline: '1-2 weeks',
    timelineStyle: 'training',
    iconColor: 'text-blue-300',
    glowColor: 'bg-blue-500/10',
    hoverGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.4)]',
  },
  {
    id: 'workflow-optimization',
    phase: '03',
    icon: Building2,
    title: 'Workflow Automation & Optimisation',
    tagline: 'Reclaim 10-40 hours weekly through systematic automation',
    keyBenefits: [
      'Business process analysis and bottleneck identification',
      'Automated workflows for lead generation, reporting, and data processing',
    ],
    extendedBenefits: [
      'Marketing automation including social media and email sequences',
      'Administrative task elimination across invoicing, scheduling, and communications',
    ],
    quickExamples: ['Sales workflows', 'Report automation', 'Data sync', 'Email sequences'],
    timeline: '2-4 weeks',
    timelineStyle: 'research',
    iconColor: 'text-purple-300',
    glowColor: 'bg-purple-500/10',
    hoverGlow: 'shadow-[0_0_30px_rgba(168,85,247,0.4)]',
  },
  {
    id: 'ai-training',
    phase: '04',
    icon: BookOpen,
    title: 'AI Training & Implementation',
    tagline: 'Build in-house AI capabilities, reduce external dependencies',
    keyBenefits: [
      'Industry-specific AI strategy development and practical implementation',
      'Custom knowledge systems using your data and business processes',
    ],
    extendedBenefits: [
      'Team workshops on Claude, ChatGPT, Perplexity, and specialized tools',
      'Ongoing support for sustainable AI adoption and capability building',
    ],
    quickExamples: ['Team workshops', 'AI adoption', 'Prompt engineering', 'Process design'],
    timeline: 'Custom sessions',
    timelineStyle: 'portfolio',
    iconColor: 'text-orange-300',
    glowColor: 'bg-orange-500/10',
    hoverGlow: 'shadow-[0_0_30px_rgba(249,115,22,0.4)]',
  },
];

// Premium aurora background component with enhanced grain
function PremiumAuroraBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* Sophisticated gradient base */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black' />

      {/* Enhanced grain texture overlay */}
      <div
        className='absolute inset-0 opacity-[0.025]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Large dramatic aurora blobs */}
      <motion.div
        className='absolute -top-1/2 -left-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]'
        style={{
          background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.2))',
        }}
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -100, 80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className='absolute -top-1/3 -right-1/3 w-[500px] h-[500px] rounded-full opacity-15 blur-[80px]'
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(249, 115, 22, 0.2))',
        }}
        animate={{
          x: [0, -120, 100, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
          delay: 5,
        }}
      />
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

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className='fixed inset-0 pointer-events-none z-5'
      style={{
        background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 50%)`,
      }}
    />
  );
}

// Timeline connector component
function TimelineConnector() {
  return (
    <svg className='hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0'>
      <defs>
        <linearGradient id='connectorGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='rgba(59, 130, 246, 0.3)' />
          <stop offset='50%' stopColor='rgba(168, 85, 247, 0.2)' />
          <stop offset='100%' stopColor='rgba(16, 185, 129, 0.3)' />
        </linearGradient>
      </defs>
      <path
        d='M 200 100 Q 400 150 600 200 Q 800 250 1000 300 Q 1200 350 400 500'
        stroke='url(#connectorGradient)'
        strokeWidth='2'
        fill='none'
        strokeDasharray='8 8'
        opacity='0.3'
      />
    </svg>
  );
}

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

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
    trackServiceInterest(serviceId, 'learn_more', {
      service_name: serviceName,
      location: 'services_section',
    });

    const sectionMap: { [key: string]: string } = {
      'strategic-research': 'research-section',
      'rapid-development': 'development-section',
      'workflow-optimization': 'automation-section',
      'ai-training': 'training-section',
    };

    sessionStorage.setItem('targetSection', sectionMap[serviceId] || '');
    window.location.href = '/services';
  };

  const getTimelineBadgeStyle = (timelineStyle?: string) => {
    if (timelineStyle === 'training') {
      return 'bg-green-500/20 border-green-500/30 text-green-400';
    }
    if (timelineStyle === 'prototype') {
      return 'bg-fieldporter-purple/20 border-fieldporter-purple/30 text-fieldporter-purple';
    }
    if (timelineStyle === 'research') {
      return 'bg-fieldporter-blue/20 border-fieldporter-blue/30 text-fieldporter-blue';
    }
    if (timelineStyle === 'portfolio') {
      return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
    }
    return 'bg-fieldporter-gray/20 border-fieldporter-gray/30 text-fieldporter-gray';
  };

  return (
    <section
      ref={ref}
      id='services'
      data-cursor-zone='content'
      className='relative py-32 lg:py-40 overflow-hidden'
    >
      <PremiumAuroraBackground />
      <InteractiveSpotlight />
      <TimelineConnector />

      <motion.div
        style={{ y: springContentY, opacity: springOpacity }}
        className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      >
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: easeInOut }}
          className='text-center mb-24 lg:mb-32'
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-12 lg:mb-16 leading-tight tracking-[-0.02em]'
          >
            Four Things We{' '}
            <span className='relative'>
              <span className='relative z-10 font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
                Do
              </span>
              <motion.div
                className='absolute -inset-x-4 -inset-y-2 bg-blue-500/20 blur-3xl'
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light'
          >
            Building systems that deliver measurable business outcomes, not consulting theory.
          </motion.p>
        </motion.div>

        {/* Uniform Services Grid - 2x2 Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16'>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
              className='group relative'
            >
              {/* Floating Phase Number */}
              <div className='absolute -top-4 -left-4 lg:-top-6 lg:-left-6 text-5xl lg:text-6xl font-thin text-white/5 pointer-events-none select-none'>
                {service.phase}
              </div>

              <div
                className={`
                  relative p-6 md:p-8 lg:p-10 rounded-2xl backdrop-blur-xl border border-white/10 
                  bg-white/5 hover:bg-white/8 
                  transition-all duration-500 ease-out
                  hover:shadow-2xl ${service.hoverGlow}
                  will-change-transform h-full cursor-pointer
                  min-h-[400px] md:min-h-[450px]
                `}
                onClick={() => handleServiceInterest(service.id, service.title)}
              >
                {/* Enhanced glassmorphism layers */}
                <div className='absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl' />
                <div className='absolute inset-0 rounded-2xl border border-white/5' />

                <div className='relative z-10 h-full flex flex-col'>
                  {/* Header Section */}
                  <div className='flex items-start justify-between mb-6'>
                    <motion.div
                      className='p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg transition-all duration-300 group-hover:bg-white/15'
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        transition: { duration: 0.6 },
                      }}
                    >
                      <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                    </motion.div>

                    <motion.div
                      className={`px-4 py-2 rounded-full border font-medium text-sm ${getTimelineBadgeStyle(service.timelineStyle)} transition-all duration-300 group-hover:scale-105`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      {service.timeline}
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className='flex-1 space-y-6'>
                    <div className='space-y-3'>
                      <h3 className='text-xl lg:text-2xl font-semibold text-white leading-tight group-hover:text-blue-300 transition-colors duration-300'>
                        {service.title}
                      </h3>
                      <p className='text-base lg:text-lg text-gray-200 font-light leading-relaxed'>
                        {service.tagline}
                      </p>
                    </div>

                    {/* Key Benefits - Always Visible */}
                    <div className='space-y-3'>
                      {service.keyBenefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          className='flex items-start space-x-3'
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.4 }}
                        >
                          <div className='relative flex-shrink-0 mt-0.5'>
                            <CheckCircle className={`w-4 h-4 ${service.iconColor} opacity-80`} />
                            <div
                              className={`absolute inset-0 ${service.glowColor} blur-sm opacity-50`}
                            />
                          </div>
                          <span className='text-sm lg:text-base text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300'>
                            {benefit}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Expandable Extended Benefits */}
                    <AnimatePresence>
                      {expandedCards.has(service.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className='space-y-3 overflow-hidden'
                        >
                          {service.extendedBenefits.map((benefit, idx) => (
                            <motion.div
                              key={idx}
                              className='flex items-start space-x-3'
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className='relative flex-shrink-0 mt-0.5'>
                                <CheckCircle
                                  className={`w-4 h-4 ${service.iconColor} opacity-60`}
                                />
                                <div
                                  className={`absolute inset-0 ${service.glowColor} blur-sm opacity-30`}
                                />
                              </div>
                              <span className='text-sm text-gray-300 leading-relaxed'>
                                {benefit}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Show More/Less Button */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleExpanded(service.id);
                      }}
                      className='flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200'
                    >
                      <span>
                        {expandedCards.has(service.id)
                          ? 'Show less'
                          : `+ ${service.extendedBenefits.length} more capabilities`}
                      </span>
                      {expandedCards.has(service.id) ? (
                        <ChevronUp className='w-4 h-4' />
                      ) : (
                        <ChevronDown className='w-4 h-4' />
                      )}
                    </button>
                  </div>

                  {/* Visual Examples Footer */}
                  <div className='mt-6 pt-4 border-t border-white/10'>
                    <div className='flex flex-wrap gap-2'>
                      {service.quickExamples.map((example, idx) => (
                        <motion.div
                          key={idx}
                          className='
                            px-3 py-1.5 rounded-full 
                            bg-white/5 border border-white/10
                            text-xs text-gray-400 font-medium
                            hover:bg-white/10 hover:text-gray-300 hover:border-white/20
                            transition-all duration-200 cursor-pointer
                          '
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.1 }}
                        >
                          {example}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Learn more indicator */}
                  <motion.div
                    className='absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300'
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className='w-6 h-6 text-gray-400 group-hover:text-white transition-colors' />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
