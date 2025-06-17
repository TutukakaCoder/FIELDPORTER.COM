// FIELDPORTER Enterprise Type Definitions
// Premium AI Consultancy Platform Types

// ============================================================================
// CORE BUSINESS TYPES
// ============================================================================

export interface ConsultationRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  companySize: 'startup' | 'scale-up' | 'enterprise' | 'fortune-500';
  industry: string;
  aiMaturityLevel: 'exploring' | 'piloting' | 'scaling' | 'optimizing';
  projectScope: 'strategy' | 'implementation' | 'transformation' | 'optimization';
  budget: 'under-50k' | '50k-250k' | '250k-1m' | 'over-1m';
  timeline: 'immediate' | '1-3-months' | '3-6-months' | '6-12-months';
  message: string;
  leadScore: number;
  status: 'new' | 'qualified' | 'contacted' | 'proposal-sent' | 'closed-won' | 'closed-lost';
  createdAt: Date;
  updatedAt: Date;
}

export interface AIInteraction {
  id: string;
  sessionId: string;
  userId?: string;
  message: string;
  response: string;
  context: Record<string, unknown>;
  leadQualificationData?: Partial<ConsultationRequest>;
  timestamp: Date;
  responseTime: number;
  cost: number;
  model: 'deepseek-chat' | 'deepseek-coder';
}

// ============================================================================
// UI COMPONENT TYPES
// ============================================================================

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends ComponentProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// ============================================================================
// NAVIGATION & LAYOUT TYPES
// ============================================================================

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
  children?: NavigationItem[];
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

// ============================================================================
// FORM & VALIDATION TYPES
// ============================================================================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: string) => string | null;
  };
  options?: Array<{ value: string; label: string }>;
}

export interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================================================
// ANALYTICS & PERFORMANCE TYPES
// ============================================================================

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, string | number | boolean>;
  timestamp: Date;
  userId?: string;
  sessionId: string;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================================================
// ENVIRONMENT & CONFIG TYPES
// ============================================================================

export interface AppConfig {
  env: 'development' | 'staging' | 'production';
  apiUrl: string;
  firebase: {
    projectId: string;
    apiKey: string;
    authDomain: string;
    storageBucket: string;
  };
  deepseek: {
    apiKey: string;
    baseUrl: string;
    model: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    hotjarId?: string;
  };
  features: {
    aiChat: boolean;
    leadScoring: boolean;
    analytics: boolean;
  };
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ============================================================================
// BRAND TYPES
// ============================================================================

export interface BrandColors {
  primary: {
    black: string;
    blue: string;
    white: string;
    gray: string;
  };
  functional: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export interface TypographyScale {
  display: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  body: string;
  caption: string;
}

export interface ColorPalette {
  black: string;
  blue: string;
  white: string;
  gray: string;
}
