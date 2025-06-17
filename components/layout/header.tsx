'use client';

import { BRAND, MAIN_NAVIGATION } from '@/config/constants';
import { animations, EASING, getMotionConfig, TIMING } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { reducedMotion } = getMotionConfig();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActivePage = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      data-cursor-zone='navigation'
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-dark border-b border-white/10' : 'bg-transparent',
        className
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0 : TIMING.normal,
        ease: EASING.easeOut,
      }}
    >
      <div className='container-fieldporter'>
        <div className='flex items-center justify-between h-16 lg:h-18'>
          {/* Logo with Enhanced Animation */}
          <Link
            href='/'
            className='flex items-center space-x-2 group'
            aria-label='FIELDPORTER Home'
          >
            <motion.div
              className='text-xl lg:text-2xl font-bold text-white'
              whileHover={{
                scale: 1.02,
                textShadow: '0 0 15px rgba(9, 105, 218, 0.4)',
              }}
              transition={{ duration: TIMING.fast, ease: EASING.easeOut }}
            >
              {BRAND.name}
            </motion.div>
          </Link>

          {/* Desktop Navigation with Staggered Animation */}
          <nav className='hidden lg:flex items-center space-x-6' role='navigation'>
            {MAIN_NAVIGATION.map((item, index) => (
              <motion.div
                key={item.label}
                className='relative'
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : TIMING.fast,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease: EASING.easeOut,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: TIMING.instant }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:text-fieldporter-blue hover:bg-white/5',
                      'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black',
                      isActivePage(item.href) ? 'text-fieldporter-blue bg-white/5' : 'text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>

                {/* Enhanced Active Page Indicator */}
                {isActivePage(item.href) && (
                  <motion.div
                    className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-fieldporter-blue rounded-full'
                    layoutId='activeIndicator'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: TIMING.fast, ease: EASING.easeOut }}
                  />
                )}
              </motion.div>
            ))}
          </nav>

          {/* CTA Button with Enhanced Animation */}
          <div className='hidden lg:flex items-center space-x-4'>
            {/* Clean navigation without aggressive CTAs */}
          </div>

          {/* Mobile Menu Button with Animation */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='lg:hidden p-3 rounded-lg text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200 min-h-[44px] min-w-[44px] touch-manipulation'
            aria-label='Toggle mobile menu'
            aria-expanded={isMobileMenuOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: TIMING.instant }}
          >
            <AnimatePresence mode='wait'>
              {isMobileMenuOpen ? (
                <motion.div
                  key='close'
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: TIMING.fast }}
                >
                  <X className='w-6 h-6' />
                </motion.div>
              ) : (
                <motion.div
                  key='menu'
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: TIMING.fast }}
                >
                  <Menu className='w-6 h-6' />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation with Enhanced Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: reducedMotion ? 0 : TIMING.normal,
              ease: EASING.easeInOut,
            }}
            className='lg:hidden glass-dark border-t border-white/10'
          >
            <nav className='container-fieldporter py-4' role='navigation'>
              <motion.div
                className='space-y-2'
                variants={animations.pageContentStagger}
                initial='initial'
                animate='animate'
              >
                {MAIN_NAVIGATION.map((item, index) => (
                  <motion.div key={item.label} variants={animations.pageContentItem}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: TIMING.instant }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'block px-4 py-4 rounded-lg font-medium transition-all duration-200 min-h-[48px] touch-manipulation',
                          'hover:text-fieldporter-blue hover:bg-white/5',
                          'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black',
                          isActivePage(item.href)
                            ? 'text-fieldporter-blue bg-white/5'
                            : 'text-white'
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Mobile CTA with Animation */}
                {/* Clean mobile navigation without aggressive CTAs */}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
