import { emailService } from "@/lib/email-service";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  challengeDescription: string;
  timeline?: string;
  budgetRange?: string;
  additionalContext?: {
    timeline?: string;
    currentTools?: string;
    teamSize?: string;
  };
}

function validateContactForm(data: any): { isValid: boolean; error?: string } {
  if (!data.name || data.name.trim().length === 0) {
    return { isValid: false, error: "Name is required" };
  }

  if (!data.email || !data.email.includes("@")) {
    return { isValid: false, error: "Valid email address is required" };
  }

  if (
    !data.challengeDescription ||
    data.challengeDescription.trim().length === 0
  ) {
    return { isValid: false, error: "Project description is required" };
  }

  return { isValid: true };
}

function calculateContactLeadScore(data: ContactFormData): {
  score: number;
  details: string[];
} {
  let score = 5; // Base score for contact form submission
  const details: string[] = ["Base contact form submission: +5 points"];

  // Business email bonus
  const email = data.email.toLowerCase();
  if (
    !email.includes("@gmail.com") &&
    !email.includes("@yahoo.com") &&
    !email.includes("@hotmail.com") &&
    !email.includes("@outlook.com")
  ) {
    score += 2;
    details.push("Business email domain: +2 points");
  }

  // Company information bonus
  if (data.company && data.company.trim().length > 3) {
    score += 1;
    details.push("Company information provided: +1 point");
  }

  // Message quality bonus - detailed description
  if (data.challengeDescription && data.challengeDescription.length > 100) {
    score += 1;
    details.push("Detailed project description (>100 chars): +1 point");
  }

  // Service interest bonus - specific project type
  if (
    data.projectType &&
    data.projectType !== "Just exploring AI possibilities"
  ) {
    score += 2;
    details.push("Specific project type identified: +2 points");
  }

  // Timeline urgency bonus
  if (
    data.additionalContext?.timeline &&
    (data.additionalContext.timeline.toLowerCase().includes("asap") ||
      data.additionalContext.timeline.toLowerCase().includes("urgent") ||
      data.additionalContext.timeline.toLowerCase().includes("immediate"))
  ) {
    score += 1;
    details.push("Urgent timeline indicated: +1 point");
  }

  // Budget indication bonus (if they mention budget even if not in range field)
  const fullText =
    `${data.challengeDescription} ${data.budgetRange || ""}`.toLowerCase();
  if (
    fullText.includes("budget") ||
    fullText.includes("$") ||
    fullText.includes("investment")
  ) {
    score += 1;
    details.push("Budget/investment mentioned: +1 point");
  }

  return { score: Math.min(score, 10), details };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate form data
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Calculate lead score
    const { score: leadScore, details: leadScoreDetails } =
      calculateContactLeadScore(body);

    // Prepare data for Firebase
    const contactData = {
      name: body.name,
      email: body.email,
      company: body.company || "",
      projectType: body.projectType || "General inquiry",
      challengeDescription: body.challengeDescription,
      timeline:
        body.additionalContext?.timeline || body.timeline || "Not specified",
      budgetRange: body.budgetRange || "Not specified",
      additionalContext: body.additionalContext || {},
      leadScore,
      leadScoreDetails,
      submittedAt: serverTimestamp(),
      source: "contact_form",
      status: "new",
      metadata: {
        userAgent: request.headers.get("user-agent"),
        referrer: request.headers.get("referer"),
      },
    };

    // Save to Firebase
    const docRef = await addDoc(
      collection(db, "contact_submissions"),
      contactData,
    );

    // Send email notification for qualified leads (same as AI chat)
    if (leadScore >= 5) {
      try {
        console.log(
          `📧 Contact form - Sending email for lead score: ${leadScore}/10`,
        );
        const emailResult = await emailService.sendNotificationEmail({
          subject: `🎯 New Contact Form Submission - Lead Score: ${leadScore}/10 - ${body.name}`,
          type: "contact",
          data: {
            ...contactData,
            id: docRef.id,
            leadScoreDetails,
          },
        });
        console.log("📧 Contact email result:", emailResult);
      } catch (emailError) {
        console.error("❌ Failed to send email notification:", emailError);
        // Don't fail the form submission if email fails
      }
    }

    // Track conversion analytics
    console.log(
      `📊 Contact form submission - Lead Score: ${leadScore}/10 - ${body.email}`,
    );

    return NextResponse.json({
      success: true,
      id: docRef.id,
      leadScore,
      message:
        "Thank you for your submission. We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again." },
      { status: 500 },
    );
  }
}
