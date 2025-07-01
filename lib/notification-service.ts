interface LeadNotificationData {
  sessionId: string;
  userMessage: string;
  userEmail?: string | null | undefined;
  userPhone?: string | null | undefined;
  leadScore: number;
  qualificationSignals: string[];
  timestamp: string;
}

export class NotificationService {
  private static instance: NotificationService;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async sendLeadNotification(
    leadData: LeadNotificationData,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const notificationPayload = {
        type: "qualified_lead",
        data: {
          sessionId: leadData.sessionId,
          message: leadData.userMessage,
          email: leadData.userEmail,
          phone: leadData.userPhone,
          score: leadData.leadScore,
          signals: leadData.qualificationSignals,
          timestamp: leadData.timestamp,
          qualification: this.getQualificationLevel(leadData.leadScore),
        },
      };

      // Log for development
      if (process.env.NODE_ENV === "development") {
        console.log("🔥 QUALIFIED LEAD NOTIFICATION:", notificationPayload);
      }

      // Save to Firebase for notification processing
      await this.saveToFirebase(notificationPayload);

      // Send email notification using Resend
      const { emailService } = await import("./email-service");
      await emailService.sendLeadNotification({
        sessionId: leadData.sessionId,
        userMessage: leadData.userMessage,
        userEmail: leadData.userEmail,
        userPhone: leadData.userPhone,
        leadScore: leadData.leadScore,
        qualificationSignals: leadData.qualificationSignals,
        timestamp: leadData.timestamp,
        qualification: this.getQualificationLevel(leadData.leadScore),
      });

      return { success: true };
    } catch (error) {
      console.error("Notification service error:", error);
      return { success: false, error: "Failed to send notification" };
    }
  }

  private async saveToFirebase(payload: any): Promise<void> {
    try {
      const { db } = await import("./firebase");
      const { collection, addDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );

      await addDoc(collection(db, "lead_notifications"), {
        ...payload,
        createdAt: serverTimestamp(),
        processed: false,
      });
    } catch (error) {
      console.error("Failed to save notification to Firebase:", error);
    }
  }

  private getQualificationLevel(score: number): string {
    if (score >= 15) return "HIGHLY_QUALIFIED";
    if (score >= 10) return "QUALIFIED";
    if (score >= 7) return "INTERESTED";
    return "BROWSING";
  }
}

export const notificationService = NotificationService.getInstance();
