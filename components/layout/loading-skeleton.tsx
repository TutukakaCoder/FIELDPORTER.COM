'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  animate = true,
}: SkeletonProps) {
  const baseClasses = 'bg-white/10 animate-pulse';

  const variantClasses = {
    default: 'rounded-lg',
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const skeletonElement = (
    <div className={cn(baseClasses, variantClasses[variant], className)} style={style} />
  );

  if (!animate) {
    return skeletonElement;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {skeletonElement}
    </motion.div>
  );
}

// Page Loading Skeleton
export function PageLoadingSkeleton() {
  return (
    <div className='min-h-screen bg-black pt-20'>
      <div className='container-fieldporter py-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-8'
        >
          {/* Header Skeleton */}
          <div className='space-y-4'>
            <Skeleton className='h-12 w-3/4 max-w-2xl' />
            <Skeleton className='h-6 w-1/2 max-w-lg' />
          </div>

          {/* Content Skeleton */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className='space-y-4'
              >
                <Skeleton className='h-48 w-full' />
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Card Loading Skeleton
export function CardLoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className='glass-dark rounded-xl p-6 space-y-4'
        >
          <Skeleton className='h-6 w-3/4' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
          <div className='flex space-x-2 pt-2'>
            <Skeleton className='h-8 w-20' />
            <Skeleton className='h-8 w-16' />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Text Loading Skeleton
export function TextLoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className='space-y-3'>
      {[...Array(lines)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <Skeleton variant='text' className={cn(i === lines - 1 ? 'w-2/3' : 'w-full')} />
        </motion.div>
      ))}
    </div>
  );
}

// Navigation Loading Skeleton
export function NavigationLoadingSkeleton() {
  return (
    <div className='flex items-center space-x-8'>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className='h-6 w-16' animate={false} />
      ))}
    </div>
  );
}
