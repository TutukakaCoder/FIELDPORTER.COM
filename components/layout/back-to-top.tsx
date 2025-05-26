'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BackToTopProps {
  className?: string;
  showAfter?: number; // Show button after scrolling this many pixels
}

export function BackToTop({ className, showAfter = 400 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn('fixed bottom-8 right-8 z-40', className)}
        >
          <Button
            onClick={scrollToTop}
            size='icon'
            className={cn(
              'w-12 h-12 rounded-full shadow-lg',
              'glass-dark border border-white/20',
              'hover:border-fieldporter-blue/50 hover:bg-fieldporter-blue/20',
              'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black',
              'transition-all duration-200'
            )}
            aria-label='Back to top'
          >
            <ArrowUp className='w-5 h-5 text-white' />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
