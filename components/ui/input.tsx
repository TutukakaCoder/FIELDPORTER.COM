'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { getMotionConfig, premiumInputFocus, premiumInputValidation } from '@/lib/animations';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  enableAnimations?: boolean;
  validationState?: 'initial' | 'success' | 'error';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, enableAnimations = true, validationState = 'initial', ...props }, ref) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (shouldAnimate) {
      return (
        <motion.input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            // Mobile optimizations
            'min-h-[44px] touch-manipulation', // Proper touch target
            'text-base sm:text-sm', // Prevents zoom on iOS
            className
          )}
          ref={ref}
          variants={premiumInputFocus}
          initial='initial'
          animate={validationState}
          whileFocus='focused'
          // Only spread safe props
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          readOnly={props.readOnly}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyUp}
          id={props.id}
          name={props.name}
          aria-label={props['aria-label']}
          aria-describedby={props['aria-describedby']}
          aria-invalid={props['aria-invalid']}
        />
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          // Mobile optimizations
          'min-h-[44px] touch-manipulation', // Proper touch target
          'text-base sm:text-sm', // Prevents zoom on iOS
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// FIELDPORTER Premium Input Variants with Enhanced Animations
const GlassInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, enableAnimations = true, validationState = 'initial', ...props }, ref) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (shouldAnimate) {
      return (
        <motion.input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-lg backdrop-blur-md bg-white/10 border border-white/20',
            'px-4 py-3 text-fieldporter-white font-inter',
            'placeholder:text-white/60',
            'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50 focus:border-fieldporter-blue/50',
            'hover:bg-white/15 hover:border-white/30 transition-all duration-200 ease-out',
            'disabled:cursor-not-allowed disabled:opacity-50',
            // Mobile optimizations
            'min-h-[44px] touch-manipulation',
            'text-base sm:text-sm', // Prevents zoom on iOS
            className
          )}
          ref={ref}
          variants={premiumInputFocus}
          initial='initial'
          animate={validationState}
          whileFocus='focused'
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          // Only spread safe props
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          readOnly={props.readOnly}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyUp}
          id={props.id}
          name={props.name}
          aria-label={props['aria-label']}
          aria-describedby={props['aria-describedby']}
          aria-invalid={props['aria-invalid']}
        />
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg backdrop-blur-md bg-white/10 border border-white/20',
          'px-4 py-3 text-fieldporter-white font-inter',
          'placeholder:text-white/60',
          'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue/50 focus:border-fieldporter-blue/50',
          'hover:bg-white/15 hover:border-white/30 transition-all duration-200 ease-out',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Mobile optimizations
          'min-h-[44px] touch-manipulation',
          'text-base sm:text-sm', // Prevents zoom on iOS
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
  ({ className, type, enableAnimations = true, validationState = 'initial', ...props }, ref) => {
    const { reducedMotion } = getMotionConfig();
    const shouldAnimate = enableAnimations && !reducedMotion;

    if (shouldAnimate) {
      return (
        <motion.input
          type={type}
          className={cn(
            'flex h-11 sm:h-12 w-full rounded-lg bg-bg-fieldporter-secondary border border-fieldporter-gray/20',
            'px-3 sm:px-4 py-3 text-fieldporter-white font-inter',
            'placeholder:text-fieldporter-gray/70',
            'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:border-fieldporter-blue',
            'hover:border-fieldporter-gray/40 transition-all duration-200 ease-out',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'shadow-sm hover:shadow-md',
            // Mobile optimizations
            'min-h-[44px] touch-manipulation', // Ensures proper touch target
            'text-base', // Prevents zoom on iOS (16px minimum)
            className
          )}
          ref={ref}
          variants={premiumInputValidation}
          initial='initial'
          animate={validationState}
          whileFocus='focused'
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
          // Only spread safe props
          value={props.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          disabled={props.disabled}
          required={props.required}
          readOnly={props.readOnly}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyUp}
          id={props.id}
          name={props.name}
          aria-label={props['aria-label']}
          aria-describedby={props['aria-describedby']}
          aria-invalid={props['aria-invalid']}
        />
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-11 sm:h-12 w-full rounded-lg bg-bg-fieldporter-secondary border border-fieldporter-gray/20',
          'px-3 sm:px-4 py-3 text-fieldporter-white font-inter',
          'placeholder:text-fieldporter-gray/70',
          'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:border-fieldporter-blue',
          'hover:border-fieldporter-gray/40 transition-all duration-200 ease-out',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'shadow-sm hover:shadow-md',
          // Mobile optimizations
          'min-h-[44px] touch-manipulation', // Ensures proper touch target
          'text-base', // Prevents zoom on iOS (16px minimum)
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
