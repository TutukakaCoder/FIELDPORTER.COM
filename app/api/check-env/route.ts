import { isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    configured: {
      gemini: Boolean(process.env["GEMINI_API_KEY"]),
      resend: Boolean(process.env["RESEND_API_KEY"]),
      firebaseAdmin: isFirebaseAdminConfigured(),
      calcomWebhook: Boolean(process.env["CALCOM_WEBHOOK_SECRET"]),
      calcomEmbed: Boolean(
        process.env["NEXT_PUBLIC_CAL_USERNAME"] &&
          process.env["NEXT_PUBLIC_CAL_EVENT_SLUG"],
      ),
    },
    nodeEnv: process.env.NODE_ENV || "unknown",
  });
}
