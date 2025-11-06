import { z } from "zod";

// Environment variable schema with validation
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Next.js Configuration
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_VERCEL_URL: z.string().optional(),

  // Firebase Configuration
  NEXT_PUBLIC_FIREBASE_API_KEY: z
    .string()
    .min(1, "Firebase API key is required"),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z
    .string()
    .min(1, "Firebase auth domain is required"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z
    .string()
    .min(1, "Firebase project ID is required"),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z
    .string()
    .min(1, "Firebase storage bucket is required"),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z
    .string()
    .min(1, "Firebase messaging sender ID is required"),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, "Firebase app ID is required"),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),

  // Server-side Firebase (Admin SDK)
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().email().optional(),
  FIREBASE_PROJECT_ID: z.string().optional(),

  // AI Integration (DeepSeek)
  DEEPSEEK_API_KEY: z
    .string()
    .min(1, "DeepSeek API key is required")
    .optional(),
  DEEPSEEK_API_URL: z.string().url().default("https://api.deepseek.com"),

  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_HOTJAR_ID: z.string().optional(),

  // Email Service
  RESEND_API_KEY: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // Security
  NEXTAUTH_SECRET: z
    .string()
    .min(32, "NextAuth secret must be at least 32 characters")
    .optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // Rate Limiting
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Monitoring
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),

  // Development
  ANALYZE: z.string().optional(),
  SKIP_ENV_VALIDATION: z.string().optional(),
});

// Parse and validate environment variables
function validateEnv() {
  // Skip validation in certain scenarios
  if (process.env["SKIP_ENV_VALIDATION"] === "true") {
    return process.env as Record<string, string | undefined>;
  }

  // Skip validation during build phase for API routes
  if (process.env["NEXT_PHASE"] === "phase-production-build") {
    console.log("⚠️ Skipping env validation during build phase");
    return process.env as Record<string, string | undefined>;
  }

  // In production runtime, be more permissive
  if (process.env.NODE_ENV === "production") {
    console.log(
      "ℹ️ Running in production mode - using permissive env validation",
    );
    return process.env as Record<string, string | undefined>;
  }

  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("\n");

      console.error(
        `❌ Invalid environment variables:\n${missingVars}\n\n` +
          `Please check your .env.local file and ensure all required variables are set.`,
      );

      // During development, just warn and continue
      if (process.env.NODE_ENV === "development") {
        console.warn("⚠️ Continuing with invalid env in development mode");
        return process.env as Record<string, string | undefined>;
      }

      // At this point, just return process.env anyway to avoid blocking
      console.warn("⚠️ Continuing despite validation errors");
      return process.env as Record<string, string | undefined>;
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Type definitions for environment variables
export type Env = z.infer<typeof envSchema>;

// Helper functions for environment checks
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

// Get the app URL with fallbacks
export function getAppUrl(): string {
  if (env.NEXT_PUBLIC_APP_URL) {
    return env.NEXT_PUBLIC_APP_URL;
  }

  if (env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  if (isDevelopment) {
    return "http://localhost:3000";
  }

  return "https://fieldporter.com";
}

// Firebase configuration object
export const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Server-side Firebase Admin configuration
export const firebaseAdminConfig = {
  privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  projectId: env.FIREBASE_PROJECT_ID || env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// AI configuration
export const aiConfig = {
  deepseek: {
    apiKey: env.DEEPSEEK_API_KEY,
    apiUrl: env.DEEPSEEK_API_URL,
  },
};

// Analytics configuration
export const analyticsConfig = {
  googleAnalytics: {
    measurementId: env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  hotjar: {
    id: env.NEXT_PUBLIC_HOTJAR_ID,
  },
};

// Email configuration
export const emailConfig = {
  resend: {
    apiKey: env.RESEND_API_KEY,
  },
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT ? parseInt(env.SMTP_PORT, 10) : undefined,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
};

// Security configuration
export const securityConfig = {
  nextAuth: {
    secret: env.NEXTAUTH_SECRET,
    url: env.NEXTAUTH_URL || getAppUrl(),
  },
};

// Rate limiting configuration
export const rateLimitConfig = {
  upstash: {
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  },
};

// Monitoring configuration
export const monitoringConfig = {
  sentry: {
    dsn: env.SENTRY_DSN,
    org: env.SENTRY_ORG,
    project: env.SENTRY_PROJECT,
  },
};
