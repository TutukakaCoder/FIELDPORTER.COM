// Teaching-focused response constraints and utilities
export const TEACHING_RESPONSE_CONSTRAINTS = {
  defaultMaxTokens: 150,
  expandedMaxTokens: 300,
  temperature: 0.4,
  maxSentences: 3,
  timeoutSeconds: 12,
} as const;

export const TEACHING_KEYWORDS = {
  challenges: [
    "challenge",
    "problem",
    "difficulty",
    "bottleneck",
    "inefficiency",
    "manual process",
    "time consuming",
    "costing us",
    "losing time",
    "struggling with",
  ],
  engagement: [
    "how does",
    "what happens",
    "tell me about",
    "explain",
    "understand",
    "learn more",
    "interested in",
    "curious about",
  ],
  readiness: [
    "budget",
    "timeline",
    "when can",
    "how soon",
    "next steps",
    "getting started",
    "move forward",
    "begin",
  ],
} as const;

// Analytics compatibility - adapted for teaching approach
export const BUSINESS_INTELLIGENCE_KEYWORDS = {
  highValue: [
    "budget",
    "investment",
    "scale",
    "growth",
    "efficiency",
    "roi",
    "save time",
    "competitive advantage",
    "optimize",
    "streamline",
    "automate workflow",
  ],
  urgency: [
    "immediately",
    "asap",
    "urgent",
    "this quarter",
    "within weeks",
    "starting soon",
    "timeline",
    "deadline",
    "need now",
    "can't wait",
  ],
  painPoints: [
    "manual process",
    "time consuming",
    "inefficient",
    "bottleneck",
    "expensive",
    "difficult to scale",
    "taking too long",
    "costing us",
    "losing money",
    "wasting time",
  ],
  technicalSophistication: [
    "api",
    "integration",
    "workflow",
    "automation",
    "system",
    "database",
    "architecture",
    "scalable",
    "enterprise",
    "technical team",
  ],
} as const;

export const QUALIFICATION_SCORING = {
  baseScore: 2,
  businessEmail: 2,
  painPointMentioned: 3,
  budgetDiscussion: 3,
  timelineUrgency: 2,
  caseStudyRequest: 2,
  contactInfoProvided: 5,
  technicalQuestions: 2,
  competitorMentioned: 2,
  specificUseCase: 3,
  qualificationThreshold: 8,
} as const;

export const TEACHING_RESPONSES = {
  greeting: [
    "Hey! I'm Porter, here to help you figure out how AI could transform your business. What's the biggest time-waster in your operations right now?",
    "Hi there! I'm Porter from FIELDPORTER. Instead of jumping into services, let me understand your challenge first. What's eating up your team's time?",
    "Hello! I'm Porter, and I love helping businesses discover their AI potential. What specific operational headache brought you here today?",
  ],

  whatWeDo: [
    "Instead of listing services, let me understand what you need first. What business challenge has you exploring AI solutions?",
    "Rather than talk about what we do, I'm curious about what you're trying to solve. What's your biggest operational bottleneck?",
    "Good question! But I'd rather learn about your specific needs first. What challenge is costing your team the most time right now?",
  ],

  pricing: [
    "Investment depends entirely on your specific needs. What problem are you looking to solve? I can give you a sense of what similar transformations typically involve.",
    "Every situation is different, so let's understand your challenge first. What's the main inefficiency you're trying to address?",
    "That's a great question for Freddy. What's your email so he can send you specific insights about costs for your situation?",
  ],

  capability: [
    "That's a great question for Freddy. What's your email so he can send you specific insights on that topic?",
    "I'd love to connect you with our team for the detailed technical discussion. What's your email?",
    "That warrants a conversation with Freddy directly. Drop your email and he'll follow up with specific insights.",
  ],
} as const;

export const FALLBACK_RESPONSES = {
  timeout:
    "I'm experiencing some technical delays. What's your email so Freddy can follow up directly with insights for your situation?",

  error:
    "Technical issue on my end. All conversations are reviewed by our team, so if you leave your email, we'll follow up with personalized insights.",

  inappropriate:
    "I focus on helping businesses discover their AI transformation potential. What specific operational challenge is your team facing?",

  outOfScope:
    "That's outside my teaching wheelhouse. What's your email so Freddy can send you specific insights on that topic?",
} as const;
