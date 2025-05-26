import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        // FIELDPORTER Premium Variants
        fieldporter: 'text-fieldporter-white font-inter font-medium',
        'fieldporter-muted': 'text-fieldporter-gray font-inter',
        'fieldporter-accent': 'text-fieldporter-blue font-inter font-medium',
        'fieldporter-purple': 'text-fieldporter-purple font-inter font-medium',
      },
      size: {
        default: 'text-sm',
        sm: 'text-xs',
        lg: 'text-base',
        // FIELDPORTER Enterprise Sizes
        enterprise: 'text-base font-medium',
      },
    },
    defaultVariants: {
      variant: 'fieldporter',
      size: 'default',
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, variant, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, size }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
