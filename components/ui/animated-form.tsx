/**
 * Animated Form Components
 * Professional form interactions with validation feedback and smooth transitions
 * for FIELDPORTER website
 */

'use client';

import {
  EASING,
  getMotionConfig,
  inputFocus,
  submitButton,
  TIMING,
  validationFeedback,
} from '@/lib/animations';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
}

interface AnimatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}

interface AnimatedSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  options: { value: string; label: string }[];
}

interface AnimatedFormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  children: React.ReactNode;
}

interface FormStepProps {
  children: React.ReactNode;
  isActive: boolean;
  direction?: 'forward' | 'backward';
}

// ============================================================================
// ANIMATED INPUT COMPONENT
// ============================================================================

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  error,
  success,
  helperText,
  icon,
  className,
  style,
  onDrag,
  onDragStart,
  onDragEnd,
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion } = getMotionConfig();

  const inputState = error ? 'error' : isFocused ? 'focus' : 'initial';

  return (
    <div className='space-y-2'>
      {label && (
        <motion.label
          className='block text-sm font-medium text-foreground'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: TIMING.fast }}
        >
          {label}
        </motion.label>
      )}

      <div className='relative'>
        {icon && (
          <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'>
            {icon}
          </div>
        )}

        <motion.input
          className={cn(
            'w-full px-3 py-2 border rounded-md transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            {
              'pl-10': icon,
              'border-destructive': error,
              'border-green-500': success,
              'border-input': !error && !success,
            },
            className
          )}
          {...(reducedMotion
            ? {}
            : { variants: inputFocus, initial: 'initial', animate: inputState })}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {success && (
          <motion.div
            className='absolute right-3 top-1/2 transform -translate-y-1/2'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: TIMING.fast, ease: EASING.bounce }}
          >
            <CheckCircle className='h-4 w-4 text-green-500' />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {(error || helperText) && (
          <motion.div
            variants={validationFeedback}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className={cn(
              'text-sm flex items-center space-x-1',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {error && <AlertCircle className='h-3 w-3' />}
            <span>{error || helperText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// ANIMATED TEXTAREA COMPONENT
// ============================================================================

const AnimatedTextarea: React.FC<AnimatedTextareaProps> = ({
  label,
  error,
  success,
  helperText,
  className,
  style,
  onDrag,
  onDragStart,
  onDragEnd,
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion } = getMotionConfig();

  const inputState = error ? 'error' : isFocused ? 'focus' : 'initial';

  return (
    <div className='space-y-2'>
      {label && (
        <motion.label
          className='block text-sm font-medium text-foreground'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: TIMING.fast }}
        >
          {label}
        </motion.label>
      )}

      <motion.textarea
        className={cn(
          'w-full px-3 py-2 border rounded-md transition-colors resize-none',
          'focus:outline-none focus:ring-2 focus:ring-primary/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'border-destructive': error,
            'border-green-500': success,
            'border-input': !error && !success,
          },
          className
        )}
        {...(reducedMotion
          ? {}
          : { variants: inputFocus, initial: 'initial', animate: inputState })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      <AnimatePresence>
        {(error || helperText) && (
          <motion.div
            variants={validationFeedback}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className={cn(
              'text-sm flex items-center space-x-1',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {error && <AlertCircle className='h-3 w-3' />}
            <span>{error || helperText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// ANIMATED SELECT COMPONENT
// ============================================================================

const AnimatedSelect: React.FC<AnimatedSelectProps> = ({
  label,
  error,
  success,
  helperText,
  options,
  className,
  style,
  onDrag,
  onDragStart,
  onDragEnd,
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion } = getMotionConfig();

  const inputState = error ? 'error' : isFocused ? 'focus' : 'initial';

  return (
    <div className='space-y-2'>
      {label && (
        <motion.label
          className='block text-sm font-medium text-foreground'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: TIMING.fast }}
        >
          {label}
        </motion.label>
      )}

      <motion.select
        className={cn(
          'w-full px-3 py-2 border rounded-md transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'border-destructive': error,
            'border-green-500': success,
            'border-input': !error && !success,
          },
          className
        )}
        {...(reducedMotion
          ? {}
          : { variants: inputFocus, initial: 'initial', animate: inputState })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      >
        <option value=''>Select an option...</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </motion.select>

      <AnimatePresence>
        {(error || helperText) && (
          <motion.div
            variants={validationFeedback}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className={cn(
              'text-sm flex items-center space-x-1',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {error && <AlertCircle className='h-3 w-3' />}
            <span>{error || helperText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// ANIMATED BUTTON COMPONENT
// ============================================================================

const AnimatedFormButton: React.FC<AnimatedFormButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  error = false,
  children,
  className,
  disabled,
  style,
  onDrag,
  onDragStart,
  onDragEnd,
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,
  ...props
}) => {
  const { reducedMotion } = getMotionConfig();

  const buttonState = loading ? 'loading' : success ? 'success' : error ? 'error' : 'idle';

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    {
      // Variants
      'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground':
        variant === 'outline',
      'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',

      // Sizes
      'h-9 px-3 text-sm': size === 'sm',
      'h-10 px-4 py-2': size === 'md',
      'h-11 px-8 text-lg': size === 'lg',
    },
    className
  );

  return (
    <motion.button
      className={baseClasses}
      {...(reducedMotion ? {} : { variants: submitButton, initial: 'idle', animate: buttonState })}
      disabled={disabled || loading}
      {...props}
    >
      <AnimatePresence mode='wait'>
        {loading ? (
          <motion.div
            key='loading'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex items-center space-x-2'
          >
            <Loader2 className='h-4 w-4 animate-spin' />
            <span>Loading...</span>
          </motion.div>
        ) : success ? (
          <motion.div
            key='success'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='flex items-center space-x-2'
          >
            <CheckCircle className='h-4 w-4' />
            <span>Success!</span>
          </motion.div>
        ) : (
          <motion.div
            key='default'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ============================================================================
// FORM STEP COMPONENT
// ============================================================================

const FormStep: React.FC<FormStepProps> = ({ children, isActive, direction = 'forward' }) => {
  const { reducedMotion } = getMotionConfig();

  if (reducedMotion) {
    return isActive ? <div>{children}</div> : null;
  }

  const variants = {
    enter: {
      x: direction === 'forward' ? 300 : -300,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: direction === 'forward' ? -300 : 300,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode='wait'>
      {isActive && (
        <motion.div
          key='step'
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            duration: TIMING.normal,
            ease: EASING.easeInOut,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// FORM PROGRESS INDICATOR
// ============================================================================

const FormProgress: React.FC<{
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}> = ({ currentStep, totalSteps, stepLabels }) => {
  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-4'>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className='flex items-center'>
              <motion.div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  {
                    'bg-primary text-primary-foreground': isActive,
                    'bg-green-500 text-white': isCompleted,
                    'bg-muted text-muted-foreground': !isActive && !isCompleted,
                  }
                )}
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? '#22C55E'
                    : isActive
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted))',
                }}
                transition={{ duration: TIMING.fast }}
              >
                {isCompleted ? <CheckCircle className='h-4 w-4' /> : stepNumber}
              </motion.div>

              {stepLabels && stepLabels[index] && (
                <span
                  className={cn(
                    'ml-2 text-sm',
                    isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}
                >
                  {stepLabels[index]}
                </span>
              )}

              {index < totalSteps - 1 && (
                <motion.div
                  className='flex-1 h-0.5 mx-4 bg-muted'
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted ? '#22C55E' : 'hsl(var(--muted))',
                  }}
                  transition={{ duration: TIMING.fast }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className='w-full bg-muted rounded-full h-2'>
        <motion.div
          className='bg-primary h-2 rounded-full'
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: TIMING.normal, ease: EASING.easeOut }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  AnimatedFormButton,
  AnimatedInput,
  AnimatedSelect,
  AnimatedTextarea,
  FormProgress,
  FormStep,
};
