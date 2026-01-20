import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Cal.com Webhook Handler
 * Receives booking events and stores them in Firebase
 *
 * Supported Events:
 * - BOOKING_CREATED
 * - BOOKING_RESCHEDULED
 * - BOOKING_CANCELLED
 *
 * Note: This uses server-side Firebase Admin SDK
 * For client-side alternative, bookings can be queried via Cal.com API
 */

// Webhook secret for signature verification (set in Cal.com dashboard)
const WEBHOOK_SECRET = process.env["CALCOM_WEBHOOK_SECRET"];

// Lazy load firebase-admin to avoid build errors if not configured
let adminDb: any = null;
async function getAdminDb() {
  if (adminDb) return adminDb;

  try {
    const admin = await import("firebase-admin");

    if (!admin.apps.length) {
      const serviceAccount = {
        projectId: process.env["FIREBASE_PROJECT_ID"],
        clientEmail: process.env["FIREBASE_CLIENT_EMAIL"],
        privateKey: process.env["FIREBASE_PRIVATE_KEY"]?.replace(/\\n/g, "\n"),
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
      });
    }

    adminDb = admin.firestore();
    return adminDb;
  } catch (error) {
    console.warn("Firebase Admin not configured, bookings will be logged only");
    return null;
  }
}

interface CalcomBooking {
  id: number;
  uid: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  attendees: Array<{
    name: string;
    email: string;
    timeZone: string;
  }>;
  organizer: {
    name: string;
    email: string;
    timeZone: string;
  };
  location?: string;
  status: string;
  metadata?: Record<string, unknown>;
}

interface CalcomWebhookPayload {
  triggerEvent: string;
  createdAt: string;
  payload: CalcomBooking;
}

// Verify webhook signature
function verifySignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn(
      "CALCOM_WEBHOOK_SECRET not set - skipping signature verification",
    );
    return true; // In development, allow without secret
  }

  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-cal-signature-256");

    // Verify signature if secret is configured
    if (WEBHOOK_SECRET && signature) {
      const isValid = verifySignature(body, signature);
      if (!isValid) {
        console.error("Invalid webhook signature");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 },
        );
      }
    }

    const webhookData: CalcomWebhookPayload = JSON.parse(body);
    const { triggerEvent, payload: booking } = webhookData;

    console.log(`Received Cal.com webhook: ${triggerEvent}`, {
      bookingId: booking.uid,
      attendee: booking.attendees[0]?.email,
    });

    // Try to store booking in Firebase if admin is configured
    const db = await getAdminDb();

    if (db) {
      const bookingRef = db.collection("bookings").doc(booking.uid);

      const bookingData = {
        bookingId: booking.id.toString(),
        uid: booking.uid,
        eventType: "discovery-call",
        title: booking.title,
        description: booking.description || "",
        startTime: new Date(booking.startTime),
        endTime: new Date(booking.endTime),
        attendee: booking.attendees[0]
          ? {
              name: booking.attendees[0].name,
              email: booking.attendees[0].email,
              timeZone: booking.attendees[0].timeZone,
            }
          : null,
        organizer: {
          name: booking.organizer.name,
          email: booking.organizer.email,
          timeZone: booking.organizer.timeZone,
        },
        location: booking.location || "TBD",
        status: booking.status,
        triggerEvent: triggerEvent,
        metadata: booking.metadata || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Handle different event types
      switch (triggerEvent) {
        case "BOOKING_CREATED":
          await bookingRef.set(bookingData);
          console.log("Booking created in Firebase:", booking.uid);
          break;

        case "BOOKING_RESCHEDULED":
          await bookingRef.update({
            ...bookingData,
            rescheduledAt: new Date(),
          });
          console.log("Booking rescheduled in Firebase:", booking.uid);
          break;

        case "BOOKING_CANCELLED":
          await bookingRef.update({
            status: "cancelled",
            cancelledAt: new Date(),
            updatedAt: new Date(),
          });
          console.log("Booking cancelled in Firebase:", booking.uid);
          break;

        default:
          console.log(`Unhandled event type: ${triggerEvent}`);
      }
    } else {
      console.log(
        "Firebase Admin not configured - booking logged but not stored",
      );
      console.log("Booking details:", {
        event: triggerEvent,
        uid: booking.uid,
        attendee: booking.attendees[0]?.email,
        startTime: booking.startTime,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Webhook processed: ${triggerEvent}`,
      bookingId: booking.uid,
      stored: db !== null,
    });
  } catch (error) {
    console.error("Error processing Cal.com webhook:", error);
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "Cal.com Webhook Handler",
    events: ["BOOKING_CREATED", "BOOKING_RESCHEDULED", "BOOKING_CANCELLED"],
  });
}
