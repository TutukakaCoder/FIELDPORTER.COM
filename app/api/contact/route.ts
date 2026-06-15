import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { emailService } from "@/lib/email-service";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PROJECT_TYPE_SCORES: Record<string, number> = {
  "Strategic Research Intelligence": 5,
  "Rapid Development & Integration": 4,
  "Process Efficiency & Workflow Optimization": 4,
  "AI Training & Implementation Education": 3,
  "Not Sure - Let's Discuss": 2,
};

const TIMELINE_SCORES: Record<string, number> = {
  "Urgent (days)": 5,
  "Short-term (weeks)": 4,
  "Medium-term (months)": 3,
  Flexible: 2,
};

const BUDGET_SCORES: Record<string, number> = {
  "Under $3K": 2,
  "$3K-$8K": 4,
  "Above $8K": 5,
  "Let's discuss": 3,
};

function calculateContactLeadScore(data: {
  projectType: string;
  timeline: string;
  budgetRange?: string | undefined;
  company?: string | undefined;
  challengeDescription: string;
}): number {
  let score = 1;
  score += PROJECT_TYPE_SCORES[data.projectType] || 1;
  score += TIMELINE_SCORES[data.timeline] || 1;

  if (data.budgetRange) {
    score += BUDGET_SCORES[data.budgetRange] || 1;
  }

  if (data.company?.trim()) {
    score += 1;
  }

  if (data.challengeDescription.length > 100) {
    score += 1;
  }

  return Math.min(score, 10);
}

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional().default(""),
  projectType: z.string().min(1),
  challengeDescription: z.string().min(1),
  timeline: z.string().min(1),
  budgetRange: z.string().optional(),
  additionalContext: z
    .object({
      timeline: z.string().optional(),
      currentTools: z.string().optional(),
      teamSize: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const leadScore = calculateContactLeadScore(data);

    const db = getAdminDb();
    if (db) {
      await db.collection("contact_submissions").doc(submissionId).set({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        company: data.company?.trim() || null,
        project_type: data.projectType,
        challenge_description: data.challengeDescription.trim(),
        timeline: data.timeline,
        budget_range: data.budgetRange || null,
        additional_context: data.additionalContext || null,
        lead_score: leadScore,
        submitted_at: FieldValue.serverTimestamp(),
        status: "new",
        source: "contact_form",
      });
    } else if (!isFirebaseAdminConfigured()) {
      console.warn(
        "Firebase Admin not configured - contact submission email only",
      );
    }

    await emailService.sendNotificationEmail({
      subject: `New Contact: ${data.name} (Score: ${leadScore}/10)`,
      type: "contact",
      data: {
        id: submissionId,
        name: data.name,
        email: data.email,
        company: data.company,
        projectType: data.projectType,
        timeline: data.timeline,
        challengeDescription: data.challengeDescription,
        leadScore,
      },
    });

    await emailService.sendWelcomeEmail(data.email, data.name.split(" ")[0] || data.name);

    return NextResponse.json({
      success: true,
      submissionId,
      leadScore,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again." },
      { status: 500 },
    );
  }
}
