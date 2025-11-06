// Quick test to verify email notifications work
// Run this AFTER adding RESEND_API_KEY to .env.local

console.log("\n🔍 CHECKING EMAIL NOTIFICATION CONFIGURATION...\n");

// Check if RESEND_API_KEY is set
const hasResendKey = !!process.env.RESEND_API_KEY;

console.log("Environment Check:");
console.log(`  RESEND_API_KEY: ${hasResendKey ? "✅ SET" : "❌ NOT SET"}`);
console.log(`  NODE_ENV: ${process.env.NODE_ENV || "not set"}`);

if (!hasResendKey) {
  console.log("\n❌ RESEND_API_KEY is not configured!");
  console.log("\n📋 TO FIX THIS:");
  console.log("1. Go to https://resend.com/api-keys");
  console.log("2. Create a new API key");
  console.log("3. Add to .env.local: RESEND_API_KEY=re_your_key_here");
  console.log("4. Restart the dev server");
  console.log("\n");
  process.exit(1);
}

console.log("\n✅ Email service is configured!");
console.log("\nNotifications will be sent to: freddy@fieldporter.com");
console.log("\nTriggers:");
console.log("  - Lead score ≥ 10 points");
console.log("  - OR email address provided");
console.log("  - OR phone number provided");
console.log("\nTest by sending a message with an email address in the chat.\n");
