// FIELDPORTER Global Type Declarations
// Enterprise-grade type definitions for global objects

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
    hj: (command: string, ...args: unknown[]) => void;
    _hjSettings: {
      hjid: number;
      hjsv: number;
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_GA_ID?: string;
      NEXT_PUBLIC_HOTJAR_ID?: string;
      NEXT_PUBLIC_FIREBASE_API_KEY?: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID?: string;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string;
      NEXT_PUBLIC_FIREBASE_APP_ID?: string;
      DEEPSEEK_API_KEY?: string;
      FIREBASE_ADMIN_PRIVATE_KEY?: string;
      FIREBASE_ADMIN_CLIENT_EMAIL?: string;
      FIREBASE_ADMIN_PROJECT_ID?: string;
    }
  }
}

// Analytics event types
export interface AnalyticsEventProperties {
  [key: string]: string | number | boolean | undefined;
}

// Google Analytics gtag types
export interface GtagConfig {
  page_title?: string;
  page_location?: string;
  custom_map?: Record<string, unknown>;
  send_page_view?: boolean;
  anonymize_ip?: boolean;
  cookie_domain?: string;
  cookie_expires?: number;
  cookie_prefix?: string;
  cookie_update?: boolean;
  cookie_flags?: string;
}

export interface GtagEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameter?: string | number | boolean;
}

// Firebase types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// DeepSeek API types
export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stream?: boolean;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: DeepSeekMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Extend existing types
declare module 'react' {
  interface CSSProperties {
    '--tw-bg-opacity'?: string;
    '--tw-text-opacity'?: string;
    '--tw-border-opacity'?: string;
    '--tw-ring-opacity'?: string;
    '--tw-shadow-color'?: string;
    '--tw-shadow-colored'?: string;
    [key: `--${string}`]: string | number | undefined;
  }
}

export {};
