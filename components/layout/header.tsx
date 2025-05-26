'use client';

import { Button } from '@/components/ui/button';
import { BRAND, MAIN_NAVIGATION } from '@/config/constants';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

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
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }

    return undefined;
  }, [activeDropdown]);

  const isActivePage = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleDropdownToggle = (label: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-dark border-b border-white/10' : 'bg-transparent',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className='container-fieldporter'>
        <div className='flex items-center justify-between h-16 lg:h-20'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center space-x-2 group'
            aria-label='FIELDPORTER Home'
          >
            <motion.div
              className='text-2xl lg:text-3xl font-bold text-white'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {BRAND.name}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center space-x-8' role='navigation'>
            {MAIN_NAVIGATION.map(item => (
              <div key={item.label} className='relative'>
                {'children' in item && item.children ? (
                  <button
                    onClick={e => handleDropdownToggle(item.label, e)}
                    className={cn(
                      'flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:text-fieldporter-blue hover:bg-white/5',
                      'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black',
                      isActivePage(item.href) ? 'text-fieldporter-blue bg-white/5' : 'text-white'
                    )}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup='true'
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180'
                      )}
                    />
                  </button>
                ) : (
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
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {'children' in item && item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className='absolute top-full left-0 mt-2 w-64 glass-dark rounded-xl border border-white/10 shadow-xl'
                    >
                      <div className='p-2'>
                        <div className='px-3 py-2 text-xs font-medium text-fieldporter-gray uppercase tracking-wider'>
                          {item.description}
                        </div>
                        {'children' in item &&
                          item.children?.map(child => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'block px-3 py-2 rounded-lg text-sm transition-all duration-200',
                                'hover:text-fieldporter-blue hover:bg-white/5',
                                'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black',
                                isActivePage(child.href)
                                  ? 'text-fieldporter-blue bg-white/5'
                                  : 'text-white'
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className='hidden lg:flex items-center space-x-4'>
            <Button asChild className='btn-primary' size='sm'>
              <Link href='/contact'>Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='lg:hidden p-2 rounded-lg text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200'
            aria-label='Toggle mobile menu'
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='lg:hidden glass-dark border-t border-white/10'
          >
            <nav className='container-fieldporter py-4' role='navigation'>
              <div className='space-y-2'>
                {MAIN_NAVIGATION.map(item => (
                  <div key={item.label}>
                    {'children' in item && item.children ? (
                      <div>
                        <button
                          onClick={e => handleDropdownToggle(item.label, e)}
                          className={cn(
                            'flex items-center justify-between w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200',
                            'hover:text-fieldporter-blue hover:bg-white/5',
                            'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black',
                            isActivePage(item.href)
                              ? 'text-fieldporter-blue bg-white/5'
                              : 'text-white'
                          )}
                          aria-expanded={activeDropdown === item.label}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              'w-5 h-5 transition-transform duration-200',
                              activeDropdown === item.label && 'rotate-180'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className='ml-4 mt-2 space-y-1'
                            >
                              {'children' in item &&
                                item.children?.map(child => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={cn(
                                      'block px-4 py-2 rounded-lg text-sm transition-all duration-200',
                                      'hover:text-fieldporter-blue hover:bg-white/5',
                                      'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black',
                                      isActivePage(child.href)
                                        ? 'text-fieldporter-blue bg-white/5'
                                        : 'text-fieldporter-gray'
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'block px-4 py-3 rounded-lg font-medium transition-all duration-200',
                          'hover:text-fieldporter-blue hover:bg-white/5',
                          'focus:outline-none focus:ring-2 focus:ring-fieldporter-blue focus:ring-offset-2 focus:ring-offset-black',
                          isActivePage(item.href)
                            ? 'text-fieldporter-blue bg-white/5'
                            : 'text-white'
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <div className='pt-4 mt-4 border-t border-white/10'>
                  <Button asChild className='btn-primary w-full' size='lg'>
                    <Link href='/contact'>Book Consultation</Link>
                  </Button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
