import { emailService } from "@/lib/email-service";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, displayName } = body;

    // Validate required fields
    if (!email || !displayName) {
      return NextResponse.json(
        { error: "Email and displayName are required" },
        { status: 400 },
      );
    }

    // Send welcome email
    const result = await emailService.sendWelcomeEmail(email, displayName);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Welcome email sent successfully",
      });
    } else {
      console.error("Welcome email failed:", result.error);
      return NextResponse.json(
        { error: result.error || "Failed to send welcome email" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Welcome email API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
