/**
 * FIELDPORTER Quick Responses Library - PORTER AI Assistant
 * Minimal responses to force DeepSeek API usage for intelligent conversation
 */

export interface QuickResponse {
  pattern: RegExp;
  response: string;
  confidence: number;
}

// MINIMAL quick responses - most queries should go to DeepSeek
export const QUICK_RESPONSES: QuickResponse[] = [
  {
    pattern: /^(hi|hello|hey)$/i,
    response: `Hello! I'm PORTER, Frederick's AI assistant. He built me to help ambitious founders get quick insights while he's busy building actual solutions.

I'm somewhat throttled for web use - if you need my full capabilities, you'll want to talk to Frederick directly. What challenge can I help analyze?`,
    confidence: 0.95,
  },
  {
    pattern: /what is fieldporter|tell me about fieldporter/i,
    response: `Frederick helps founders move fast through AI-powered research and rapid prototyping. He's currently building two businesses while consulting - practicing what he preaches.

I can share specifics about his approach, or would you prefer to discuss your challenge directly?`,
    confidence: 0.9,
  },
];

// Simple utility functions
export function findQuickResponse(query: string): QuickResponse | null {
  const cleanQuery = query.toLowerCase().trim();

  for (const response of QUICK_RESPONSES) {
    if (response.pattern.test(cleanQuery)) {
      return response;
    }
  }

  return null;
}

export function hasQuickResponse(query: string): boolean {
  return findQuickResponse(query) !== null;
}
