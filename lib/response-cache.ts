/**
 * FIELDPORTER Intelligent Response Caching System
 * Optimized for <1 second response times on 80% of queries
 */

import { findQuickResponse, hasQuickResponse } from "./quick-responses";

interface CacheEntry {
  response: string;
  timestamp: number;
  hitCount: number;
  sessionIds: Set<string>;
  confidence: number;
}

interface CacheAnalytics {
  totalQueries: number;
  cacheHits: number;
  cacheMisses: number;
  quickResponseHits: number;
  averageResponseTime: number;
  topQueries: Array<{ query: string; count: number }>;
  cacheHitRate: number;
}

interface CachedResponse {
  response: string;
  timestamp: number;
  hitCount: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
}

export class ResponseCacheService {
  private quickResponseCache = new Map<string, CacheEntry>();
  private lruCache = new Map<string, CacheEntry>();
  private queryFrequency = new Map<string, number>();
  private analytics: CacheAnalytics = {
    totalQueries: 0,
    cacheHits: 0,
    cacheMisses: 0,
    quickResponseHits: 0,
    averageResponseTime: 0,
    topQueries: [],
    cacheHitRate: 0,
  };

  private readonly MAX_CACHE_SIZE = 500;
  private readonly QUICK_RESPONSE_TTL = 24 * 60 * 60 * 1000; // 24 hours
  private readonly LRU_CACHE_TTL = 60 * 60 * 1000; // 1 hour
  private readonly MIN_CONFIDENCE_THRESHOLD = 0.7;

  constructor() {
    this.setupCacheWarming();
    this.setupPeriodicCleanup();
  }

  /**
   * Get cached response for a query - primary entry point
   */
  async getCachedResponse(
    query: string,
    sessionId: string,
  ): Promise<{
    response: string;
    source: "quick" | "cache" | null;
    responseTime: number;
  }> {
    const startTime = Date.now();
    this.analytics.totalQueries++;

    // Normalize query for better cache hits
    const normalizedQuery = this.normalizeQuery(query);

    // Track query frequency for analytics
    this.trackQueryFrequency(normalizedQuery);

    // 1. Check for instant quick responses (0ms target)
    const quickResponse = findQuickResponse(normalizedQuery);
    if (
      quickResponse &&
      quickResponse.confidence >= this.MIN_CONFIDENCE_THRESHOLD
    ) {
      this.analytics.quickResponseHits++;
      this.analytics.cacheHits++;

      const responseTime = Date.now() - startTime;
      this.updateAnalytics(responseTime);

      return {
        response: quickResponse.response,
        source: "quick",
        responseTime,
      };
    }

    // 2. Check LRU cache for frequently asked questions (50ms target)
    const cachedEntry = this.lruCache.get(normalizedQuery);
    if (cachedEntry && this.isCacheEntryValid(cachedEntry)) {
      // Update LRU order by deleting and re-setting
      this.lruCache.delete(normalizedQuery);
      cachedEntry.hitCount++;
      cachedEntry.sessionIds.add(sessionId);
      this.lruCache.set(normalizedQuery, cachedEntry);

      this.analytics.cacheHits++;

      const responseTime = Date.now() - startTime;
      this.updateAnalytics(responseTime);

      return {
        response: cachedEntry.response,
        source: "cache",
        responseTime,
      };
    }

    // 3. No cache hit - return null for AI processing
    this.analytics.cacheMisses++;
    const responseTime = Date.now() - startTime;
    this.updateAnalytics(responseTime);

    return {
      response: "",
      source: null,
      responseTime,
    };
  }

  /**
   * Store response in cache after AI processing
   */
  storeCachedResponse(
    query: string,
    response: string,
    sessionId: string,
    confidence: number = 0.8,
  ): void {
    const normalizedQuery = this.normalizeQuery(query);

    // Don't cache low-confidence or very personalized responses
    if (
      confidence < this.MIN_CONFIDENCE_THRESHOLD ||
      this.isPersonalizedQuery(normalizedQuery)
    ) {
      return;
    }

    const cacheEntry: CacheEntry = {
      response,
      timestamp: Date.now(),
      hitCount: 1,
      sessionIds: new Set([sessionId]),
      confidence,
    };

    // Add to LRU cache
    this.addToLRUCache(normalizedQuery, cacheEntry);
  }

  /**
   * Normalize query for better cache matching
   */
  private normalizeQuery(query: string): string {
    return query
      .toLowerCase()
      .trim()
      .replace(/[\?\.\!]/g, "")
      .replace(/\s+/g, " ")
      .replace(/\b(my|our|we|i|me)\b/g, "")
      .replace(
        /\b(?!fieldporter)\w+\s?(company|corp|ltd|llc|inc)\b/gi,
        "company",
      )
      .trim();
  }

  /**
   * Check if query is too personalized to cache
   */
  private isPersonalizedQuery(query: string): boolean {
    const personalizedPatterns = [
      /\b(my company|our business|we have|i need|i want|our team)\b/i,
      /\b(specific to|unique|custom|bespoke)\b/i,
      /\b\d+\s*(employees|staff|people|users)\b/i,
      /\b[A-Z][a-z]+\s+(limited|ltd|corp|inc|llc)\b/i,
    ];

    return personalizedPatterns.some((pattern) => pattern.test(query));
  }

  /**
   * Add entry to LRU cache with size management
   */
  private addToLRUCache(query: string, entry: CacheEntry): void {
    // Remove if already exists to update position
    if (this.lruCache.has(query)) {
      this.lruCache.delete(query);
    }

    // Remove oldest entries if cache is full
    while (this.lruCache.size >= this.MAX_CACHE_SIZE) {
      const oldestKey = this.lruCache.keys().next().value;
      if (oldestKey) {
        this.lruCache.delete(oldestKey);
      }
    }

    this.lruCache.set(query, entry);
  }

  /**
   * Check if cache entry is still valid
   */
  private isCacheEntryValid(entry: CacheEntry): boolean {
    const now = Date.now();
    const age = now - entry.timestamp;

    // Quick responses have longer TTL
    const ttl =
      entry.confidence >= 0.9 ? this.QUICK_RESPONSE_TTL : this.LRU_CACHE_TTL;

    return age < ttl;
  }

  /**
   * Track query frequency for analytics
   */
  private trackQueryFrequency(query: string): void {
    const currentCount = this.queryFrequency.get(query) || 0;
    this.queryFrequency.set(query, currentCount + 1);
  }

  /**
   * Update analytics with response time
   */
  private updateAnalytics(responseTime: number): void {
    // Update running average
    const totalResponseTime =
      this.analytics.averageResponseTime * (this.analytics.totalQueries - 1);
    this.analytics.averageResponseTime =
      (totalResponseTime + responseTime) / this.analytics.totalQueries;

    // Update hit rate
    this.analytics.cacheHitRate =
      (this.analytics.cacheHits / this.analytics.totalQueries) * 100;

    // Update top queries (limit to top 20)
    this.analytics.topQueries = Array.from(this.queryFrequency.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }

  /**
   * Warm cache with common FIELDPORTER queries
   */
  private setupCacheWarming(): void {
    const commonQueries = [
      "what does fieldporter do",
      "what are your services",
      "how much does it cost",
      "can you help with automation",
      "do you have experience in my industry",
      "how long does implementation take",
      "what is your pricing model",
      "can i book a consultation",
      "what industries do you work with",
      "what is your track record",
    ];

    commonQueries.forEach((query) => {
      const quickResponse = findQuickResponse(query);
      if (quickResponse) {
        const normalizedQuery = this.normalizeQuery(query);
        this.quickResponseCache.set(normalizedQuery, {
          response: quickResponse.response,
          timestamp: Date.now(),
          hitCount: 0,
          sessionIds: new Set(),
          confidence: quickResponse.confidence,
        });
      }
    });
  }

  /**
   * Setup periodic cache cleanup
   */
  private setupPeriodicCleanup(): void {
    // Clean expired entries every 30 minutes
    setInterval(
      () => {
        this.cleanExpiredEntries();
      },
      30 * 60 * 1000,
    );
  }

  /**
   * Remove expired cache entries
   */
  private cleanExpiredEntries(): void {
    // Clean LRU cache
    for (const [key, entry] of this.lruCache.entries()) {
      if (!this.isCacheEntryValid(entry)) {
        this.lruCache.delete(key);
      }
    }

    // Clean quick response cache
    for (const [key, entry] of this.quickResponseCache.entries()) {
      if (!this.isCacheEntryValid(entry)) {
        this.quickResponseCache.delete(key);
      }
    }
  }

  /**
   * Get cache analytics and performance metrics
   */
  getAnalytics(): CacheAnalytics & {
    cacheSize: number;
    quickResponseCacheSize: number;
    performanceTarget: {
      targetHitRate: number;
      targetResponseTime: number;
      currentPerformance: "excellent" | "good" | "needs_improvement";
    };
  } {
    const currentPerformance =
      this.analytics.cacheHitRate >= 80 &&
      this.analytics.averageResponseTime <= 1000
        ? "excellent"
        : this.analytics.cacheHitRate >= 60 &&
            this.analytics.averageResponseTime <= 2000
          ? "good"
          : "needs_improvement";

    return {
      ...this.analytics,
      cacheSize: this.lruCache.size,
      quickResponseCacheSize: this.quickResponseCache.size,
      performanceTarget: {
        targetHitRate: 80,
        targetResponseTime: 1000,
        currentPerformance,
      },
    };
  }

  /**
   * Manually invalidate cache for specific queries (for content updates)
   */
  invalidateCache(patterns: string[]): number {
    let invalidatedCount = 0;

    patterns.forEach((pattern) => {
      const regex = new RegExp(pattern, "i");

      // Invalidate from LRU cache
      for (const [key] of this.lruCache.entries()) {
        if (regex.test(key)) {
          this.lruCache.delete(key);
          invalidatedCount++;
        }
      }

      // Invalidate from quick response cache
      for (const [key] of this.quickResponseCache.entries()) {
        if (regex.test(key)) {
          this.quickResponseCache.delete(key);
          invalidatedCount++;
        }
      }
    });

    return invalidatedCount;
  }

  /**
   * Clear all caches (for emergency reset)
   */
  clearAllCaches(): void {
    this.lruCache.clear();
    this.quickResponseCache.clear();
    this.queryFrequency.clear();
    this.analytics = {
      totalQueries: 0,
      cacheHits: 0,
      cacheMisses: 0,
      quickResponseHits: 0,
      averageResponseTime: 0,
      topQueries: [],
      cacheHitRate: 0,
    };
  }

  /**
   * Check if a query would likely have a quick response
   */
  wouldHaveQuickResponse(query: string): boolean {
    return hasQuickResponse(this.normalizeQuery(query));
  }
}

// Export singleton instance
export const responseCacheService = new ResponseCacheService();
