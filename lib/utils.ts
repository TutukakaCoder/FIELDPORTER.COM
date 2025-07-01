// FIELDPORTER Enterprise Utility Functions
// Premium AI Consultancy Platform Utilities

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ============================================================================
// STYLING UTILITIES
// ============================================================================

/**
 * Combines class names with Tailwind CSS conflict resolution
 * Essential for enterprise component composition
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Enterprise email validation with comprehensive business domain support
 */
export function isValidEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Business phone number validation (international format support)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  return phoneRegex.test(cleanPhone);
}

/**
 * Enterprise company name validation
 */
export function isValidCompanyName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Format currency for enterprise pricing display
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format large numbers with appropriate suffixes (K, M, B)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * Format date for enterprise display
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", options);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return formatDate(dateObj);
}

// ============================================================================
// STRING UTILITIES
// ============================================================================

/**
 * Convert string to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

/**
 * Extract initials from name (for avatars)
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ============================================================================
// BUSINESS LOGIC UTILITIES
// ============================================================================

/**
 * Calculate lead score based on consultation request data
 */
export function calculateLeadScore(data: {
  companySize: string;
  budget: string;
  timeline: string;
  aiMaturityLevel: string;
  projectScope: string;
}): number {
  let score = 0;

  // Company size scoring
  const companySizeScores = {
    "fortune-500": 40,
    enterprise: 35,
    "scale-up": 25,
    startup: 15,
  };
  score +=
    companySizeScores[data.companySize as keyof typeof companySizeScores] || 0;

  // Budget scoring
  const budgetScores = {
    "over-1m": 30,
    "250k-1m": 25,
    "50k-250k": 15,
    "under-50k": 5,
  };
  score += budgetScores[data.budget as keyof typeof budgetScores] || 0;

  // Timeline scoring (urgency)
  const timelineScores = {
    immediate: 20,
    "1-3-months": 15,
    "3-6-months": 10,
    "6-12-months": 5,
  };
  score += timelineScores[data.timeline as keyof typeof timelineScores] || 0;

  // AI maturity scoring
  const maturityScores = {
    scaling: 10,
    optimizing: 8,
    piloting: 6,
    exploring: 4,
  };
  score +=
    maturityScores[data.aiMaturityLevel as keyof typeof maturityScores] || 0;

  return Math.min(score, 100); // Cap at 100
}

/**
 * Determine consultation priority based on lead score
 */
export function getConsultationPriority(
  leadScore: number,
): "high" | "medium" | "low" {
  if (leadScore >= 80) return "high";
  if (leadScore >= 50) return "medium";
  return "low";
}

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================================================
// ANALYTICS UTILITIES
// ============================================================================

/**
 * Generate unique session ID for analytics
 */
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Track page view for analytics
 */
export function trackPageView(
  page: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
      page_title: page,
      page_location: window.location.href,
      custom_map: properties,
    });
  }
}

/**
 * Track custom event for analytics
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>,
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, properties);
  }
}

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Create error response object
 */
export function createErrorResponse(
  message: string,
  code: string = "UNKNOWN_ERROR",
  details?: Record<string, unknown>,
) {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    meta: {
      timestamp: new Date().toISOString(),
      requestId: generateSessionId(),
      version: "1.0.0",
    },
  };
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Check if value is defined and not null
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Check if string is not empty
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Check if value is a valid number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
}
