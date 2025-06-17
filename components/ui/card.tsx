'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { getMotionConfig, premiumCardEntry, premiumGlassElevation } from '@/lib/animations';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  enableAnimations?: boolean;
  animationDelay?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, enableAnimations = true, animationDelay = 0, children, ...props }, ref) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (shouldAnimate) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            'rounded-lg border bg-card text-card-foreground shadow-sm',
            // FIELDPORTER Premium Styling
            'backdrop-blur-md bg-bg-fieldporter-secondary/80 border-fieldporter-gray/20',
            'hover:shadow-glass hover:border-fieldporter-gray/40 transition-all duration-300 ease-out',
            'hover:bg-bg-fieldporter-secondary/90',
            className
          )}
          variants={premiumCardEntry}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: animationDelay }}
          whileHover={{
            y: -4,
            scale: 1.01,
            transition: { duration: 0.2 },
          }}
          // Only spread safe props
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          id={props.id}
          role={props.role}
          aria-label={props['aria-label']}
          aria-describedby={props['aria-describedby']}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-card text-card-foreground shadow-sm',
          // FIELDPORTER Premium Styling
          'backdrop-blur-md bg-bg-fieldporter-secondary/80 border-fieldporter-gray/20',
          'hover:shadow-glass hover:border-fieldporter-gray/40 transition-all duration-300 ease-out',
          'hover:bg-bg-fieldporter-secondary/90',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        // FIELDPORTER Typography
        'text-fieldporter-white font-inter',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-muted-foreground',
      // FIELDPORTER Typography
      'text-fieldporter-gray font-inter leading-relaxed',
      className
    )}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

// FIELDPORTER Premium Card Variants with Enhanced Animations
const GlassCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, enableAnimations = true, animationDelay = 0, children, ...props }, ref) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (shouldAnimate) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            'rounded-xl backdrop-blur-md bg-white/10 border border-white/20',
            'shadow-glass hover:shadow-glass-lg transition-all duration-300 ease-out',
            'hover:bg-white/15 hover:border-white/30',
            'text-fieldporter-white',
            className
          )}
          variants={premiumGlassElevation}
          initial={{
            opacity: 0,
            y: 20,
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
          whileHover='hover'
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: animationDelay, duration: 0.4 },
          }}
          viewport={{ once: true, amount: 0.1 }}
          // Only spread safe props
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          id={props.id}
          role={props.role}
          aria-label={props['aria-label']}
          aria-describedby={props['aria-describedby']}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl backdrop-blur-md bg-white/10 border border-white/20',
          'shadow-glass hover:shadow-glass-lg transition-all duration-300 ease-out',
          'hover:bg-white/15 hover:border-white/30',
          'text-fieldporter-white',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';

const EnterpriseCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, enableAnimations = true, animationDelay = 0, children, ...props }, ref) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (shouldAnimate) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            'rounded-xl bg-bg-fieldporter-secondary border border-fieldporter-gray/20',
            'shadow-enterprise hover:shadow-glass-lg transition-all duration-300 ease-out',
            'hover:border-fieldporter-blue/40 hover:bg-bg-fieldporter-secondary/90',
            'text-fieldporter-white p-8',
            className
          )}
          variants={premiumCardEntry}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: animationDelay }}
          whileHover={{
            y: -6,
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          // Only spread safe props
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          id={props.id}
          role={props.role}
          aria-label={props['aria-label']}
          aria-describedby={props['aria-describedby']}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl bg-bg-fieldporter-secondary border border-fieldporter-gray/20',
          'shadow-enterprise hover:shadow-glass-lg transition-all duration-300 ease-out',
          'hover:border-fieldporter-blue/40 hover:bg-bg-fieldporter-secondary/90',
          'text-fieldporter-white p-8',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
EnterpriseCard.displayName = 'EnterpriseCard';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  EnterpriseCard,
  GlassCard,
};
