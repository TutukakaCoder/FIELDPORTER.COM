import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { emailService } from "@/lib/email-service";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const newsletterSchema = z.object({
  email: z.string().email(),
  source: z.string().optional().default("website"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    const { email, source } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();
    const subscriptionId = `newsletter_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const leadScore = 3;

    const db = getAdminDb();
    if (db) {
      const existing = await db
        .collection("newsletter_subscriptions")
        .where("email", "==", normalizedEmail)
        .limit(1)
        .get();

      if (!existing.empty) {
        return NextResponse.json({
          success: true,
          leadScore,
          message: "Already subscribed",
        });
      }

      await db.collection("newsletter_subscriptions").doc(subscriptionId).set({
        email: normalizedEmail,
        source,
        lead_score: leadScore,
        subscribed_at: FieldValue.serverTimestamp(),
        submitted_at: FieldValue.serverTimestamp(),
        status: "active",
      });
    } else if (!isFirebaseAdminConfigured()) {
      console.warn(
        "Firebase Admin not configured - newsletter signup email only",
      );
    }

    await emailService.sendNotificationEmail({
      subject: `Newsletter Signup: ${normalizedEmail}`,
      type: "newsletter",
      data: {
        id: subscriptionId,
        email: normalizedEmail,
        source,
        leadScore,
      },
    });

    return NextResponse.json({
      success: true,
      leadScore,
    });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500 },
    );
  }
}
