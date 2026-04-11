export const responseCache = new Map<
  string,
  { response: string; timestamp: number }
>();
const CACHE_TTL = 3600000; // 1 hour cache
const MAX_CACHE_SIZE = 100; // Limit cache size

export function getCacheKey(message: string, sessionId: string): string {
  const normalized = message.toLowerCase().trim();
  return `${sessionId}:${normalized}`;
}

export function getCachedResponse(
  message: string,
  sessionId: string,
): string | null {
  const key = getCacheKey(message, sessionId);
  const cached = responseCache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.response;
  }

  // Clean up expired entries
  if (cached) {
    responseCache.delete(key);
  }

  return null;
}

export function setCachedResponse(
  message: string,
  sessionId: string,
  response: string,
): void {
  // Limit cache size
  if (responseCache.size >= MAX_CACHE_SIZE) {
    const firstKey = responseCache.keys().next().value;
    if (firstKey) {
      responseCache.delete(firstKey);
    }
  }

  const key = getCacheKey(message, sessionId);
  responseCache.set(key, { response, timestamp: Date.now() });
}
