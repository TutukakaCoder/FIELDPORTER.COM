import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          // FIELDPORTER Premium Styling
          'bg-bg-fieldporter-tertiary border-fieldporter-gray/30 text-fieldporter-white',
          'placeholder:text-fieldporter-gray/60 font-inter',
          'focus:border-fieldporter-blue focus:ring-fieldporter-blue/20',
          'hover:border-fieldporter-gray/50 transition-all duration-200 ease-out',
          'backdrop-blur-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// FIELDPORTER Premium Input Variants
const GlassInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-lg backdrop-blur-md bg-white/10 border border-white/20',
          'px-4 py-3 text-base text-fieldporter-white font-inter',
          'placeholder:text-white/60',
          'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50 focus:border-fieldporter-blue/50',
          'hover:bg-white/15 hover:border-white/30 transition-all duration-200 ease-out',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
GlassInput.displayName = 'GlassInput';

const EnterpriseInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-lg bg-bg-fieldporter-secondary border border-fieldporter-gray/20',
          'px-4 py-3 text-base text-fieldporter-white font-inter',
          'placeholder:text-fieldporter-gray/70',
          'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:border-fieldporter-blue',
          'hover:border-fieldporter-gray/40 transition-all duration-200 ease-out',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'shadow-sm hover:shadow-md',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
EnterpriseInput.displayName = 'EnterpriseInput';

export { EnterpriseInput, GlassInput, Input };
