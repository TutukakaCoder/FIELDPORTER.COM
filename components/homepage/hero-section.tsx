'use client';

import { motion, useInView, useScroll, useSpring, useTransform, Variants } from 'framer-motion';
import { Brain, Code2, Search, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Service pillar data with enhanced premium styling and navigation
const servicePillars = [
  {
    icon: Search,
    title: 'Strategic Research',
    description: 'Get market insights in hours, not days',
    gradient: 'from-emerald-600/30 to-teal-600/30',
    border: 'border-emerald-400/40',
    iconColor: 'text-emerald-300',
    glowColor: 'bg-emerald-500/20',
    hoverGlow: 'shadow-[0_0_30px_rgba(16,185,129,0.6)]',
    textGlow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]',
    href: '/services#strategic-research',
  },
  {
    icon: Code2,
    title: 'Rapid Development',
    description: 'Build AI solutions for your specific needs',
    gradient: 'from-orange-600/30 to-red-600/30',
    border: 'border-orange-400/40',
    iconColor: 'text-orange-300',
    glowColor: 'bg-orange-500/20',
    hoverGlow: 'shadow-[0_0_30px_rgba(249,115,22,0.6)]',
    textGlow: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]',
    href: '/services#rapid-development',
  },
  {
    icon: Zap,
    title: 'Workflow Optimization',
    description: 'Make repetitive tasks run themselves',
    gradient: 'from-purple-600/30 to-pink-600/30',
    border: 'border-purple-400/40',
    iconColor: 'text-purple-300',
    glowColor: 'bg-purple-500/20',
    hoverGlow: 'shadow-[0_0_30px_rgba(168,85,247,0.6)]',
    textGlow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]',
    href: '/services#workflow-optimization',
  },
  {
    icon: Brain,
    title: 'AI Training',
    description: 'Learn which tools are right for you',
    gradient: 'from-blue-600/30 to-cyan-600/30',
    border: 'border-blue-400/40',
    iconColor: 'text-blue-300',
    glowColor: 'bg-blue-500/20',
    hoverGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.6)]',
    textGlow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]',
    href: '/services#ai-training',
  },
];

// Premium aurora background with dramatic effects
function PremiumAuroraBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* Sophisticated gradient base */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black' />

      {/* Large dramatic aurora blobs */}
      <motion.div
        className='absolute -top-1/2 -left-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]'
        style={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.3))',
        }}
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -150, 100, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className='absolute -top-1/3 -right-1/3 w-[600px] h-[600px] rounded-full opacity-25 blur-[100px]'
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.4))',
        }}
        animate={{
          x: [0, -150, 120, 0],
          y: [0, 100, -80, 0],
          scale: [1, 0.9, 1.1, 1],
          rotate: [0, -90, -180, -360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
          delay: 5,
        }}
      />

      {/* Interactive spotlight */}
      <InteractiveSpotlight />
    </div>
  );
}

// Enhanced interactive spotlight
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
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 50%)`,
      }}
    />
  );
}

// Premium service card with enhanced animations
function PremiumServiceCard({
  service,
  index,
}: {
  service: (typeof servicePillars)[0];
  index: number;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const Icon = service.icon;

  const handleClick = () => {
    window.location.href = service.href;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: index * 0.15 + 0.4,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
      className={`
        relative group p-6 rounded-2xl backdrop-blur-2xl border cursor-pointer
        ${service.border}
        bg-gradient-to-br ${service.gradient}
        hover:bg-white/5 transition-all duration-500 ease-out
        ${isHovering ? service.hoverGlow : ''}
        will-change-transform
        flex-1 min-w-0
      `}
    >
      {/* Enhanced glassmorphism layers */}
      <div className='absolute inset-0 bg-white/[0.02] backdrop-blur-2xl rounded-2xl' />
      <div className='absolute inset-0 rounded-2xl border border-white/10' />

      {/* Premium glow effect */}
      {isHovering && (
        <motion.div
          className={`absolute -inset-1 rounded-2xl ${service.glowColor} blur-2xl`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}

      {/* Content with premium spacing */}
      <div className='relative z-10 text-center space-y-4'>
        <motion.div
          className='flex justify-center'
          whileHover={{
            scale: 1.25,
            y: -4,
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            type: 'spring',
            damping: 12,
            stiffness: 200,
            rotate: { duration: 0.6 },
          }}
        >
          <div
            className={`
            p-3 rounded-xl ${service.glowColor} ${service.border} backdrop-blur-lg
            ${isHovering ? service.textGlow : ''}
            transition-all duration-300
          `}
          >
            <Icon className={`w-7 h-7 ${service.iconColor}`} />
          </div>
        </motion.div>

        <div className='space-y-3'>
          <motion.h3
            className={`
              text-lg font-bold text-white leading-tight
              group-hover:text-blue-100 transition-all duration-300
              ${isHovering ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}
            `}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          >
            {service.title}
          </motion.h3>

          <motion.p
            className={`
              text-gray-300 text-sm leading-relaxed font-medium
              group-hover:text-gray-200 transition-all duration-300
              ${isHovering ? service.textGlow : ''}
            `}
          >
            {service.description}
          </motion.p>
        </div>
      </div>

      {/* Subtle shine effect */}
      <motion.div
        className='absolute inset-0 rounded-2xl'
        style={{
          background:
            'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
          opacity: 0,
        }}
        whileHover={{
          opacity: [0, 0.3, 0],
          x: [-100, 100],
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const { scrollY } = useScroll();

  // Premium scroll parallax effects
  const contentY = useTransform(scrollY, [0, 800], [0, -200]);
  const backgroundY = useTransform(scrollY, [0, 800], [0, 400]);
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 0.8, 0]);

  const springContentY = useSpring(contentY, { damping: 30, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });

  // Premium headline animation
  const headline = ['Learn AI.', 'Automate work.', 'Save time.'];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const headlineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 80,
      },
    },
  };

  const subheadingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  return (
    <section
      ref={ref}
      data-cursor-zone='hero'
      className='relative h-screen overflow-hidden pt-16 md:pt-20'
    >
      {/* Premium animated background */}
      <motion.div style={{ y: backgroundY }} className='absolute inset-0'>
        <PremiumAuroraBackground />
      </motion.div>

      {/* Perfectly centered main content */}
      <motion.div
        style={{ y: springContentY, opacity: springOpacity }}
        className='relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8'
      >
        <div className='w-full max-w-7xl mx-auto'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='text-center space-y-12'
          >
            {/* Hero headline section - positioned higher */}
            <div className='space-y-8 -mt-8 md:-mt-12'>
              <div className='space-y-2'>
                {headline.map((word, index) => (
                  <motion.div key={word} variants={headlineVariants} className='block'>
                    <h1
                      className={`
                        text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 
                        font-bold leading-[0.9] tracking-tight
                        ${index === 2 ? 'premium-text-accent' : 'premium-text-gradient'}
                        drop-shadow-2xl
                      `}
                    >
                      {word}
                    </h1>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced subheading */}
              <motion.div variants={subheadingVariants} className='max-w-4xl mx-auto'>
                <p className='text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed font-light drop-shadow-lg'>
                  We help businesses and individuals master{' '}
                  <span className='text-blue-300 font-medium drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]'>
                    AI tools & Agents
                  </span>
                </p>
              </motion.div>
            </div>

            {/* Premium service cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: 'spring', damping: 20, stiffness: 80 }}
              className='max-w-6xl mx-auto'
            >
              {/* Desktop: 4 columns, Mobile: 2x2 grid */}
              <div className='hidden md:grid md:grid-cols-4 gap-6 lg:gap-8'>
                {servicePillars.map((service, index) => (
                  <PremiumServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>

              {/* Mobile: 2x2 grid with better spacing */}
              <div className='grid grid-cols-2 gap-4 md:hidden'>
                {servicePillars.map((service, index) => (
                  <PremiumServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Enhanced trust indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, type: 'spring', damping: 25, stiffness: 100 }}
              className='flex items-center justify-center space-x-6 text-gray-400'
            >
              <div className='flex space-x-1'>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className='w-1.5 h-1.5 bg-blue-400/60 rounded-full'
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <span className='text-sm font-semibold tracking-wider text-blue-200/80 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]'>
                Real projects. Real results.
              </span>
              <div className='flex space-x-1'>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className='w-1.5 h-1.5 bg-blue-400/60 rounded-full'
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 + 1 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced premium CSS */}
      <style jsx>{`
        .premium-text-gradient {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f1f5f9 15%,
            #e2e8f0 30%,
            #cbd5e1 50%,
            #94a3b8 70%,
            #64748b 85%,
            #475569 100%
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: premiumShift 10s ease-in-out infinite;
          filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.4));
        }

        .premium-text-accent {
          background: linear-gradient(
            135deg,
            #06b6d4 0%,
            #0ea5e9 15%,
            #3b82f6 30%,
            #6366f1 50%,
            #8b5cf6 70%,
            #a855f7 85%,
            #d946ef 100%
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: premiumAccent 8s ease-in-out infinite;
          filter: drop-shadow(0 0 50px rgba(59, 130, 246, 0.6));
        }

        @keyframes premiumShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          33% {
            background-position: 100% 50%;
          }
          66% {
            background-position: 50% 100%;
          }
        }

        @keyframes premiumAccent {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Enhanced glassmorphism */
        .backdrop-blur-2xl {
          backdrop-filter: blur(24px) saturate(180%) brightness(110%);
          -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(110%);
        }

        /* Hardware acceleration */
        .will-change-transform {
          will-change: transform;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .premium-text-gradient {
            filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.3));
          }
          .premium-text-accent {
            filter: drop-shadow(0 0 35px rgba(59, 130, 246, 0.4));
          }
          .backdrop-blur-2xl {
            backdrop-filter: blur(16px) saturate(160%);
            -webkit-backdrop-filter: blur(16px) saturate(160%);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
