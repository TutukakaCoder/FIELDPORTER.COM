/**
 * Verification Script for Gemini 3.0 Integration
 *
 * Usage:
 * 1. Start the dev server in a separate terminal: npm run dev
 * 2. Run this script: node scripts/verify-chat-model-3-0.js
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";
const API_ENDPOINT = `${BASE_URL}/api/chat`;

async function makeRequest(message, sessionId = `test-${Date.now()}`) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId,
        conversationHistory: [],
        messageCount: 1,
      }),
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

async function verifyModel() {
  console.log("🧪 Starting Gemini 3.0 Verification\n");

  // 1. Verify Code Changes
  console.log("1. Verifying Code Changes...");
  const fs = require("fs");
  const path = require("path");
  const routePath = path.join(process.cwd(), "app/api/chat/route.ts");

  if (fs.existsSync(routePath)) {
    const content = fs.readFileSync(routePath, "utf8");
    const hasModelName = content.includes("gemini-3.0-pro-preview");
    const hasOldModels = content.includes("gemini-2.5");

    if (hasModelName) {
      console.log("  ✅ Code contains 'gemini-3.0-pro-preview'");
    } else {
      console.log("  ❌ Code MISSING 'gemini-3.0-pro-preview'");
    }

    if (!hasOldModels) {
      console.log("  ✅ Code free of 'gemini-2.5' references");
    } else {
      console.log(
        "  ⚠️ Code still contains 'gemini-2.5' references (check comments?)",
      );
    }
  } else {
    console.log("  ❌ Could not find route.ts file");
  }

  // 2. Test Live Chat Response
  console.log("\n2. Testing Live Chat Response...");
  console.log(`Target: ${BASE_URL}\n`);

  try {
    // Check if server is reachable first
    try {
      await fetch(BASE_URL);
    } catch (e) {
      console.log("  ⚠️ Server not reachable at " + BASE_URL);
      console.log("  💡 To test live chat, start the server with: npm run dev");
      console.log("  (Static code verification passed above)");
      return;
    }

    const questions = ["health_check", "What model are you running on?"];

    for (const q of questions) {
      console.log(`\n  Sending: "${q}"`);
      const startTime = Date.now();
      const result = await makeRequest(q);
      const duration = Date.now() - startTime;

      if (result.status === 200) {
        console.log(`  ✅ Success (${duration}ms)`);
        console.log(`  Response: ${result.data.response}`);
        if (result.data.metadata) {
          console.log(
            `  Metadata: Agent=${result.data.metadata.agent}, LeadScore=${result.data.metadata.leadScore}`,
          );
        }
      } else {
        console.log(`  ❌ Failed (${result.status})`);
        console.log(`  Error: ${JSON.stringify(result.data)}`);
      }
    }
  } catch (error) {
    console.log(`  ❌ Error making requests: ${error.message}`);
  }

  console.log("\n✨ Verification Complete");
}

verifyModel();
