import { emailService } from "@/lib/email-service";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

interface NewsletterSignupData {
  email: string;
  source?: string;
}

function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || !email.includes("@")) {
    return { isValid: false, error: "Valid email address is required" };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
}

function calculateNewsletterLeadScore(
  email: string,
  source: string,
): { score: number; details: string[] } {
  let score = 2; // Base score for newsletter signup
  const details: string[] = ["Newsletter signup: +2 points"];

  // Business email bonus
  const emailLower = email.toLowerCase();
  if (
    !emailLower.includes("@gmail.com") &&
    !emailLower.includes("@yahoo.com") &&
    !emailLower.includes("@hotmail.com") &&
    !emailLower.includes("@outlook.com") &&
    !emailLower.includes("@aol.com")
  ) {
    score += 3;
    details.push("Business email domain: +3 points");
  }

  // Source bonus - higher intent from specific pages
  switch (source) {
    case "insights":
      score += 2;
      details.push("Signed up from insights page: +2 points");
      break;
    case "services":
      score += 3;
      details.push("Signed up from services page: +3 points");
      break;
    case "portfolio":
      score += 2;
      details.push("Signed up from portfolio page: +2 points");
      break;
    case "contact":
      score += 1;
      details.push("Signed up from contact page: +1 point");
      break;
    default:
      details.push("Signed up from homepage: +0 points");
  }

  // Domain quality bonus - check for enterprise domains
  const domain = email.split("@")[1]?.toLowerCase();
  if (domain) {
    const enterpriseDomains = [".edu", ".gov", ".org"];
    const isEnterprise = enterpriseDomains.some((suffix) =>
      domain.endsWith(suffix),
    );
    if (isEnterprise) {
      score += 2;
      details.push("Enterprise/institutional domain: +2 points");
    }
  }

  return { score: Math.min(score, 10), details };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source = "homepage" }: NewsletterSignupData = body;

    // Validate email
    const validation = validateEmail(email);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Check if already subscribed
    const existingQuery = query(
      collection(db, "newsletter_subscriptions"),
      where("email", "==", email.toLowerCase()),
    );
    const existingDocs = await getDocs(existingQuery);

    if (!existingDocs.empty) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed to our newsletter!",
        alreadySubscribed: true,
      });
    }

    // Calculate lead score
    const { score: leadScore, details: leadScoreDetails } =
      calculateNewsletterLeadScore(email, source);

    // Prepare subscription data
    const subscriptionData = {
      email: email.toLowerCase(),
      source,
      leadScore,
      leadScoreDetails,
      subscribedAt: serverTimestamp(),
      status: "active",
      metadata: {
        userAgent: request.headers.get("user-agent"),
        referrer: request.headers.get("referer"),
        ipAddress:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip"),
      },
    };

    // Save to Firebase
    const docRef = await addDoc(
      collection(db, "newsletter_subscriptions"),
      subscriptionData,
    );

    // Send email notification for qualified signups
    if (leadScore >= 4) {
      try {
        await emailService.sendNotificationEmail({
          subject: `📧 New Newsletter Signup - ${source} - Score: ${leadScore}/10`,
          type: "newsletter",
          data: {
            email,
            source,
            leadScore,
            leadScoreDetails,
            id: docRef.id,
          },
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the signup if email fails
      }
    }

    // Track conversion analytics
    console.log(
      `📧 Newsletter signup - Lead Score: ${leadScore}/10 - ${email} - Source: ${source}`,
    );

    return NextResponse.json({
      success: true,
      id: docRef.id,
      leadScore,
      message:
        "Thanks for subscribing! Check your email to confirm your subscription.",
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 },
    );
  }
}
