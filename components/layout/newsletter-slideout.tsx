'use client';

import { Button } from '@/components/ui/button';
import { EnterpriseInput } from '@/components/ui/input';
import { firebaseNewsletterService } from '@/lib/firebase-newsletter';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Mail, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NewsletterSlideoutProps {
  className?: string;
}

export function NewsletterSlideout({ className }: NewsletterSlideoutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailValidation, setEmailValidation] = useState<'initial' | 'success' | 'error'>(
    'initial'
  );

  // Trigger logic
  useEffect(() => {
    // Check if dismissed recently
    const dismissed = localStorage.getItem('fieldporter_newsletter_dismissed');
    const sessionShown = sessionStorage.getItem('fieldporter_newsletter_shown');

    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (dismissedTime > sevenDaysAgo) return;
    }

    if (sessionShown) return;

    // Don't show on contact page (users are already engaging)
    if (typeof window !== 'undefined' && window.location.pathname === '/contact') return;

    let scrollTriggered = false;
    let timeTriggered = false;

    // Time-based trigger (30 seconds)
    const timeoutTrigger = () => {
      if (!scrollTriggered && !timeTriggered) {
        timeTriggered = true;
        setIsVisible(true);
        sessionStorage.setItem('fieldporter_newsletter_shown', 'true');

        // Track trigger type
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_slideout_shown', {
            trigger_type: 'time',
            trigger_delay: 30,
          });
        }
      }
    };

    // Scroll-based trigger (80% of page)
    const handleScroll = () => {
      if (scrollTriggered || timeTriggered) return;

      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent >= 80) {
        scrollTriggered = true;
        setIsVisible(true);
        sessionStorage.setItem('fieldporter_newsletter_shown', 'true');

        // Track trigger type
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_slideout_shown', {
            trigger_type: 'scroll',
            scroll_percent: Math.round(scrollPercent),
          });
        }

        window.removeEventListener('scroll', handleScroll);
      }
    };

    // Exit intent trigger (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (scrollTriggered || timeTriggered) return;
      if (e.clientY <= 0 && window.innerWidth > 768) {
        timeTriggered = true; // Use timeTriggered to prevent duplicate
        setIsVisible(true);
        sessionStorage.setItem('fieldporter_newsletter_shown', 'true');

        // Track trigger type
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_slideout_shown', {
            trigger_type: 'exit_intent',
          });
        }
      }
    };

    // Set up triggers
    const timeoutId = setTimeout(timeoutTrigger, 30000); // 30 seconds
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('fieldporter_newsletter_dismissed', Date.now().toString());

    // Track dismissal
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'newsletter_slideout_dismissed', {
        time_on_screen: Date.now(),
      });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail.trim() || isSubmitting) return;

    // Validate email with visual feedback
    const validation = firebaseNewsletterService.validateEmail(newsletterEmail);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid email');
      setEmailValidation('error');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setEmailValidation('initial');

    try {
      const result = await firebaseNewsletterService.subscribeToNewsletter({
        email: newsletterEmail,
        source: 'slideout',
        metadata: {
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          trigger_type: 'slideout_conversion',
        },
      });

      if (result.success) {
        setIsSubscribed(true);
        setNewsletterEmail('');
        setEmailValidation('success');

        // Track successful conversion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_slideout_converted', {
            email_domain: newsletterEmail.split('@')[1]?.toLowerCase(),
          });
        }
      } else {
        setError(result.error || 'Subscription failed. Please try again.');
        setEmailValidation('error');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
      setEmailValidation('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setNewsletterEmail(value);
    setError(null);

    // Update validation state for premium feedback
    if (value.trim().length === 0) {
      setEmailValidation('initial');
    } else if (value.includes('@') && value.trim().length > 5) {
      setEmailValidation('success');
    } else {
      setEmailValidation('initial');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
            onClick={handleDismiss}
          />

          {/* Centered Modal Component */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.4,
            }}
            className={cn(
              'fixed z-[9999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              'w-[calc(100vw-2rem)] max-w-md mx-auto',
              'bg-gradient-to-br from-fieldporter-black via-fieldporter-black to-fieldporter-black/95',
              'border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl',
              'bg-black/90 backdrop-blur-md',
              className
            )}
          >
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className='absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 z-10'
              aria-label='Close newsletter signup'
            >
              <X className='w-4 h-4' />
            </button>

            <div className='p-8'>
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className='text-center space-y-6'
                >
                  <div className='w-20 h-20 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto'>
                    <CheckCircle className='w-10 h-10 text-green-400' />
                  </div>
                  <div className='space-y-3'>
                    <h3 className='text-white font-bold text-xl'>Successfully subscribed!</h3>
                    <p className='text-white/70 text-sm leading-relaxed'>
                      You&apos;ll receive our next insights newsletter within the week.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className='space-y-8'
                >
                  {/* Header */}
                  <div className='text-center space-y-4'>
                    <div className='w-16 h-16 rounded-2xl bg-fieldporter-blue/20 border border-fieldporter-blue/30 flex items-center justify-center mx-auto'>
                      <Mail className='w-8 h-8 text-fieldporter-blue' />
                    </div>
                    <div className='space-y-3'>
                      <h3 className='text-white font-bold text-xl md:text-2xl'>
                        Stay ahead of AI innovation
                      </h3>
                      <p className='text-white/70 text-sm leading-relaxed'>
                        Get exclusive insights on AI strategy, implementation best practices, and
                        industry trends delivered monthly.
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleNewsletterSubmit} className='space-y-6'>
                    <div className='space-y-3'>
                      <label className='text-white/80 text-sm font-medium'>
                        Enter your email address
                      </label>
                      <EnterpriseInput
                        type='email'
                        placeholder='your@email.com'
                        value={newsletterEmail}
                        onChange={e => handleEmailChange(e.target.value)}
                        enableAnimations={true}
                        validationState={emailValidation}
                        className='h-12 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-fieldporter-blue focus:ring-fieldporter-blue/20 rounded-xl'
                        required
                      />
                      {error && <p className='text-red-400 text-xs'>{error}</p>}
                    </div>

                    <Button
                      type='submit'
                      variant='fieldporter-blue'
                      size='default'
                      disabled={isSubmitting || !newsletterEmail.trim()}
                      enableAnimations={true}
                      isLoading={isSubmitting}
                      className='w-full h-12 text-base font-medium'
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </form>

                  {/* Privacy Note */}
                  <div className='text-center space-y-3 pt-4 border-t border-white/10'>
                    <p className='text-white/60 text-sm font-medium'>
                      Don&apos;t worry, we won&apos;t spam you
                    </p>
                    <p className='text-white/50 text-xs leading-relaxed'>
                      Quality insights only. Unsubscribe with one click anytime. We respect your
                      inbox.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
