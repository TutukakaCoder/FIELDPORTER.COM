"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Centralized scroll state manager
 * Replaces 11+ individual scroll listeners with a single optimized one
 * Prevents layout thrashing during scroll events
 */

interface ScrollState {
  scrollY: number;
  isScrolling: boolean;
  isScrolled: boolean; // Past threshold (20px)
  scrollDirection: "up" | "down" | "none";
}

// Singleton scroll state
let scrollState: ScrollState = {
  scrollY: 0,
  isScrolling: false,
  isScrolled: false,
  scrollDirection: "none",
};

// Subscribers set
const subscribers = new Set<() => void>();

// Internal state
let scrollTimeout: NodeJS.Timeout | null = null;
let lastScrollY = 0;
let ticking = false;
let listenerAttached = false;

const SCROLL_THRESHOLD = 20;
const SCROLL_RESUME_DELAY = 100; // ms after scroll stops

function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

function updateScrollState() {
  if (typeof window === "undefined") return;

  const currentScrollY = window.scrollY;
  const direction =
    currentScrollY > lastScrollY
      ? "down"
      : currentScrollY < lastScrollY
        ? "up"
        : scrollState.scrollDirection;

  const newState: ScrollState = {
    scrollY: currentScrollY,
    isScrolling: true,
    isScrolled: currentScrollY > SCROLL_THRESHOLD,
    scrollDirection: direction,
  };

  // Only notify if something meaningful changed
  if (
    scrollState.isScrolling !== newState.isScrolling ||
    scrollState.isScrolled !== newState.isScrolled ||
    scrollState.scrollDirection !== newState.scrollDirection ||
    Math.abs(scrollState.scrollY - newState.scrollY) > 10 // Batch small changes
  ) {
    scrollState = newState;
    lastScrollY = currentScrollY;
    notifySubscribers();
  }

  // Clear existing timeout
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  // Set scroll end timeout
  scrollTimeout = setTimeout(() => {
    scrollState = {
      ...scrollState,
      isScrolling: false,
      scrollDirection: "none",
    };
    notifySubscribers();
  }, SCROLL_RESUME_DELAY);
}

function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollState();
      ticking = false;
    });
    ticking = true;
  }
}

function subscribe(callback: () => void): () => void {
  subscribers.add(callback);

  // Attach listener on first subscriber
  if (!listenerAttached && typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll, { passive: true });
    listenerAttached = true;
    // Initialize state
    scrollState = {
      scrollY: window.scrollY,
      isScrolling: false,
      isScrolled: window.scrollY > SCROLL_THRESHOLD,
      scrollDirection: "none",
    };
    lastScrollY = window.scrollY;
  }

  return () => {
    subscribers.delete(callback);

    // Detach listener when no subscribers
    if (subscribers.size === 0 && listenerAttached) {
      window.removeEventListener("scroll", handleScroll);
      listenerAttached = false;
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }
    }
  };
}

function getSnapshot(): ScrollState {
  return scrollState;
}

function getServerSnapshot(): ScrollState {
  return {
    scrollY: 0,
    isScrolling: false,
    isScrolled: false,
    scrollDirection: "none",
  };
}

/**
 * Hook to access centralized scroll state
 * Uses useSyncExternalStore for optimal React 18+ performance
 */
export function useScrollState(): ScrollState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Hook for just isScrolling state (most common use case)
 * Optimized to only re-render when isScrolling changes
 */
export function useIsScrolling(): boolean {
  const isScrollingRef = useRef(false);

  const subscribeScrolling = useCallback((callback: () => void) => {
    const unsubscribe = subscribe(() => {
      if (isScrollingRef.current !== scrollState.isScrolling) {
        isScrollingRef.current = scrollState.isScrolling;
        callback();
      }
    });
    return unsubscribe;
  }, []);

  const getScrollingSnapshot = useCallback(() => {
    return scrollState.isScrolling;
  }, []);

  const getServerScrollingSnapshot = useCallback(() => {
    return false;
  }, []);

  return useSyncExternalStore(
    subscribeScrolling,
    getScrollingSnapshot,
    getServerScrollingSnapshot,
  );
}

/**
 * Hook for header-specific scroll state
 * Only re-renders when isScrolled changes (threshold-based)
 */
export function useIsScrolled(): boolean {
  const isScrolledRef = useRef(false);

  const subscribeScrolled = useCallback((callback: () => void) => {
    const unsubscribe = subscribe(() => {
      if (isScrolledRef.current !== scrollState.isScrolled) {
        isScrolledRef.current = scrollState.isScrolled;
        callback();
      }
    });
    return unsubscribe;
  }, []);

  const getScrolledSnapshot = useCallback(() => {
    return scrollState.isScrolled;
  }, []);

  const getServerScrolledSnapshot = useCallback(() => {
    return false;
  }, []);

  return useSyncExternalStore(
    subscribeScrolled,
    getScrolledSnapshot,
    getServerScrolledSnapshot,
  );
}
