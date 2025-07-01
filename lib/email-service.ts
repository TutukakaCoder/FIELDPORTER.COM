import { Resend } from "resend";

interface LeadEmailData {
  sessionId: string;
  userMessage: string;
  userEmail?: string | null | undefined;
  userPhone?: string | null | undefined;
  leadScore: number;
  qualificationSignals: string[];
  timestamp: string;
  qualification: string;
}

class EmailService {
  private resend: Resend | null = null;
  private isEnabled = false;

  constructor() {
    const apiKey = process.env["RESEND_API_KEY"];
    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.isEnabled = true;
    } else {
      console.warn(
        "⚠️ RESEND_API_KEY not found - email notifications disabled",
      );
    }
  }

  async sendLeadNotification(
    leadData: LeadEmailData,
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.isEnabled || !this.resend) {
      console.log(
        "📧 Email service not configured - using fallback notification",
      );
      return this.sendFallbackNotification(leadData);
    }

    try {
      const emailContent = this.generateEmailContent(leadData);

      const result = await this.resend.emails.send({
        from: "FIELDPORTER Bot <notifications@fieldporter.com>",
        to: ["freddy@fieldporter.com"], // Professional FIELDPORTER email
        subject: `🔥 QUALIFIED LEAD: ${leadData.qualification} (Score: ${leadData.leadScore})${leadData.userEmail ? ` - ${leadData.userEmail}` : ""}`,
        html: emailContent,
        text: this.generateTextContent(leadData),
      });

      if (result.error) {
        console.error("❌ Resend email failed:", result.error);
        return { success: false, error: result.error.message };
      }

      console.log("✅ Email sent successfully:", result.data?.id);
      return { success: true };
    } catch (error) {
      console.error("❌ Email service error:", error);
      return this.sendFallbackNotification(leadData);
    }
  }

  private generateEmailContent(leadData: LeadEmailData): string {
    const contactInfo =
      leadData.userEmail || leadData.userPhone || "Not provided";
    const urgencyColor =
      leadData.leadScore >= 15
        ? "#dc2626"
        : leadData.leadScore >= 10
          ? "#ea580c"
          : "#059669";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>FIELDPORTER Lead Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🔥 QUALIFIED LEAD DETECTED</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Lead Score: <span style="color: ${urgencyColor}; font-size: 24px; font-weight: bold;">${leadData.leadScore}/20</span></p>
        </div>

        <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="margin: 0 0 15px 0; color: #1e293b;">💬 Conversation Details</h2>
          <p><strong>Session ID:</strong> ${leadData.sessionId}</p>
          <p><strong>Timestamp:</strong> ${new Date(leadData.timestamp).toLocaleString()}</p>
          <p><strong>Qualification Level:</strong> <span style="color: ${urgencyColor}; font-weight: bold;">${leadData.qualification}</span></p>
        </div>

        ${
          leadData.userEmail || leadData.userPhone
            ? `
        <div style="background: #ecfdf5; border: 2px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="margin: 0 0 10px 0; color: #065f46;">📧 Contact Information Provided</h3>
          ${leadData.userEmail ? `<p><strong>Email:</strong> <a href="mailto:${leadData.userEmail}" style="color: #0969da;">${leadData.userEmail}</a></p>` : ""}
          ${leadData.userPhone ? `<p><strong>Phone:</strong> <a href="tel:${leadData.userPhone}" style="color: #0969da;">${leadData.userPhone}</a></p>` : ""}
        </div>
        `
            : ""
        }

        <div style="background: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="margin: 0 0 15px 0; color: #1e293b;">💭 Latest Message</h3>
          <blockquote style="margin: 0; padding: 15px; background: #f1f5f9; border-left: 4px solid #0969da; font-style: italic;">
            "${leadData.userMessage}"
          </blockquote>
        </div>

        <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="margin: 0 0 15px 0; color: #92400e;">🎯 Qualification Signals</h3>
          <ul style="margin: 0; padding-left: 20px;">
            ${leadData.qualificationSignals.map((signal) => `<li style="margin-bottom: 5px;">${signal}</li>`).join("")}
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://console.firebase.google.com/project/fieldporter-website/firestore/data/~2Fchat_sessions~2F${leadData.sessionId}" 
             style="background: #0969da; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            🔍 View Full Conversation
          </a>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            This notification was automatically generated by the FIELDPORTER AI Lead Qualification System
          </p>
        </div>

      </body>
      </html>
    `;
  }

  private generateTextContent(leadData: LeadEmailData): string {
    return `
🔥 QUALIFIED LEAD DETECTED

Lead Score: ${leadData.leadScore}/20
Qualification: ${leadData.qualification}
Session ID: ${leadData.sessionId}
Timestamp: ${new Date(leadData.timestamp).toLocaleString()}

${leadData.userEmail ? `Email: ${leadData.userEmail}` : ""}
${leadData.userPhone ? `Phone: ${leadData.userPhone}` : ""}

Latest Message:
"${leadData.userMessage}"

Qualification Signals:
${leadData.qualificationSignals.map((signal) => `- ${signal}`).join("\n")}

View full conversation: https://console.firebase.google.com/project/fieldporter-website/firestore/data/~2Fchat_sessions~2F${leadData.sessionId}
    `;
  }

  private async sendFallbackNotification(
    leadData: LeadEmailData,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Try webhook if configured
      const webhookUrl = process.env["NOTIFICATION_WEBHOOK_URL"];
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "qualified_lead",
            data: leadData,
          }),
        });

        if (response.ok) {
          console.log("✅ Webhook notification sent successfully");
          return { success: true };
        }
      }

      // Final fallback - comprehensive console logging
      console.log(`
🚨 FALLBACK NOTIFICATION - EMAIL SERVICE UNAVAILABLE 🚨

QUALIFIED LEAD DETECTED:
├── Lead Score: ${leadData.leadScore}/20
├── Qualification: ${leadData.qualification}
├── Contact: ${leadData.userEmail || leadData.userPhone || "Not provided"}
├── Session: ${leadData.sessionId}
└── Timestamp: ${new Date(leadData.timestamp).toLocaleString()}

MESSAGE: "${leadData.userMessage}"

QUALIFICATION SIGNALS:
${leadData.qualificationSignals.map((signal) => `├── ${signal}`).join("\n")}

🔧 TO ENABLE EMAIL NOTIFICATIONS:
1. Get Resend API key: https://resend.com/api-keys
2. Add to .env.local: RESEND_API_KEY=your_key_here
3. Restart the development server

      `);

      return { success: true };
    } catch (error) {
      console.error("❌ Fallback notification failed:", error);
      return { success: false, error: "All notification methods failed" };
    }
  }
}

export const emailService = new EmailService();
