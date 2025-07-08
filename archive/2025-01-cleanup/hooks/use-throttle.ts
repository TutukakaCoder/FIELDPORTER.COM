import { useCallback, useRef } from "react";

/**
 * Throttle hook for performance optimization of scroll events
 * @param callback - Function to throttle
 * @param delay - Throttle delay in milliseconds (default: 16ms for 60fps)
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 16,
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args: any[]) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay],
  );
}

/**
 * Optimized scroll position hook with throttling
 */
export function useOptimizedScroll() {
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollY = useCallback(() => {
    lastScrollY.current = window.scrollY;
    ticking.current = false;
  }, []);

  const requestTick = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(updateScrollY);
    }
  }, [updateScrollY]);

  return { requestTick, lastScrollY: lastScrollY.current };
}
