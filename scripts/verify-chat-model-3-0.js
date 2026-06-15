/**
 * Verification Script for Gemini 3.1 Flash-Lite Chat Integration
 *
 * Usage:
 * 1. Start the dev server in a separate terminal: npm run dev
 * 2. Run this script: node scripts/verify-chat-model-3-0.js
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";
const API_ENDPOINT = `${BASE_URL}/api/chat`;
const EXPECTED_MODEL = "gemini-3.1-flash-lite";

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
  console.log("Starting Gemini 3.1 Flash-Lite Verification\n");

  console.log("1. Verifying Code Changes...");
  const fs = require("fs");
  const path = require("path");
  const routePath = path.join(process.cwd(), "app/api/chat/route.ts");

  if (fs.existsSync(routePath)) {
    const content = fs.readFileSync(routePath, "utf8");
    const hasModelName = content.includes(EXPECTED_MODEL);
    const hasOldModels =
      content.includes("gemini-2.5") ||
      content.includes("gemini-2.0") ||
      content.includes("gemini-3.0-pro");

    if (hasModelName) {
      console.log(`  OK Code contains '${EXPECTED_MODEL}'`);
    } else {
      console.log(`  FAIL Code MISSING '${EXPECTED_MODEL}'`);
    }

    if (!hasOldModels) {
      console.log("  OK Code free of retired model references");
    } else {
      console.log("  WARN Code still contains retired model references");
    }
  } else {
    console.log("  FAIL Could not find route.ts file");
  }

  console.log("\n2. Testing Live Chat Response...");
  console.log(`Target: ${BASE_URL}\n`);

  try {
    try {
      await fetch(BASE_URL);
    } catch (e) {
      console.log("  WARN Server not reachable at " + BASE_URL);
      console.log("  Tip: Start the server with: npm run dev");
      return;
    }

    const questions = ["health_check", "What services does FIELDPORTER offer?"];

    for (const q of questions) {
      console.log(`\n  Sending: "${q}"`);
      const startTime = Date.now();
      const result = await makeRequest(q);
      const duration = Date.now() - startTime;

      if (result.status === 200) {
        console.log(`  OK Success (${duration}ms)`);
        console.log(`  Response: ${result.data.response?.substring(0, 120)}...`);
        if (result.data.metadata) {
          console.log(
            `  Metadata: Agent=${result.data.metadata.agent}, LeadScore=${result.data.metadata.leadScore}`,
          );
        }
      } else {
        console.log(`  FAIL (${result.status})`);
        console.log(`  Error: ${JSON.stringify(result.data)}`);
      }
    }
  } catch (error) {
    console.log(`  FAIL Error making requests: ${error.message}`);
  }

  console.log("\nVerification Complete");
}

verifyModel();
