"use client";

import { motion } from "framer-motion";
import * as React from "react";

import { getMotionConfig, premiumInputFocus } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  enableAnimations?: boolean;
  validationState?: "initial" | "success" | "error";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      enableAnimations = true,
      validationState = "initial",
      ...props
    },
    ref,
  ) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (shouldAnimate) {
      return (
        <motion.textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            // FIELDPORTER Premium Styling
            "bg-bg-fieldporter-tertiary border-fieldporter-gray/30 text-fieldporter-white",
            "placeholder:text-fieldporter-gray/60 font-inter",
            "focus:border-fieldporter-blue focus:ring-fieldporter-blue/20",
            "focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]",
            "hover:border-fieldporter-gray/50 transition-all duration-200 ease-out",
            "backdrop-blur-sm resize-none",
            // Mobile optimizations
            "min-h-[100px] touch-manipulation",
            "text-base", // Prevents zoom on iOS (16px minimum)
            className,
          )}
          ref={ref}
          variants={premiumInputFocus}
          initial="initial"
          animate={validationState}
          whileFocus="focused"
          // Only spread safe props
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          readOnly={props.readOnly}
          autoFocus={props.autoFocus}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyUp}
          id={props.id}
          name={props.name}
          rows={props.rows}
          cols={props.cols}
          maxLength={props.maxLength}
          minLength={props.minLength}
          aria-label={props["aria-label"]}
          aria-describedby={props["aria-describedby"]}
          aria-invalid={props["aria-invalid"]}
        />
      );
    }

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          // FIELDPORTER Premium Styling
          "bg-bg-fieldporter-tertiary border-fieldporter-gray/30 text-fieldporter-white",
          "placeholder:text-fieldporter-gray/60 font-inter",
          "focus:border-fieldporter-blue focus:ring-fieldporter-blue/20",
          "hover:border-fieldporter-gray/50 transition-all duration-200 ease-out",
          "backdrop-blur-sm resize-none",
          // Mobile optimizations
          "min-h-[100px] touch-manipulation",
          "text-base", // Prevents zoom on iOS (16px minimum)
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

// FIELDPORTER Premium Textarea Variants
const GlassTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      enableAnimations = true,
      validationState = "initial",
      ...props
    },
    ref,
  ) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (shouldAnimate) {
      return (
        <motion.textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-lg backdrop-blur-md bg-white/10 border border-white/20",
            "px-4 py-3 text-fieldporter-white font-inter",
            "placeholder:text-white/60",
            "focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50 focus:border-fieldporter-blue/50",
            "focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]",
            "hover:bg-white/15 hover:border-white/30 transition-all duration-200 ease-out",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            // Mobile optimizations
            "min-h-[120px] touch-manipulation",
            "text-base", // Prevents zoom on iOS (16px minimum)
            className,
          )}
          ref={ref}
          variants={premiumInputFocus}
          initial="initial"
          animate={validationState}
          whileFocus="focused"
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.2 }}
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          readOnly={props.readOnly}
          autoFocus={props.autoFocus}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          id={props.id}
          name={props.name}
          rows={props.rows}
          cols={props.cols}
          maxLength={props.maxLength}
          minLength={props.minLength}
          aria-label={props["aria-label"]}
          aria-describedby={props["aria-describedby"]}
          aria-invalid={props["aria-invalid"]}
        />
      );
    }

    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg backdrop-blur-md bg-white/10 border border-white/20",
          "px-4 py-3 text-fieldporter-white font-inter",
          "placeholder:text-white/60",
          "focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50 focus:border-fieldporter-blue/50",
          "hover:bg-white/15 hover:border-white/30 transition-all duration-200 ease-out",
          "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          // Mobile optimizations
          "min-h-[120px] touch-manipulation",
          "text-base", // Prevents zoom on iOS (16px minimum)
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
GlassTextarea.displayName = "GlassTextarea";

const EnterpriseTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      enableAnimations = true,
      validationState = "initial",
      ...props
    },
    ref,
  ) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (shouldAnimate) {
      return (
        <motion.textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-lg bg-bg-fieldporter-secondary border border-fieldporter-gray/20",
            "px-4 py-3 text-base text-fieldporter-white font-inter",
            "placeholder:text-fieldporter-gray/70",
            "focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:border-fieldporter-blue",
            "focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]",
            "hover:border-fieldporter-gray/40 transition-all duration-200 ease-out",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            "shadow-sm hover:shadow-md",
            className,
          )}
          ref={ref}
          variants={premiumInputFocus}
          initial="initial"
          animate={validationState}
          whileFocus="focused"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          readOnly={props.readOnly}
          autoFocus={props.autoFocus}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          id={props.id}
          name={props.name}
          rows={props.rows}
          cols={props.cols}
          maxLength={props.maxLength}
          minLength={props.minLength}
          aria-label={props["aria-label"]}
          aria-describedby={props["aria-describedby"]}
          aria-invalid={props["aria-invalid"]}
        />
      );
    }

    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg bg-bg-fieldporter-secondary border border-fieldporter-gray/20",
          "px-4 py-3 text-base text-fieldporter-white font-inter",
          "placeholder:text-fieldporter-gray/70",
          "focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:border-fieldporter-blue",
          "hover:border-fieldporter-gray/40 transition-all duration-200 ease-out",
          "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          "shadow-sm hover:shadow-md",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
EnterpriseTextarea.displayName = "EnterpriseTextarea";

export { EnterpriseTextarea, GlassTextarea, Textarea };
