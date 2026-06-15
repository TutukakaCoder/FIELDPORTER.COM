import { emailService } from "@/lib/email-service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const welcomeEmailSchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = welcomeEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { email, displayName } = parsed.data;
    const result = await emailService.sendWelcomeEmail(email, displayName);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send welcome email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Welcome email API error:", error);
    return NextResponse.json(
      { error: "Failed to send welcome email" },
      { status: 500 },
    );
  }
}
