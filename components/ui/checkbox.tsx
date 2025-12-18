"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      // FIELDPORTER Premium Styling
      "border-fieldporter-gray/40 bg-bg-fieldporter-tertiary",
      "focus-visible:ring-fieldporter-blue/20 focus-visible:border-fieldporter-blue",
      "data-[state=checked]:bg-fieldporter-blue data-[state=checked]:border-fieldporter-blue",
      "hover:border-fieldporter-gray/60 hover:scale-105 transition-all duration-200 ease-out",
      "backdrop-blur-sm",
      "active:scale-95",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <Check className="h-4 w-4 text-fieldporter-white" strokeWidth={3} />
      </motion.div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// FIELDPORTER Premium Checkbox Variants
const GlassCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md backdrop-blur-md bg-white/10 border border-white/20",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fieldporter-blue/50",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-fieldporter-blue data-[state=checked]:border-fieldporter-blue",
      "hover:bg-white/15 hover:border-white/30 hover:scale-105 transition-all duration-200 ease-out",
      "active:scale-95",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <Check className="h-4 w-4 text-fieldporter-white" strokeWidth={3} />
      </motion.div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
GlassCheckbox.displayName = "GlassCheckbox";

const EnterpriseCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md bg-bg-fieldporter-secondary border border-fieldporter-gray/20",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fieldporter-blue",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-fieldporter-blue data-[state=checked]:border-fieldporter-blue",
      "hover:border-fieldporter-gray/40 hover:scale-105 transition-all duration-200 ease-out",
      "shadow-sm hover:shadow-md",
      "active:scale-95",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <Check className="h-4 w-4 text-fieldporter-white" strokeWidth={3} />
      </motion.div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
EnterpriseCheckbox.displayName = "EnterpriseCheckbox";

export { Checkbox, EnterpriseCheckbox, GlassCheckbox };
