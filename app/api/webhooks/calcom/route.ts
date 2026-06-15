import { getAdminDb } from "@/lib/firebase-admin";
import { createHmac, timingSafeEqual } from "crypto";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function verifySignature(
  rawBody: string,
  signature: string | null,
  secret: string | undefined,
): boolean {
  if (!secret) {
    console.warn("CALCOM_WEBHOOK_SECRET missing - skipping signature verification");
    return true;
  }

  if (!signature) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");

  try {
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (sigBuffer.length !== expectedBuffer.length) {
      return false;
    }
    return timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return signature === expected;
  }
}

function parseTimestamp(value: unknown): Timestamp | null {
  if (!value || typeof value !== "string") {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return Timestamp.fromDate(date);
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-cal-signature-256");
    const secret = process.env["CALCOM_WEBHOOK_SECRET"];

    if (!verifySignature(rawBody, signature, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody) as {
      triggerEvent?: string;
      payload?: Record<string, unknown>;
    };

    const triggerEvent = payload.triggerEvent || "UNKNOWN";
    const booking = (payload.payload || {}) as Record<string, unknown>;
    const uid = typeof booking["uid"] === "string" ? booking["uid"] : null;

    if (!uid) {
      return NextResponse.json(
        { error: "Missing booking uid" },
        { status: 400 },
      );
    }

    const attendee = (booking["attendees"] as Array<Record<string, unknown>>)?.[0] || {};
    const organizer = (booking["organizer"] as Record<string, unknown>) || {};
    const eventSlug =
      process.env["NEXT_PUBLIC_CAL_EVENT_SLUG"] || "discovery-call";

    const bookingDoc = {
      bookingId: String(booking["bookingId"] || booking["id"] || uid),
      uid,
      eventType: eventSlug,
      title: String(booking["title"] || "Discovery Call"),
      description: String(booking["description"] || ""),
      startTime: parseTimestamp(booking["startTime"]),
      endTime: parseTimestamp(booking["endTime"]),
      attendee: {
        name: String(attendee["name"] || ""),
        email: String(attendee["email"] || ""),
        timeZone: String(attendee["timeZone"] || ""),
      },
      organizer: {
        name: String(organizer["name"] || ""),
        email: String(organizer["email"] || ""),
        timeZone: String(organizer["timeZone"] || ""),
      },
      location: String(booking["location"] || ""),
      status: String(booking["status"] || triggerEvent),
      triggerEvent,
      metadata: booking["metadata"] || {},
      updatedAt: FieldValue.serverTimestamp(),
    };

    const db = getAdminDb();
    if (!db) {
      console.warn("Cal.com webhook received but Firebase Admin is not configured", {
        triggerEvent,
        uid,
      });

      return NextResponse.json({
        success: true,
        stored: false,
        triggerEvent,
      });
    }

    const docRef = db.collection("bookings").doc(uid);

    switch (triggerEvent) {
      case "BOOKING_CREATED":
        await docRef.set({
          ...bookingDoc,
          createdAt: FieldValue.serverTimestamp(),
        });
        break;

      case "BOOKING_RESCHEDULED":
        await docRef.set(
          {
            ...bookingDoc,
            rescheduledAt: FieldValue.serverTimestamp(),
            createdAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
        break;

      case "BOOKING_CANCELLED":
        await docRef.set(
          {
            ...bookingDoc,
            status: "cancelled",
            cancelledAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
        break;

      default:
        console.log("Unhandled Cal.com webhook event:", triggerEvent);
    }

    return NextResponse.json({
      success: true,
      stored: true,
      triggerEvent,
    });
  } catch (error) {
    console.error("Cal.com webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
