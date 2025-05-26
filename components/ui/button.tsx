import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // FIELDPORTER Premium Variants
        primary:
          'bg-fieldporter-blue text-fieldporter-white font-medium hover:bg-fieldporter-blue/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out focus:ring-fieldporter-blue',
        'fieldporter-secondary':
          'bg-transparent border border-fieldporter-gray text-fieldporter-white font-medium hover:bg-fieldporter-white hover:text-fieldporter-black hover:border-fieldporter-white transition-all duration-200 ease-out focus:ring-fieldporter-white',
        'fieldporter-ghost':
          'bg-transparent text-fieldporter-white font-medium hover:bg-white/10 backdrop-blur-sm transition-all duration-200 ease-out focus:ring-fieldporter-white',
        'fieldporter-glass':
          'backdrop-blur-md bg-white/10 border border-white/20 text-fieldporter-white font-medium hover:bg-white/20 hover:shadow-glass transition-all duration-200 ease-out focus:ring-fieldporter-blue',
        'fieldporter-purple':
          'bg-fieldporter-purple text-fieldporter-white font-medium hover:bg-fieldporter-purple/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out focus:ring-fieldporter-purple',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        // FIELDPORTER Enterprise Sizes
        enterprise: 'h-12 px-8 py-3 text-base',
        'enterprise-lg': 'h-14 px-10 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
