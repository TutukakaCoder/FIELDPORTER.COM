import * as React from 'react';

import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
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
    />
  )
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

// FIELDPORTER Premium Card Variants
const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
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
    />
  )
);
GlassCard.displayName = 'GlassCard';

const EnterpriseCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
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
    />
  )
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
