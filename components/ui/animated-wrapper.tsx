/**
 * Animated Wrapper Component
 * Provides consistent animation behavior across FIELDPORTER website
 * with performance optimization and accessibility support
 */

'use client';

import {
  animations,
  createHoverAnimation,
  createStaggeredViewportAnimation,
  createViewportAnimation,
  mobileOptimizedAnimation,
  optimizedAnimation,
  TIMING,
} from '@/lib/animations';
import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';
import React from 'react';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

interface AnimatedWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;

  // Animation type selection
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideDown'
    | 'scaleIn'
    | 'scrollReveal'
    | 'staggeredReveal'
    | 'heroText'
    | 'none';

  // Interaction animations
  hover?: boolean;
  hoverScale?: number;

  // Viewport animation settings
  threshold?: number;
  margin?: string;
  staggerDelay?: number;

  // Performance optimizations
  optimized?: boolean;
  mobileOptimized?: boolean;

  // Custom motion props override
  motionProps?: MotionProps;

  // HTML element type
  as?: keyof JSX.IntrinsicElements;

  // Delay before animation starts
  delay?: number;
}

// ============================================================================
// ANIMATED WRAPPER COMPONENT
// ============================================================================

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  className,
  animation = 'fadeIn',
  hover = false,
  hoverScale = 1.02,
  threshold = 0.1,
  margin = '0px 0px -100px 0px',
  staggerDelay = TIMING.stagger.normal,
  optimized = true,
  mobileOptimized = true,
  motionProps = {},
  as = 'div',
  delay = 0,
  ...props
}) => {
  // ============================================================================
  // ANIMATION CONFIGURATION
  // ============================================================================

  const getAnimationProps = (): MotionProps => {
    let baseProps: MotionProps = {};

    // Select base animation
    switch (animation) {
      case 'fadeIn':
        baseProps = {
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: {
              duration: TIMING.normal,
              delay,
            },
          },
        };
        break;

      case 'slideUp':
        baseProps = {
          initial: { opacity: 0, y: 30 },
          animate: {
            opacity: 1,
            y: 0,
            transition: {
              duration: TIMING.normal,
              delay,
            },
          },
        };
        break;

      case 'slideDown':
        baseProps = {
          initial: { opacity: 0, y: -30 },
          animate: {
            opacity: 1,
            y: 0,
            transition: {
              duration: TIMING.normal,
              delay,
            },
          },
        };
        break;

      case 'scaleIn':
        baseProps = {
          initial: { opacity: 0, scale: 0.95 },
          animate: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: TIMING.normal,
              delay,
            },
          },
        };
        break;

      case 'scrollReveal':
        baseProps = createViewportAnimation(threshold, margin);
        break;

      case 'staggeredReveal':
        baseProps = createStaggeredViewportAnimation(staggerDelay);
        break;

      case 'heroText':
        baseProps = {
          variants: animations.heroTextReveal,
          initial: 'hidden',
          animate: 'visible',
        };
        break;

      case 'none':
        baseProps = {};
        break;

      default:
        baseProps = {
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: {
              duration: TIMING.normal,
              delay,
            },
          },
        };
    }

    // Add hover animations if enabled
    if (hover) {
      const hoverProps = createHoverAnimation(hoverScale);
      baseProps = { ...baseProps, ...hoverProps };
    }

    // Apply performance optimizations
    if (optimized) {
      baseProps = optimizedAnimation(baseProps.variants || {});
    }

    if (mobileOptimized) {
      baseProps = mobileOptimizedAnimation(baseProps.variants || {});
    }

    // Merge with custom motion props
    return { ...baseProps, ...motionProps };
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = motion[as as keyof typeof motion] as any;
  const animationProps = getAnimationProps();

  return (
    <MotionComponent className={cn(className)} {...animationProps} {...props}>
      {children}
    </MotionComponent>
  );
};

// ============================================================================
// SPECIALIZED ANIMATED COMPONENTS
// ============================================================================

/**
 * Animated container for page content with staggered children
 */
export const AnimatedPageContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <AnimatedWrapper animation='staggeredReveal' className={cn('space-y-8', className)}>
    {children}
  </AnimatedWrapper>
);

/**
 * Animated hero text with professional stagger effect
 */
export const AnimatedHeroText: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <AnimatedWrapper animation='heroText' className={cn('space-y-4', className)}>
    {children}
  </AnimatedWrapper>
);

/**
 * Animated card with hover effects
 */
export const AnimatedCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  href?: string;
}> = ({ children, className, href }) => {
  const Component = href ? motion.a : motion.div;

  return (
    <Component
      href={href}
      className={cn(
        'block rounded-lg border bg-card text-card-foreground shadow-sm transition-all',
        className
      )}
      variants={animations.cardHover}
      initial='initial'
      whileHover='hover'
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </Component>
  );
};

/**
 * Animated button with professional interaction feedback
 */
export const AnimatedButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}> = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    {
      // Variants
      'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
      'bg-destructive text-destructive-foreground hover:bg-destructive/90':
        variant === 'destructive',
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground':
        variant === 'outline',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
      'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
      'text-primary underline-offset-4 hover:underline': variant === 'link',

      // Sizes
      'h-10 px-4 py-2': size === 'default',
      'h-9 rounded-md px-3': size === 'sm',
      'h-11 rounded-md px-8': size === 'lg',
      'h-10 w-10': size === 'icon',
    },
    className
  );

  return (
    <motion.button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      variants={animations.buttonHover}
      initial='initial'
      {...(!disabled && { whileHover: 'hover', whileTap: 'tap' })}
    >
      {children}
    </motion.button>
  );
};

/**
 * Animated section reveal for scroll-triggered content
 */
export const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className, id }) => (
  <AnimatedWrapper
    as='section'
    id={id}
    animation='scrollReveal'
    className={cn('py-16 md:py-24', className)}
  >
    {children}
  </AnimatedWrapper>
);

/**
 * Animated grid container with staggered item reveals
 */
export const AnimatedGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}> = ({ children, className, cols = 3 }) => (
  <AnimatedWrapper
    animation='staggeredReveal'
    className={cn(
      'grid gap-6',
      {
        'grid-cols-1': cols === 1,
        'grid-cols-1 md:grid-cols-2': cols === 2,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': cols === 3,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': cols === 4,
      },
      className
    )}
  >
    {children}
  </AnimatedWrapper>
);

// ============================================================================
// EXPORTS
// ============================================================================

export default AnimatedWrapper;
