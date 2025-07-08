import { useEffect, useRef, useState } from 'react';

export function useStableMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);
  const isInitialized = useRef(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Single initialization check
    if (!isInitialized.current) {
      const checkMobile = () => window.innerWidth < breakpoint;
      setIsMobile(checkMobile());
      isInitialized.current = true;
    }

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        const newIsMobile = window.innerWidth < breakpoint;
        setIsMobile(current => {
          // Only update if actually changed
          return current !== newIsMobile ? newIsMobile : current;
        });
      }, 150); // Debounce delay
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [breakpoint]);

  return isMobile;
}

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      isInitialized.current = true;

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    // Return empty cleanup function for other code paths
    return () => {};
  }, []);

  return prefersReducedMotion;
} 