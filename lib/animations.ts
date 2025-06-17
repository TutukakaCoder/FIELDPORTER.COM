/**
 * FIELDPORTER Animation Library
 * Enterprise-grade animation system for premium AI consultancy website
 *
 * Performance Requirements:
 * - 60fps on all devices
 * - Hardware-accelerated transforms only
 * - Respects prefers-reduced-motion
 * - Battery-conscious on mobile
 */

import { MotionProps, Transition, Variants } from 'framer-motion';

// ============================================================================
// CORE ANIMATION CONFIGURATION
// ============================================================================

/**
 * Professional timing functions for enterprise feel
 */
export const TIMING = {
  // Micro-interactions (buttons, hovers)
  instant: 0.15,
  fast: 0.2,
  normal: 0.3,

  // Page transitions and major state changes
  slow: 0.4,
  slower: 0.6,

  // Stagger delays for sequential animations
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;

/**
 * Enterprise-grade easing curves
 */
export const EASING = {
  // Standard interactions
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],

  // Premium feel curves
  spring: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],

  // Subtle professional curves
  subtle: [0.25, 0.1, 0.25, 1],
  smooth: [0.4, 0.0, 0.2, 1],

  // Premium sophisticated easing (2025 spec)
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeOutBack: [0.34, 1.56, 0.64, 1],
} as const;

/**
 * Motion configuration with accessibility support
 */
export const getMotionConfig = (): {
  reducedMotion: boolean;
  transition: Transition;
} => {
  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return {
    reducedMotion,
    transition: {
      duration: reducedMotion ? 0 : TIMING.normal,
      ease: EASING.easeOut,
    },
  };
};

// ============================================================================
// PAGE TRANSITION ANIMATIONS
// ============================================================================

/**
 * Smooth page transitions for professional navigation experience
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeIn,
    },
  },
};

/**
 * Staggered page content reveal for premium feel
 */
export const pageContentStagger: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.stagger.normal,
      delayChildren: TIMING.fast,
    },
  },
};

/**
 * Individual content item animation
 */
export const pageContentItem: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
};

// ============================================================================
// SCROLL-TRIGGERED REVEAL ANIMATIONS
// ============================================================================

/**
 * Viewport-triggered animations for scroll reveals
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Staggered scroll reveal for card grids and lists
 */
export const scrollRevealStagger: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.stagger.normal,
      delayChildren: TIMING.stagger.fast,
    },
  },
};

/**
 * Individual item in staggered scroll reveal
 */
export const scrollRevealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Hero section text reveal with professional stagger
 */
export const heroTextReveal: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.stagger.slow,
      delayChildren: TIMING.fast,
    },
  },
};

export const heroTextItem: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.slow,
      ease: EASING.easeOut,
    },
  },
};

// ============================================================================
// INTERACTIVE ELEMENT ANIMATIONS
// ============================================================================

/**
 * Professional button hover effects
 */
export const buttonHover: Variants = {
  initial: {
    scale: 1,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: TIMING.instant,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Card hover effects with subtle elevation
 */
export const cardHover: Variants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Link hover effects for professional navigation
 */
export const linkHover: Variants = {
  initial: {
    color: 'var(--foreground)',
  },
  hover: {
    color: 'var(--primary)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
};

// ============================================================================
// FORM INTERACTION ANIMATIONS
// ============================================================================

/**
 * Form input focus animations
 */
export const inputFocus: Variants = {
  initial: {
    borderColor: 'hsl(var(--border))',
    boxShadow: '0 0 0 0 rgba(9, 105, 218, 0)',
  },
  focus: {
    borderColor: 'hsl(var(--primary))',
    boxShadow: '0 0 0 3px rgba(9, 105, 218, 0.1)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
  error: {
    borderColor: 'var(--error)',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Form validation feedback animations
 */
export const validationFeedback: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    height: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Form submission states
 */
export const submitButton: Variants = {
  idle: {
    scale: 1,
    backgroundColor: 'hsl(var(--primary))',
  },
  loading: {
    scale: 0.98,
    backgroundColor: 'hsl(var(--muted))',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
  success: {
    scale: 1.05,
    backgroundColor: 'var(--success)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.bounce,
    },
  },
  error: {
    scale: 1,
    backgroundColor: 'var(--error)',
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
};

// ============================================================================
// LOADING STATE ANIMATIONS
// ============================================================================

/**
 * Professional skeleton loading animation
 */
export const skeletonPulse: Variants = {
  initial: {
    opacity: 0.6,
  },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      ease: EASING.easeInOut,
      repeat: Infinity,
    },
  },
};

/**
 * Loading spinner for form submissions
 */
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

/**
 * Content loading reveal
 */
export const contentLoad: Variants = {
  loading: {
    opacity: 0,
    scale: 0.95,
  },
  loaded: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
};

// ============================================================================
// MODAL AND OVERLAY ANIMATIONS
// ============================================================================

/**
 * Modal backdrop animation
 */
export const modalBackdrop: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Modal content animation
 */
export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
};

// ============================================================================
// PREMIUM HOMEPAGE TRANSFORMATIONS - FIELDPORTER 2025
// ============================================================================

/**
 * Premium dramatic fade-in with elegant upward motion
 */
export const premiumFadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom premium easing
    },
  },
};

/**
 * Sophisticated staggered container for premium reveals
 */
export const premiumStaggerContainer: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Advanced glassmorphism card hover with 3D effects
 */
export const premiumGlassHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    filter: 'brightness(1)',
  },
  hover: {
    scale: 1.02,
    y: -8,
    rotateX: 2,
    rotateY: 2,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    filter: 'brightness(1.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

/**
 * Dramatic text reveal with letter-spacing animation
 */
export const dramaticTextReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    letterSpacing: '0.1em',
    filter: 'blur(20px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '-0.02em',
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Premium floating glass card animation
 */
export const floatingGlass: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    backdropFilter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    backdropFilter: 'blur(20px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    y: -4,
    scale: 1.01,
    backdropFilter: 'blur(24px)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

/**
 * Sophisticated parallax background motion
 */
export const parallaxBackground: Variants = {
  animate: {
    x: ['-2%', '2%', '-2%'],
    y: ['-1%', '1%', '-1%'],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Premium button with advanced micro-interactions
 */
export const premiumButtonHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 14px 0 rgba(0, 105, 218, 0.39)',
    backgroundColor: '#0066FF',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 6px 20px 0 rgba(0, 105, 218, 0.5)',
    backgroundColor: '#0052CC',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

/**
 * Counter animation for credibility numbers
 */
export const counterAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Smooth scroll indicator with breathing effect
 */
export const scrollIndicator: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 1.5,
    },
  },
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Advanced image overlay reveal for portfolio
 */
export const imageOverlayReveal: Variants = {
  initial: {
    opacity: 0,
    scale: 1.1,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    scale: 1.05,
    filter: 'blur(0px) brightness(1.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Physics-based spring animations for natural interactions
 */
export const physicsSpring = {
  default: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 100,
    mass: 1,
  },
  gentle: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 120,
    mass: 1.2,
  },
  bouncy: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 200,
    mass: 0.8,
  },
  smooth: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 300,
    mass: 0.5,
  },
};

/**
 * Micro-interaction button states with premium feel
 */
export const microInteractionButton: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 14px 0 rgba(0, 105, 218, 0.39)',
    filter: 'brightness(1)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 6px 20px 0 rgba(0, 105, 218, 0.5)',
    filter: 'brightness(1.05)',
    transition: physicsSpring.smooth,
  },
  tap: {
    scale: 0.98,
    boxShadow: '0 2px 8px 0 rgba(0, 105, 218, 0.3)',
    filter: 'brightness(0.95)',
    transition: {
      duration: 0.1,
      ease: EASING.easeOutQuint,
    },
  },
  focus: {
    scale: 1.01,
    boxShadow: '0 0 0 3px rgba(0, 105, 218, 0.3), 0 4px 14px 0 rgba(0, 105, 218, 0.39)',
    transition: physicsSpring.gentle,
  },
};

/**
 * Sophisticated cursor tracking animation for interactive elements
 */
export const cursorTracking: Variants = {
  default: {
    x: 0,
    y: 0,
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: physicsSpring.smooth,
  },
};

/**
 * Advanced staggered reveal with exponential easing
 */
export const exponentialStagger: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
      when: 'beforeChildren',
      ease: EASING.easeOutExpo,
    },
  },
};

/**
 * Morphing geometric shapes for dynamic backgrounds
 */
export const morphingShape: Variants = {
  initial: {
    borderRadius: '20px',
    rotate: 0,
    scale: 1,
  },
  animate: {
    borderRadius: ['20px', '50px', '30px', '20px'],
    rotate: [0, 10, -5, 0],
    scale: [1, 1.05, 0.95, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Cinematic text reveal with character-by-character animation
 */
export const cinematicTextReveal: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

export const cinematicCharacter: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: EASING.easeOutBack,
    },
  },
};

/**
 * Premium ambient background motion for depth
 */
export const ambientMotion: Variants = {
  animate: {
    x: ['-1%', '1%', '-1%'],
    y: ['-0.5%', '0.5%', '-0.5%'],
    rotate: [0, 0.5, 0],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ============================================================================
// PREMIUM MICRO-INTERACTION ANIMATIONS - 2025 ENHANCEMENT
// ============================================================================

/**
 * Premium button press feedback for active states
 */
export const premiumButtonPress: Variants = {
  initial: {
    scale: 1,
  },
  pressed: {
    scale: 0.98,
    transition: {
      duration: TIMING.instant,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Premium button loading state with elegant opacity transition
 */
export const premiumButtonLoading: Variants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  loading: {
    opacity: 0.7,
    scale: 0.98,
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeInOutQuart,
    },
  },
};

/**
 * Sophisticated card entrance animation for grid layouts
 */
export const premiumCardEntry: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOutExpo,
    },
  },
};

/**
 * Enhanced glassmorphism with interactive depth
 */
export const premiumGlassElevation: Variants = {
  initial: {
    backdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    backdropFilter: 'blur(24px)',
    boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Professional input focus with smooth border and shadow transitions
 */
export const premiumInputFocus: Variants = {
  initial: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 0 0 0 rgba(9, 105, 218, 0)',
  },
  focused: {
    borderColor: 'rgba(9, 105, 218, 1)',
    boxShadow: '0 0 0 2px rgba(9, 105, 218, 0.2)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Form validation feedback with professional transitions
 */
export const premiumInputValidation: Variants = {
  initial: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  success: {
    borderColor: 'rgba(34, 197, 94, 1)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
  error: {
    borderColor: 'rgba(239, 68, 68, 1)',
    x: [0, -2, 2, -2, 0],
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Professional floating label behavior for inputs
 */
export const premiumInputFloatingLabel: Variants = {
  initial: {
    y: 0,
    scale: 1,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  focused: {
    y: -24,
    scale: 0.85,
    color: 'rgba(9, 105, 218, 1)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
  filled: {
    y: -24,
    scale: 0.85,
    color: 'rgba(255, 255, 255, 0.8)',
    transition: {
      duration: TIMING.fast,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Staggered text reveal for premium headlines
 */
export const premiumTextReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOutExpo,
    },
  },
};

/**
 * Progressive disclosure for content sections
 */
export const premiumSectionEntry: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.slow,
      ease: EASING.easeOutExpo,
      staggerChildren: 0.1,
    },
  },
};

/**
 * Smooth fade-in as elements enter viewport
 */
export const premiumScrollFade: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.easeOut,
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create viewport animation props for scroll-triggered elements
 */
export const createViewportAnimation = (
  threshold: number = 0.1,
  margin: string = '0px 0px -100px 0px'
): MotionProps => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: {
    once: true,
    amount: threshold,
    margin,
  },
  variants: scrollReveal,
});

/**
 * Create staggered viewport animation for lists/grids
 */
export const createStaggeredViewportAnimation = (
  staggerDelay: number = TIMING.stagger.normal
): MotionProps => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.1 },
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: TIMING.stagger.fast,
      },
    },
  },
});

/**
 * Create hover animation props for interactive elements
 */
export const createHoverAnimation = (
  scale: number = 1.02,
  duration: number = TIMING.fast
): MotionProps => ({
  whileHover: {
    scale,
    transition: { duration, ease: EASING.easeOut },
  },
  whileTap: {
    scale: scale * 0.98,
    transition: { duration: TIMING.instant, ease: EASING.easeOut },
  },
});

/**
 * Performance-optimized animation props
 */
export const optimizedAnimation = (variants: Variants): MotionProps => {
  const { reducedMotion } = getMotionConfig();

  if (reducedMotion) {
    return {};
  }

  return {
    variants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
  };
};

/**
 * Mobile-optimized animation props with reduced complexity
 */
export const mobileOptimizedAnimation = (
  variants: Variants,
  mobileVariants?: Variants
): MotionProps => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { reducedMotion } = getMotionConfig();

  if (reducedMotion) {
    return {};
  }

  return {
    variants: isMobile && mobileVariants ? mobileVariants : variants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
  };
};

// ============================================================================
// EXPORT ALL ANIMATIONS
// ============================================================================

export const animations = {
  // Page transitions
  pageTransition,
  pageContentStagger,
  pageContentItem,

  // Scroll reveals
  scrollReveal,
  scrollRevealStagger,
  scrollRevealItem,
  heroTextReveal,
  heroTextItem,

  // Interactive elements
  buttonHover,
  cardHover,
  linkHover,

  // Form interactions
  inputFocus,
  validationFeedback,
  submitButton,

  // Loading states
  skeletonPulse,
  loadingSpinner,
  contentLoad,

  // Modals and overlays
  modalBackdrop,
  modalContent,

  // Premium homepage transformations
  premiumFadeInUp,
  premiumStaggerContainer,
  premiumGlassHover,
  dramaticTextReveal,
  floatingGlass,
  parallaxBackground,
  premiumButtonHover,
  counterAnimation,
  scrollIndicator,
  imageOverlayReveal,

  // New animations for 2025
  physicsSpring,
  microInteractionButton,
  cursorTracking,
  exponentialStagger,
  morphingShape,
  cinematicTextReveal,
  cinematicCharacter,
  ambientMotion,

  // 2025 enhancements
  premiumButtonPress,
  premiumButtonLoading,
  premiumCardEntry,
  premiumGlassElevation,
  premiumInputFocus,
  premiumInputValidation,
  premiumInputFloatingLabel,
  premiumTextReveal,
  premiumSectionEntry,
  premiumScrollFade,
} as const;

export default animations;
