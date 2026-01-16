import { Resend } from "resend";
import { emailConfig } from "./env";

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

interface NotificationEmailData {
  subject: string;
  type: "chat" | "contact" | "newsletter" | "resource" | "welcome";
  data: any;
}

interface WelcomeEmailData {
  email: string;
  displayName: string;
}

class EmailService {
  private resend: Resend | null = null;
  private isEnabled = false;

  constructor() {
    // Try multiple sources for API key
    const apiKey = emailConfig.resend.apiKey || process.env["RESEND_API_KEY"];

    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.isEnabled = true;
      console.log("✅ Email service initialized with Resend API");
    } else {
      console.warn(
        "⚠️ RESEND_API_KEY not found - email notifications disabled",
      );
      console.warn(
        "   Add RESEND_API_KEY to .env.local and restart the server",
      );
    }
  }

  async sendNotificationEmail({
    subject,
    type,
    data,
  }: NotificationEmailData): Promise<{
    success: boolean;
    error?: string;
    id?: string;
  }> {
    console.log(
      `📧 sendNotificationEmail called - Type: ${type}, Subject: ${subject}`,
    );

    if (!this.isEnabled || !this.resend) {
      console.log(
        "📧 Email service not configured - using fallback notification",
      );
      return this.sendFallbackNotification({ subject, type, data });
    }

    try {
      const html = this.generateEmailHtml(type, data);
      const text = this.generateTextContent(type, data);

      // Use environment variable for sender or fallback to Resend test
      const sender =
        process.env["EMAIL_FROM"] || "FIELDPORTER <onboarding@resend.dev>";

      console.log(
        `📧 Attempting to send ${type} email from ${sender} to freddy@fieldporter.com`,
      );

      const result = await this.resend.emails.send({
        from: sender,
        to: ["freddy@fieldporter.com"],
        subject,
        html,
        text,
      });

      if (result.error) {
        console.error("❌ Resend email failed:", result.error);
        return { success: false, error: result.error.message };
      }

      console.log("✅ Email sent successfully:", result.data?.id);
      return {
        success: true,
        ...(result.data?.id && { id: result.data.id }),
      };
    } catch (error) {
      console.error("❌ Email service error:", error);
      return this.sendFallbackNotification({ subject, type, data });
    }
  }

  async sendLeadNotification(
    leadData: LeadEmailData,
  ): Promise<{ success: boolean; error?: string }> {
    return this.sendNotificationEmail({
      subject: `🔥 QUALIFIED LEAD: ${leadData.qualification} (Score: ${leadData.leadScore})${leadData.userEmail ? ` - ${leadData.userEmail}` : ""}`,
      type: "chat",
      data: leadData,
    });
  }

  async sendWelcomeEmail(
    email: string,
    displayName: string,
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.isEnabled || !this.resend) {
      console.log("📧 Email service not configured - skipping welcome email");
      return { success: false, error: "Email service not configured" };
    }

    try {
      const welcomeData: WelcomeEmailData = { email, displayName };
      const html = this.generateWelcomeEmailHtml(welcomeData);
      const text = this.generateWelcomeEmailText(welcomeData);

      const result = await this.resend.emails.send({
        from: "Freddy Hopkins <freddy@fieldporter.com>",
        to: [email],
        subject: `Welcome to FIELDPORTER, ${displayName}!`,
        html,
        text,
      });

      if (result.error) {
        console.error("❌ Welcome email failed:", result.error);
        return { success: false, error: result.error.message };
      }

      console.log("✅ Welcome email sent successfully:", result.data?.id);
      return {
        success: true,
        ...(result.data?.id && { id: result.data.id }),
      };
    } catch (error) {
      console.error("❌ Welcome email service error:", error);
      return { success: false, error: "Failed to send welcome email" };
    }
  }

  private generateWelcomeEmailHtml(data: WelcomeEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to FIELDPORTER</title>
        </head>
        <body style="margin: 0; padding: 0; background: #0a0a0a; font-family: Inter, Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
            
            <!-- Premium FIELDPORTER Header -->
            <div style="background: linear-gradient(135deg, #0969da 0%, #1e40af 50%, #7c3aed 100%); padding: 40px 32px; text-align: center;">
              <h1 style="color: white; font-size: 32px; margin: 0; font-weight: 700; letter-spacing: 1px;">FIELDPORTER</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">Strategic Research & Business Development</p>
            </div>

            <!-- Welcome Content -->
            <div style="padding: 40px 32px;">
              <h2 style="color: #1a1a1a; margin-bottom: 24px; font-size: 28px; font-weight: 600;">
                Welcome ${data.displayName}!
              </h2>
              
              <p style="color: #374151; font-size: 18px; line-height: 1.6; margin-bottom: 24px;">
                Thank you for joining FIELDPORTER. We're excited to have you as part of our premium client community.
              </p>

              <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #0969da;">
                <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                  <li style="margin-bottom: 8px;">We're currently setting up your personalized client portal</li>
                  <li style="margin-bottom: 8px;">You'll receive an email notification once it's ready</li>
                  <li style="margin-bottom: 8px;">Your portal will include project details, documents, and secure communication</li>
                  <li>Our AI assistant is available 24/7 for immediate support</li>
                </ul>
              </div>

              <!-- Portal Access -->
              <div style="background: #0969da; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
                <h3 style="color: white; margin: 0 0 12px 0; font-size: 18px;">Access Your Portal</h3>
                <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">
                  Sign in anytime to check the status of your portal setup
                </p>
                <a href="https://fieldporter.com/contact" 
                   style="display: inline-block; background: white; color: #0969da; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Sign In to Portal
                </a>
              </div>

              <!-- Support Section -->
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px;">Need Assistance?</h3>
                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                  <div style="flex: 1; min-width: 200px;">
                    <strong style="color: #374151;">Email Support:</strong><br>
                    <a href="mailto:freddy@fieldporter.com" style="color: #0969da; text-decoration: none;">freddy@fieldporter.com</a>
                  </div>
                  <div style="flex: 1; min-width: 200px;">
                    <strong style="color: #374151;">AI Assistant:</strong><br>
                    <span style="color: #6b7280;">Available on our website 24/7</span>
                  </div>
                </div>
              </div>

              <!-- Professional Closing -->
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 8px;">
                We're committed to delivering exceptional results and look forward to working with you.
              </p>
              
              <p style="color: #374151; font-size: 16px; font-weight: 500; margin: 0;">
                Best regards,<br>
                The FIELDPORTER Team
              </p>
            </div>

            <!-- Professional Footer -->
            <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                <strong>FIELDPORTER</strong> - Strategic Research & Business Development
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                This email was sent to ${data.email}. 
                <a href="https://fieldporter.com/privacy-policy" style="color: #0969da; text-decoration: none;">Privacy Policy</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateWelcomeEmailText(data: WelcomeEmailData): string {
    return `
Welcome to FIELDPORTER, ${data.displayName}!

Thank you for joining FIELDPORTER. We're excited to have you as part of our premium client community.

What's Next?
- We're currently setting up your personalized client portal
- You'll receive an email notification once it's ready
- Your portal will include project details, documents, and secure communication
- Our AI assistant is available 24/7 for immediate support

Access Your Portal:
Sign in anytime to check the status of your portal setup
https://fieldporter.com/contact

Need Assistance?
Email Support: freddy@fieldporter.com
AI Assistant: Available on our website 24/7

We're committed to delivering exceptional results and look forward to working with you.

Best regards,
The FIELDPORTER Team

---
FIELDPORTER - Strategic Research & Business Development
This email was sent to ${data.email}
Privacy Policy: https://fieldporter.com/privacy-policy
    `;
  }

  private generateEmailHtml(type: string, data: any): string {
    const baseStyles = `
      font-family: Inter, Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
    `;

    const headerHtml = `
      <div style="background: linear-gradient(135deg, #0969da 0%, #0051a7 100%); padding: 40px 32px; text-align: center;">
        <h1 style="color: white; font-size: 24px; margin: 0; font-weight: 600;">FIELDPORTER Notification</h1>
      </div>
    `;

    let bodyHtml = "";

    switch (type) {
      case "contact":
        const urgencyColor =
          data.leadScore >= 7
            ? "#dc2626"
            : data.leadScore >= 5
              ? "#ea580c"
              : "#059669";
        bodyHtml = `
          <div style="padding: 32px;">
            <h2 style="color: #1a1a1a; margin-bottom: 24px; font-size: 22px;">🎯 New Contact Form Submission</h2>
            <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid ${urgencyColor};">
              <p style="margin: 0 0 8px 0; font-weight: 600;"><strong>Lead Score:</strong> <span style="color: ${urgencyColor}; font-size: 18px;">${data.leadScore}/10</span></p>
              <p style="margin: 0; color: #666;"><strong>Status:</strong> ${data.leadScore >= 7 ? "🔥 Hot Lead" : data.leadScore >= 5 ? "📊 Qualified Lead" : "👀 New Inquiry"}</p>
            </div>
            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
              <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px;">Contact Details</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #0969da; text-decoration: none;">${data.email}</a></p>
              <p style="margin: 8px 0;"><strong>Company:</strong> ${data.company || "Not provided"}</p>
              <p style="margin: 8px 0;"><strong>Service Interest:</strong> ${data.projectType || "General inquiry"}</p>
              <p style="margin: 8px 0;"><strong>Timeline:</strong> ${data.timeline || "Not specified"}</p>
            </div>
            <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <h3 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px;">Message:</h3>
              <div style="background: white; padding: 16px; border-radius: 6px; border-left: 3px solid #0969da;">
                ${data.challengeDescription || data.message}
              </div>
            </div>
            ${
              data.leadScoreDetails
                ? `
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 16px;">Lead Score Breakdown:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #92400e;">
                ${data.leadScoreDetails.map((detail: string) => `<li style="margin-bottom: 4px;">${detail}</li>`).join("")}
              </ul>
            </div>
            `
                : ""
            }
            <div style="text-align: center; margin-top: 32px;">
              <a href="https://console.firebase.google.com/project/fieldporter-website/firestore/data/~2Fcontact_submissions~2F${data.id}" 
                 style="display: inline-block; background: #0969da; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                🔍 View in Firebase
              </a>
            </div>
          </div>
        `;
        break;

      case "newsletter":
        bodyHtml = `
          <div style="padding: 32px;">
            <h2 style="color: #1a1a1a; margin-bottom: 24px; font-size: 22px;">📧 New Newsletter Signup</h2>
            <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #065f46;">${data.email}</a></p>
              <p style="margin: 0 0 8px 0;"><strong>Source:</strong> ${data.source}</p>
              <p style="margin: 0 0 8px 0;"><strong>Lead Score:</strong> <span style="color: #065f46; font-weight: 600;">${data.leadScore}/10</span></p>
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                ${data.leadScore >= 6 ? "🎯 High-intent business email" : "📊 Standard newsletter signup"}
              </p>
            </div>
            <div style="text-align: center; margin-top: 24px;">
              <a href="https://console.firebase.google.com/project/fieldporter-website/firestore/data/~2Fnewsletter_subscriptions~2F${data.id}" 
                 style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                🔍 View in Firebase
              </a>
            </div>
          </div>
        `;
        break;

      case "chat":
        // Keep existing chat email format
        const chatUrgencyColor =
          data.leadScore >= 15
            ? "#dc2626"
            : data.leadScore >= 10
              ? "#ea580c"
              : "#059669";
        bodyHtml = `
          <div style="padding: 32px;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🔥 QUALIFIED LEAD DETECTED</h1>
              <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Lead Score: <span style="color: ${chatUrgencyColor}; font-size: 24px; font-weight: bold;">${data.leadScore}/20</span></p>
            </div>

            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="margin: 0 0 15px 0; color: #1e293b;">💬 Conversation Details</h2>
              <p><strong>Session ID:</strong> ${data.sessionId}</p>
              <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
              <p><strong>Qualification Level:</strong> <span style="color: ${chatUrgencyColor}; font-weight: bold;">${data.qualification}</span></p>
            </div>

            ${
              data.userEmail || data.userPhone
                ? `
            <div style="background: #ecfdf5; border: 2px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 10px 0; color: #065f46;">📧 Contact Information Provided</h3>
              ${data.userEmail ? `<p><strong>Email:</strong> <a href="mailto:${data.userEmail}" style="color: #0969da;">${data.userEmail}</a></p>` : ""}
              ${data.userPhone ? `<p><strong>Phone:</strong> <a href="tel:${data.userPhone}" style="color: #0969da;">${data.userPhone}</a></p>` : ""}
            </div>
            `
                : ""
            }

            <div style="background: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 15px 0; color: #1e293b;">💭 Latest Message</h3>
              <blockquote style="margin: 0; padding: 15px; background: #f1f5f9; border-left: 4px solid #0969da; font-style: italic;">
                "${data.userMessage}"
              </blockquote>
            </div>

            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 15px 0; color: #92400e;">🎯 Qualification Signals</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${data.qualificationSignals.map((signal: string) => `<li style="margin-bottom: 5px;">${signal}</li>`).join("")}
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://console.firebase.google.com/project/fieldporter-website/firestore/data/~2Fchat_sessions~2F${data.sessionId}" 
                 style="background: #0969da; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                🔍 View Full Conversation
              </a>
            </div>
          </div>
        `;
        break;

      default:
        bodyHtml = `<div style="padding: 32px;">Invalid notification type: ${type}</div>`;
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>FIELDPORTER Notification</title>
        </head>
        <body style="margin: 0; padding: 0; background: #f3f4f6; font-family: Inter, Arial, sans-serif;">
          <div style="${baseStyles}">
            ${headerHtml}
            ${bodyHtml}
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                This notification was automatically generated by the FIELDPORTER Lead Qualification System
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateTextContent(type: string, data: any): string {
    switch (type) {
      case "contact":
        return `
FIELDPORTER - New Contact Form Submission

Lead Score: ${data.leadScore}/10
Status: ${data.leadScore >= 7 ? "Hot Lead" : data.leadScore >= 5 ? "Qualified Lead" : "New Inquiry"}

Contact Details:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company || "Not provided"}
- Service Interest: ${data.projectType || "General inquiry"}
- Timeline: ${data.timeline || "Not specified"}

Message:
"${data.challengeDescription || data.message}"

View in Firebase: https://console.firebase.google.com/project/fieldporter-website/firestore/data/~2Fcontact_submissions~2F${data.id}
        `;

      case "newsletter":
        return `
FIELDPORTER - New Newsletter Signup

Email: ${data.email}
Source: ${data.source}
Lead Score: ${data.leadScore}/10

View in Firebase: https://console.firebase.google.com/project/fieldporter-website/firestore/data/~2Fnewsletter_subscriptions~2F${data.id}
        `;

      case "chat":
        return this.generateTextContentForChat(data);

      default:
        return `FIELDPORTER Notification - ${type}`;
    }
  }

  private generateTextContentForChat(leadData: LeadEmailData): string {
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
    notificationData: NotificationEmailData,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Try webhook if configured
      const webhookUrl = process.env["NOTIFICATION_WEBHOOK_URL"];
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: `${notificationData.type}_notification`,
            data: notificationData.data,
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

NOTIFICATION TYPE: ${notificationData.type.toUpperCase()}
SUBJECT: ${notificationData.subject}

DATA: ${JSON.stringify(notificationData.data, null, 2)}

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
