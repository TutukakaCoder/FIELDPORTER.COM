'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * ScrollRestoration component ensures proper scroll behavior when navigating between pages
 * - Automatically scrolls to top on route changes
 * - Maintains smooth scroll behavior for anchor links
 * - Handles hash navigation properly
 */
export function ScrollRestoration() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Only scroll to top if the pathname actually changed (not just hash)
    const currentBasePath = pathname.split('#')[0];
    const previousBasePath = previousPathname.current.split('#')[0];
    
    if (currentBasePath !== previousBasePath) {
      // Scroll to top when navigating to a different page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pathname.includes('#')) {
      // Handle hash navigation within the same page
      const hash = pathname.split('#')[1];
      if (hash) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }, 100);
      }
    }

    // Update the previous pathname
    previousPathname.current = pathname;
  }, [pathname]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopstate = () => {
      // Check if there's a hash in the URL
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }, 100);
        }
      }
    };

    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

  return null; // This component doesn't render anything
} 