// FIELDPORTER Enterprise Constants
// Premium AI Consultancy Platform Configuration

// ============================================================================
// BRAND CONSTANTS
// ============================================================================

export const BRAND = {
  name: 'FIELDPORTER',
  tagline: 'Premium AI Strategy Consultancy',
  description: 'Enterprise AI transformation through strategic consulting excellence',
  domain: 'fieldporter.com',
  email: 'freddy@fieldporter.com',
  phone: '+1 (555) 123-4567', // Update with actual number
} as const;

export const BRAND_COLORS = {
  primary: {
    black: '#000000',
    blue: '#0969DA',
    purple: '#7C3AED',
    white: '#FFFFFF',
    gray: '#6B7280',
  },
  functional: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },
} as const;

// ============================================================================
// BUSINESS CONSTANTS
// ============================================================================

export const COMPANY_SIZES = [
  { value: 'startup', label: 'Startup (1-50 employees)', priority: 1 },
  { value: 'scale-up', label: 'Scale-up (51-500 employees)', priority: 2 },
  { value: 'enterprise', label: 'Enterprise (500+ employees)', priority: 3 },
  { value: 'fortune-500', label: 'Fortune 500', priority: 4 },
] as const;

export const BUDGET_RANGES = [
  { value: 'under-50k', label: 'Under $50K', priority: 1 },
  { value: '50k-250k', label: '$50K - $250K', priority: 2 },
  { value: '250k-1m', label: '$250K - $1M', priority: 3 },
  { value: 'over-1m', label: 'Over $1M', priority: 4 },
] as const;

export const PROJECT_TIMELINES = [
  { value: 'immediate', label: 'Immediate (< 1 month)', urgency: 4 },
  { value: '1-3-months', label: '1-3 months', urgency: 3 },
  { value: '3-6-months', label: '3-6 months', urgency: 2 },
  { value: '6-12-months', label: '6-12 months', urgency: 1 },
] as const;

export const AI_MATURITY_LEVELS = [
  { value: 'exploring', label: 'Exploring AI opportunities', score: 1 },
  { value: 'piloting', label: 'Running AI pilots', score: 2 },
  { value: 'scaling', label: 'Scaling AI initiatives', score: 3 },
  { value: 'optimizing', label: 'Optimizing AI operations', score: 4 },
] as const;

export const PROJECT_SCOPES = [
  { value: 'strategy', label: 'AI Strategy Development' },
  { value: 'implementation', label: 'AI Implementation' },
  { value: 'transformation', label: 'Digital Transformation' },
  { value: 'optimization', label: 'Process Optimization' },
] as const;

// ============================================================================
// PERFORMANCE CONSTANTS
// ============================================================================

export const PERFORMANCE_TARGETS = {
  pageLoadTime: 1650, // milliseconds - enterprise standard
  firstContentfulPaint: 800,
  largestContentfulPaint: 1200,
  cumulativeLayoutShift: 0.1,
  firstInputDelay: 100,
  timeToInteractive: 1500,
} as const;

export const CACHE_DURATIONS = {
  static: 31536000, // 1 year
  dynamic: 3600, // 1 hour
  api: 300, // 5 minutes
  images: 2592000, // 30 days
} as const;

// ============================================================================
// API CONSTANTS
// ============================================================================

export const API_ENDPOINTS = {
  consultation: '/api/consultation',
  aiChat: '/api/ai/chat',
  analytics: '/api/analytics',
  contact: '/api/contact',
} as const;

export const API_LIMITS = {
  requestsPerHour: 100,
  requestsPerHourAuthenticated: 500,
  maxRequestSize: 1024 * 1024, // 1MB
  maxResponseTime: 5000, // 5 seconds
} as const;

export const DEEPSEEK_CONFIG = {
  model: 'deepseek-chat',
  maxTokens: 4000,
  temperature: 0.7,
  topP: 0.9,
  frequencyPenalty: 0.1,
  presencePenalty: 0.1,
} as const;

// ============================================================================
// NAVIGATION CONSTANTS
// ============================================================================

export const MAIN_NAVIGATION = [
  {
    label: 'Services',
    href: '/services',
    description: 'AI strategy and implementation services',
    children: [
      { label: 'AI Strategy', href: '/services/ai-strategy' },
      { label: 'Business Automation', href: '/services/automation' },
      { label: 'VC Portfolio Optimization', href: '/services/vc-consulting' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    description: 'Sector-specific AI solutions',
    children: [
      { label: 'Financial Services', href: '/industries/financial-services' },
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Technology', href: '/industries/technology' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
    description: 'AI strategy insights and thought leadership',
  },
  {
    label: 'About',
    href: '/about',
    description: 'Our team and approach',
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Get in touch for consultation',
  },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: 'AI Strategy', href: '/services/ai-strategy' },
    { label: 'Business Automation', href: '/services/automation' },
    { label: 'VC Portfolio Optimization', href: '/services/vc-consulting' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/about/team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Insights', href: '/insights' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Whitepapers', href: '/resources/whitepapers' },
    { label: 'Webinars', href: '/resources/webinars' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Data Protection', href: '/data-protection' },
  ],
} as const;

// ============================================================================
// FORM CONSTANTS
// ============================================================================

export const FORM_VALIDATION = {
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address',
  },
  phone: {
    invalid: 'Please enter a valid phone number',
  },
  companyName: {
    required: 'Company name is required',
    minLength: 'Company name must be at least 2 characters',
    maxLength: 'Company name must be less than 100 characters',
  },
  message: {
    required: 'Message is required',
    minLength: 'Message must be at least 10 characters',
    maxLength: 'Message must be less than 1000 characters',
  },
} as const;

// ============================================================================
// ANALYTICS CONSTANTS
// ============================================================================

export const ANALYTICS_EVENTS = {
  pageView: 'page_view',
  consultationRequest: 'consultation_request',
  aiChatStart: 'ai_chat_start',
  aiChatMessage: 'ai_chat_message',
  downloadResource: 'download_resource',
  contactForm: 'contact_form_submit',
  newsletterSignup: 'newsletter_signup',
} as const;

export const LEAD_SCORING = {
  thresholds: {
    high: 80,
    medium: 50,
    low: 0,
  },
  weights: {
    companySize: 0.4,
    budget: 0.3,
    timeline: 0.2,
    aiMaturity: 0.1,
  },
} as const;

// ============================================================================
// CONTENT CONSTANTS
// ============================================================================

export const SEO_DEFAULTS = {
  title: 'FIELDPORTER - Premium AI Strategy Consultancy',
  description:
    'Transform your enterprise with strategic AI consulting. Expert guidance for Fortune 500 companies implementing artificial intelligence at scale.',
  keywords: [
    'AI strategy consulting',
    'enterprise AI transformation',
    'artificial intelligence consulting',
    'AI implementation',
    'digital transformation',
    'Fortune 500 AI consulting',
  ],
  ogImage: '/og-image.jpg',
} as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/fieldporter',
  twitter: 'https://twitter.com/fieldporter',
  github: 'https://github.com/fieldporter',
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
  aiChat: true,
  leadScoring: true,
  analytics: true,
  newsletter: true,
  blog: true,
  caseStudies: true,
  webinars: false, // Coming soon
  partnerships: false, // Coming soon
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Our team has been notified.',
  rateLimit: 'Too many requests. Please try again later.',
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  consultationRequest: "Thank you! We'll be in touch within 24 hours.",
  contactForm: "Message sent successfully. We'll respond soon.",
  newsletterSignup: 'Successfully subscribed to our newsletter.',
  downloadStarted: 'Your download has started.',
} as const;
