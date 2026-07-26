"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import * as React from "react";

import { getMotionConfig, premiumButtonHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation",
  {
    variants: {
      variant: {
        default:
          "bg-fieldporter-blue text-fieldporter-white hover:bg-fieldporter-blue/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-gray-900/20 bg-transparent text-gray-900 hover:bg-gray-900/5 hover:text-gray-900 hover:border-gray-900/40 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:text-white dark:hover:border-white/40",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // FIELDPORTER Premium Variants - Mobile Optimized
        primary:
          "bg-fieldporter-blue text-fieldporter-white font-medium hover:bg-fieldporter-blue/90 active:bg-fieldporter-blue/80 hover:shadow-lg transition-all duration-200 ease-out focus:ring-fieldporter-blue touch-manipulation min-h-[44px]",
        "fieldporter-secondary":
          "bg-transparent border border-gray-900/30 text-gray-900 font-medium hover:bg-gray-900/5 active:bg-gray-900/10 hover:border-gray-900 dark:border-fieldporter-gray dark:text-fieldporter-white dark:hover:bg-fieldporter-gray/20 dark:active:bg-fieldporter-gray/30 dark:hover:border-fieldporter-white transition-all duration-200 ease-out focus:ring-fieldporter-blue dark:focus:ring-fieldporter-white touch-manipulation min-h-[44px]",
        "fieldporter-ghost":
          "bg-transparent text-gray-900 font-medium hover:bg-gray-900/5 active:bg-gray-900/10 dark:text-fieldporter-white dark:hover:bg-white/10 dark:active:bg-white/20 backdrop-blur-sm transition-all duration-200 ease-out focus:ring-fieldporter-blue dark:focus:ring-fieldporter-white touch-manipulation min-h-[44px]",
        "fieldporter-glass":
          "backdrop-blur-md bg-gray-900/5 border border-gray-900/15 text-gray-900 font-medium hover:bg-gray-900/10 active:bg-gray-900/15 dark:bg-white/10 dark:border-white/20 dark:text-fieldporter-white dark:hover:bg-white/20 dark:active:bg-white/30 hover:shadow-glass transition-all duration-200 ease-out focus:ring-fieldporter-blue touch-manipulation min-h-[44px]",
        "fieldporter-blue":
          "bg-fieldporter-blue text-fieldporter-white font-medium hover:bg-fieldporter-blue/90 active:bg-fieldporter-blue/80 hover:shadow-lg transition-all duration-200 ease-out focus:ring-fieldporter-blue touch-manipulation min-h-[44px]",
        invert:
          "bg-gray-900 text-white font-medium hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-xl transition-all duration-200 ease-out focus:ring-gray-900 dark:focus:ring-white touch-manipulation min-h-[44px] shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
      },
      size: {
        default: "h-10 px-4 py-2 min-h-[44px]",
        sm: "h-9 rounded-md px-3 min-h-[44px] text-sm",
        lg: "h-11 rounded-xl px-8 min-h-[48px] text-base",
        icon: "h-10 w-10 min-h-[44px] min-w-[44px]",
        // FIELDPORTER Enterprise Sizes - Mobile Optimized
        enterprise: "h-12 rounded-xl px-8 py-3 text-base min-h-[48px]",
        "enterprise-lg": "h-14 rounded-xl px-10 py-4 text-lg min-h-[56px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // Premium animation props
  enableAnimations?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      enableAnimations = true,
      isLoading = false,
      ...props
    },
    ref,
  ) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    const baseClassName = cn(buttonVariants({ variant, size, className }));
    const isPremiumVariant =
      variant?.includes("fieldporter") || variant === "primary";

    // For premium FIELDPORTER variants, use enhanced animations
    if (shouldAnimate && isPremiumVariant) {
      return (
        <motion.button
          ref={ref}
          className={baseClassName}
          variants={premiumButtonHover}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          animate={isLoading ? "loading" : "rest"}
          // Only spread button-specific props to avoid conflicts
          onClick={props.onClick}
          disabled={props.disabled}
          type={props.type}
          aria-label={props["aria-label"]}
          aria-describedby={props["aria-describedby"]}
          tabIndex={props.tabIndex}
          autoFocus={props.autoFocus}
        >
          {props.children}
        </motion.button>
      );
    }

    // Standard button with subtle animations for other variants
    if (shouldAnimate) {
      return (
        <motion.button
          ref={ref}
          className={baseClassName}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.1 }}
          // Only spread button-specific props to avoid conflicts
          onClick={props.onClick}
          disabled={props.disabled}
          type={props.type}
          aria-label={props["aria-label"]}
          aria-describedby={props["aria-describedby"]}
          tabIndex={props.tabIndex}
          autoFocus={props.autoFocus}
        >
          {props.children}
        </motion.button>
      );
    }

    // Fallback to regular button for reduced motion
    return (
      <button ref={ref} className={baseClassName} {...props}>
        {props.children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
