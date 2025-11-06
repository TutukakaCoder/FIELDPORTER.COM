// Test if RESEND_API_KEY is available in Next.js API route context
// Visit: http://localhost:3000/api/check-env

import { emailConfig } from "@/lib/env";

export async function GET() {
  // Check all possible sources
  const sources = {
    "emailConfig.resend.apiKey": emailConfig.resend.apiKey,
    'process.env["RESEND_API_KEY"]': process.env["RESEND_API_KEY"],
  };

  const hasKey = Object.values(sources).some((v) => !!v);
  const keyValue = Object.values(sources).find((v) => v);

  const checks = {
    RESEND_API_KEY_FOUND: hasKey,
    RESEND_API_KEY_VALUE: keyValue
      ? "re_***" + keyValue.slice(-4)
      : "NOT FOUND",
    SOURCES: Object.entries(sources).map(([name, value]) => ({
      source: name,
      hasValue: !!value,
      valuePreview: value
        ? value.slice(0, 3) + "***" + value.slice(-4)
        : "empty",
    })),
    NODE_ENV: process.env.NODE_ENV,
    ALL_RESEND_KEYS: Object.keys(process.env).filter((k) =>
      k.includes("RESEND"),
    ),
    ALL_API_KEYS: Object.keys(process.env).filter((k) => k.includes("API_KEY")),
  };

  return Response.json({
    status: hasKey ? "✅ CONFIGURED" : "❌ NOT CONFIGURED",
    timestamp: new Date().toISOString(),
    checks,
    recommendation: !hasKey
      ? "❌ RESEND_API_KEY not found in any source. Check .env.local and restart dev server"
      : "✅ RESEND_API_KEY is loaded correctly. Email notifications should work.",
  });
}
